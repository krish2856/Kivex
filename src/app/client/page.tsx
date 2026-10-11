"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  date: string;
}

interface Project {
  id: number;
  project_code: string;
  title: string;
  client_email: string;
  client_name: string;
  category: string;
  status: "PENDING_PAYMENT" | "ACTIVE" | "IN_PROGRESS" | "REVIEW" | "COMPLETED";
  progress: number;
  milestones: Milestone[];
  price: string | number;
  staging_url?: string;
  created_at: string;
}

interface InquiryRecord {
  id: number;
  name: string;
  phone: string;
  email: string;
  business_description: string;
  services: string;
  summary?: string;
  status: "NEW" | "APPROVED" | "CONTACTED" | "CONVERTED" | "ARCHIVED";
  notes?: string;
  created_at: string;
}

interface PaymentRecord {
  id: number;
  project_id: number;
  project_title?: string;
  project_code?: string;
  amount: string | number;
  utr_number: string;
  screenshot_url: string;
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
  rejection_reason?: string;
  approved_by?: string;
  created_at: string;
}

interface CompanySettings {
  company_name: string;
  gstin: string;
  email: string;
  phone: string;
  address: string;
  upi_id: string;
  beneficiary_name: string;
  bank_name: string;
  account_number: string;
  ifsc_code: string;
  qr_image_url?: string;
  google_client_id?: string;
}

declare global {
  interface Window {
    google?: any;
  }
}

interface InvoiceModalData {
  invoiceNumber: string;
  date: string;
  status: "PAID & VERIFIED" | "PENDING VERIFICATION" | "PROFORMA / ESTIMATE";
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  projectTitle: string;
  projectCode: string;
  category: string;
  amount: number;
  utrNumber?: string;
  approvedBy?: string;
  milestones?: Milestone[];
}

export default function ClientPortalPage() {
  const [clientUser, setClientUser] = useState<{
    name: string;
    email: string;
    phone?: string;
    avatarUrl?: string;
  } | null>(null);

  const [activeTab, setActiveTab] = useState<"projects" | "payment" | "history" | "invoices">("projects");
  const [googleEmailInput, setGoogleEmailInput] = useState("");
  const [googleNameInput, setGoogleNameInput] = useState("");
  const [clientPhoneInput, setClientPhoneInput] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState("");
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [gsiReady, setGsiReady] = useState(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [inquiries, setInquiries] = useState<InquiryRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [settings, setSettings] = useState<CompanySettings>({
    company_name: "KIVEX TECHNOLOGY PRIVATE LIMITED",
    gstin: "24AAACK1028M1Z8",
    email: "contact@kivextechnology.com",
    phone: "+91 9999999999",
    address: "Surat, Gujarat, India",
    upi_id: "kivex@hdfcbank",
    beneficiary_name: "Kivex Technology Private Limited",
    bank_name: "HDFC Bank",
    account_number: "50200084920194",
    ifsc_code: "HDFC0001028",
    google_client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  });

  const [loadingProjects, setLoadingProjects] = useState(false);

  // Payment form states
  const [selectedProjectId, setSelectedProjectId] = useState<number | "">("");
  const [paymentAmount, setPaymentAmount] = useState<string>("25000");
  const [utrNumber, setUtrNumber] = useState("");
  const [screenshotPreview, setScreenshotPreview] = useState<string>("");
  const [submittingPayment, setSubmittingPayment] = useState(false);
  const [paymentSuccessMsg, setPaymentSuccessMsg] = useState("");
  const [paymentErrorMsg, setPaymentErrorMsg] = useState("");

  // Modals
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceModalData | null>(null);
  const [previewScreenshotUrl, setPreviewScreenshotUrl] = useState<string | null>(null);

  // Load Google Identity Services SDK + Session + Settings on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const qEmail = params.get("email");
      const qName = params.get("name");
      const qPhone = params.get("phone");

      if (qEmail) setGoogleEmailInput(qEmail);
      if (qName) setGoogleNameInput(qName);
      if (qPhone) setClientPhoneInput(qPhone);

      // Load official Google Identity Services script
      if (!document.getElementById("google-gsi-client")) {
        const script = document.createElement("script");
        script.id = "google-gsi-client";
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        script.onload = () => setGsiReady(true);
        document.head.appendChild(script);
      } else {
        setGsiReady(true);
      }
    }

    const saved = localStorage.getItem("kivex_client_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setClientUser(parsed);
      } catch (e) {
        console.error(e);
      }
    }

    // Load active company banking & Google OAuth settings from Neon DB
    fetch("/api/settings")
      .then((r) => r.json())
      .then((d) => {
        if (d.success && d.settings) {
          setSettings(d.settings);
        }
      })
      .catch((e) => console.error("Error loading settings:", e));
  }, []);

  // Fetch client projects, inquiries, and payment history + Auto-poll when awaiting approval
  useEffect(() => {
    if (!clientUser?.email) return;
    fetchClientData(clientUser.email);

    const interval = setInterval(() => {
      fetchClientData(clientUser.email, true);
    }, 8000);

    return () => clearInterval(interval);
  }, [clientUser]);

  const fetchClientData = async (email: string, silent = false) => {
    if (!silent) setLoadingProjects(true);
    try {
      const [projRes, payRes, inqRes] = await Promise.all([
        fetch(`/api/projects?clientEmail=${encodeURIComponent(email)}`),
        fetch(`/api/payments?clientEmail=${encodeURIComponent(email)}`),
        fetch(`/api/inquiries?email=${encodeURIComponent(email)}`),
      ]);

      const projData = await projRes.json();
      const payData = await payRes.json();
      const inqData = await inqRes.json();

      if (projData.success && projData.projects) {
        setProjects(projData.projects);
        if (projData.projects.length > 0 && selectedProjectId === "") {
          setSelectedProjectId(projData.projects[0].id);
          if (projData.projects[0].price) {
            setPaymentAmount(String(projData.projects[0].price));
          }
        }
      }
      if (payData.success && payData.payments) {
        setPayments(payData.payments);
      }
      if (inqData.success && inqData.inquiries) {
        setInquiries(inqData.inquiries);
      }
    } catch (err) {
      console.error("Error fetching client data:", err);
    } finally {
      if (!silent) setLoadingProjects(false);
    }
  };

  // Trigger Official Google OAuth 2.0 Popup (when Google Client ID is configured)
  const handleStartGoogleSignIn = () => {
    setAuthError("");
    const activeClientId = (
      settings.google_client_id ||
      process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
      ""
    ).trim();

    if (activeClientId && gsiReady && typeof window !== "undefined" && window.google?.accounts?.oauth2) {
      try {
        const tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: activeClientId,
          scope: "openid email profile",
          prompt: "select_account",
          callback: async (tokenResponse: any) => {
            if (tokenResponse?.error) {
              setAuthError("Google authentication was cancelled or failed.");
              return;
            }
            if (tokenResponse?.access_token) {
              await verifyGoogleTokenWithBackend({
                googleAccessToken: tokenResponse.access_token,
                phone: clientPhoneInput,
              });
            }
          },
        });
        tokenClient.requestAccessToken();
        return;
      } catch (err) {
        console.error("Google OAuth init error:", err);
      }
    }

    // Open strict Google Account Verification modal if OAuth Client ID is not yet added
    setShowGoogleModal(true);
  };

  const verifyGoogleTokenWithBackend = async (payload: {
    googleAccessToken?: string;
    googleIdToken?: string;
    email?: string;
    name?: string;
    phone?: string;
  }) => {
    setAuthLoading(true);
    setAuthError("");
    try {
      const res = await fetch("/api/auth/client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.user) {
        const session = {
          name: data.user.name,
          email: data.user.email,
          phone: data.user.phone || payload.phone || "",
          avatarUrl:
            data.user.avatar_url ||
            `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(data.user.name)}`,
        };
        localStorage.setItem("kivex_client_session", JSON.stringify(session));
        setClientUser(session);
        setShowGoogleModal(false);
      } else {
        setAuthError(
          data.error ||
            "Only real verified Google Mail (@gmail.com) accounts are permitted to sign in."
        );
      }
    } catch {
      setAuthError("Could not connect to Google verification service.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Strict Google Mail Verification Handler
  const handleGoogleLogin = async (
    overrideEmail?: string,
    overrideName?: string,
    overridePhone?: string
  ) => {
    const emailToUse = (overrideEmail || googleEmailInput).trim().toLowerCase();
    const nameToUse = (overrideName || googleNameInput || emailToUse.split("@")[0]).trim();
    const phoneToUse = (overridePhone || clientPhoneInput).trim();

    if (!emailToUse || !emailToUse.includes("@")) {
      setAuthError("Please enter your real Google Mail ID (e.g. yourname@gmail.com).");
      return;
    }

    await verifyGoogleTokenWithBackend({
      email: emailToUse,
      name: nameToUse,
      phone: phoneToUse,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("kivex_client_session");
    setClientUser(null);
    setProjects([]);
    setPayments([]);
    setInquiries([]);
  };

  // Handle Screenshot Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB limit.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit Payment with QR proof
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentSuccessMsg("");
    setPaymentErrorMsg("");

    if (!selectedProjectId) {
      setPaymentErrorMsg("Please select a project.");
      return;
    }
    if (!utrNumber.trim()) {
      setPaymentErrorMsg("Please provide the 12-digit UPI / UTR Transaction ID.");
      return;
    }
    if (!screenshotPreview) {
      setPaymentErrorMsg("Please upload the transaction screenshot proof.");
      return;
    }

    setSubmittingPayment(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedProjectId,
          clientEmail: clientUser?.email,
          amount: paymentAmount,
          utrNumber: utrNumber.trim(),
          screenshotUrl: screenshotPreview,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPaymentSuccessMsg("Payment submitted successfully! Our billing desk will verify and activate your project.");
        setUtrNumber("");
        setScreenshotPreview("");
        if (clientUser?.email) fetchClientData(clientUser.email);
        setTimeout(() => setActiveTab("history"), 1800);
      } else {
        setPaymentErrorMsg(data.error || "Failed to submit payment");
      }
    } catch (err: any) {
      setPaymentErrorMsg(err.message || "Failed to submit payment");
    } finally {
      setSubmittingPayment(false);
    }
  };

  // Open Invoice Helper for Project
  const openProjectInvoice = (proj: Project) => {
    const approvedPay = payments.find(
      (p) => p.project_id === proj.id && p.status === "APPROVED"
    );
    setSelectedInvoice({
      invoiceNumber: `KVX-INV-${proj.project_code.replace("KVX-", "")}`,
      date: new Date(proj.created_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: approvedPay ? "PAID & VERIFIED" : "PROFORMA / ESTIMATE",
      clientName: proj.client_name || clientUser?.name || "Valued Client",
      clientEmail: proj.client_email || clientUser?.email || "",
      clientPhone: clientUser?.phone,
      projectTitle: proj.title,
      projectCode: proj.project_code,
      category: proj.category,
      amount: Number(proj.price) || (approvedPay ? Number(approvedPay.amount) : 25000),
      utrNumber: approvedPay?.utr_number,
      approvedBy: approvedPay?.approved_by || "Kivex Accounts Desk",
      milestones: Array.isArray(proj.milestones) ? proj.milestones : [],
    });
  };

  // Open Invoice Helper for Payment Record
  const openPaymentInvoice = (pay: PaymentRecord) => {
    const matchedProj = projects.find((pr) => pr.id === pay.project_id);
    setSelectedInvoice({
      invoiceNumber: `KVX-RCPT-${pay.id.toString().padStart(4, "0")}`,
      date: new Date(pay.created_at).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status:
        pay.status === "APPROVED"
          ? "PAID & VERIFIED"
          : "PENDING VERIFICATION",
      clientName: clientUser?.name || "Valued Client",
      clientEmail: clientUser?.email || "",
      clientPhone: clientUser?.phone,
      projectTitle: pay.project_title || matchedProj?.title || `Project #${pay.project_id}`,
      projectCode: pay.project_code || matchedProj?.project_code || `KVX-${pay.project_id}`,
      category: matchedProj?.category || "Custom Platform Development",
      amount: Number(pay.amount),
      utrNumber: pay.utr_number,
      approvedBy: pay.approved_by || "Kivex Accounts Desk",
      milestones: matchedProj && Array.isArray(matchedProj.milestones) ? matchedProj.milestones : [],
    });
  };

  // ==========================================
  // VIEW: AUTH SCREEN (Strict Real Google Sign-In Only)
  // ==========================================
  if (!clientUser) {
    const hasConfiguredGoogleClientId = Boolean(
      (settings.google_client_id || process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "").trim()
    );

    return (
      <div className="min-h-screen bg-[#F5EFE5] text-[#0A0A0A] flex flex-col justify-between selection:bg-[#2D5FC7] selection:text-white">
        <header className="border-b border-black/[0.08] px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-8 w-auto" />
            </Link>
            <Link
              href="/"
              className="text-xs font-semibold text-[#525252] hover:text-[#0A0A0A] transition-colors"
            >
              ← Back to Website
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md rounded-3xl bg-white border border-black/[0.08] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5EFE5] border border-black/[0.08] mb-5">
                <Logo className="h-7 w-auto" showTagline={false} />
              </div>

              <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-[#FAF7F2] text-[#2D5FC7] border border-black/[0.08] font-bold mb-2">
                GOOGLE VERIFIED CLIENT PORTAL
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                Sign In with Google
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#525252] leading-relaxed">
                For security, only verified <strong className="text-[#0A0A0A]">Google Mail (@gmail.com)</strong> accounts are permitted to access project milestones, approvals, and tax invoices.
              </p>

              {/* Pre-filled Inquiry Verification Notice (when redirected from Start Project) */}
              {googleEmailInput && (
                <div className="mt-5 p-4 rounded-2xl bg-[#FAF7F2] border border-[#2D5FC7]/30 text-left">
                  <div className="text-[10px] font-mono uppercase tracking-wider font-bold text-[#2D5FC7] mb-1">
                    ● PENDING EMAIL VERIFICATION
                  </div>
                  <div className="text-xs text-[#0A0A0A] font-semibold">
                    Inquiry Email: <span className="font-mono text-[#2D5FC7]">{googleEmailInput}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1">
                    Click the button below to verify your Google Email so our Admin can approve your project and send your WhatsApp confirmation.
                  </p>
                </div>
              )}

              {authError && (
                <div className="mt-4 p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold text-left">
                  ⚠️ {authError}
                </div>
              )}

              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleStartGoogleSignIn}
                  disabled={authLoading}
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-[#0A0A0A] hover:bg-[#2D5FC7] text-white font-bold text-sm shadow-lg transition-all cursor-pointer disabled:opacity-50"
                >
                  <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                      />
                    </svg>
                  </div>
                  <span>
                    {authLoading
                      ? "Verifying with Google..."
                      : googleEmailInput
                      ? `Verify ${googleEmailInput} with Google`
                      : "Continue with Google Account"}
                  </span>
                </button>

                <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-black/[0.06] text-left space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-slate-700">
                      🔐 Strict Google Mail Security
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      {hasConfiguredGoogleClientId ? "OAuth 2.0 Live" : "Gmail MX Verified"}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Non-Google or unverified email addresses are blocked. Sign in with the exact Google Mail ID you used in your project inquiry or shared with the Kivex team.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100 text-[11px] text-slate-400">
                Your Google authentication is logged in real time on Kivex CRM & Neon Cloud.
              </div>
            </div>
          </div>
        </main>

        {/* Google Account Verification Modal */}
        {showGoogleModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-md rounded-3xl bg-white border border-black/10 p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  <h3 className="text-base font-bold text-[#0A0A0A]">
                    Google Account Verification
                  </h3>
                </div>
                <button
                  onClick={() => setShowGoogleModal(false)}
                  className="text-slate-400 hover:text-black text-lg cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <p className="text-xs text-slate-600 mb-4">
                Sign in with your real <strong className="text-[#0A0A0A]">Google Mail (@gmail.com)</strong> account to verify your identity on <strong className="text-[#0A0A0A]">Kivex Client Portal</strong>.
              </p>

              {authError && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 font-semibold">
                  ⚠️ {authError}
                </div>
              )}

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGoogleLogin();
                }}
                className="space-y-3"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Verified Google Mail ID (@gmail.com) *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="yourname@gmail.com"
                    value={googleEmailInput}
                    onChange={(e) => setGoogleEmailInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.15] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2D5FC7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Google Account Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={googleNameInput}
                    onChange={(e) => setGoogleNameInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.15] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2D5FC7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp Number (for Approval Notifications) *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={clientPhoneInput}
                    onChange={(e) => setClientPhoneInput(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.15] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2D5FC7]"
                  />
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setShowGoogleModal(false)}
                    className="flex-1 py-2.5 rounded-full border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="flex-1 py-2.5 rounded-full bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    {authLoading ? "Verifying Gmail..." : "Verify & Sign In →"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <footer className="border-t border-black/[0.08] px-6 py-4 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} KIVEX TECHNOLOGY • Client Portal
        </footer>
      </div>
    );
  }

  // ==========================================
  // VIEW: LOGGED-IN CLIENT DASHBOARD
  // ==========================================
  const activeCount = projects.filter((p) => p.status === "ACTIVE" || p.status === "IN_PROGRESS").length;
  const pendingCount = payments.filter((p) => p.status === "PENDING_APPROVAL").length;
  const approvedPayments = payments.filter((p) => p.status === "APPROVED");
  const latestInquiry = inquiries.length > 0 ? inquiries[0] : null;
  const isAwaitingInquiryApproval =
    projects.length === 0 && latestInquiry && latestInquiry.status === "NEW";

  return (
    <div className="min-h-screen bg-[#F5EFE5] text-[#0A0A0A] flex flex-col selection:bg-[#2D5FC7] selection:text-white">
      {/* Global Print Stylesheet for High-Fidelity KIVEX Invoice */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #kivex-printable-invoice,
          #kivex-printable-invoice * {
            visibility: visible !important;
          }
          #kivex-printable-invoice {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
            margin: 0 !important;
            padding: 28px !important;
            background: #ffffff !important;
            color: #0a0a0a !important;
            box-shadow: none !important;
            border: 1px solid #e5e0d5 !important;
            border-radius: 0 !important;
            z-index: 999999 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Top Header */}
      <header className="no-print sticky top-0 z-40 bg-[#F5EFE5]/95 backdrop-blur-xl border-b border-black/[0.08] px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Logo className="h-7 sm:h-8 w-auto" />
            </Link>
            <span className="hidden sm:inline-block text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#2D5FC7] text-white">
              CLIENT PORTAL
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={() => clientUser?.email && fetchClientData(clientUser.email)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-black/[0.08] text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
              title="Refresh Portal Status"
            >
              ⟳ Sync
            </button>

            <div className="flex items-center gap-2.5 text-right">
              <img
                src={clientUser.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(clientUser.name)}`}
                alt={clientUser.name}
                className="w-8 h-8 rounded-full border border-black/10 bg-white"
              />
              <div className="hidden sm:block text-left">
                <div className="text-xs font-bold text-[#0A0A0A] leading-tight">{clientUser.name}</div>
                <div className="text-[11px] text-slate-500 leading-tight truncate max-w-[160px]">{clientUser.email}</div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 border border-black/[0.12] text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="no-print flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-5 sm:py-8 space-y-5 sm:space-y-8">
        {/* Welcome Banner */}
        <div className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider font-bold text-[#E8B62A]">
              Welcome, {clientUser.name}
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] mt-1">
              Project Delivery & Settlement Hub
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl">
              Track project milestones, access live staging previews, settle milestone payments via official UPI, and download GST tax invoices.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 sm:gap-4 shrink-0">
            <div className="bg-[#FAF7F2] border border-black/[0.06] rounded-2xl p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#0A0A0A]">{projects.length}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">Projects</div>
            </div>
            <div className="bg-[#FAF7F2] border border-black/[0.06] rounded-2xl p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#2D5FC7]">{activeCount}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">Active</div>
            </div>
            <div className="bg-[#FAF7F2] border border-black/[0.06] rounded-2xl p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl font-black text-[#C99A1A]">{pendingCount}</div>
              <div className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider mt-0.5">Pending Pay</div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* INQUIRY APPROVAL GATE BANNER (IF INQUIRY EXISTS) */}
        {/* ========================================================= */}
        {isAwaitingInquiryApproval && latestInquiry && (
          <div className="rounded-3xl bg-white border-2 border-[#E8B62A] p-6 sm:p-8 shadow-md relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF8E6] border border-[#E8B62A] text-[#9A6F00] text-xs font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#E8B62A] animate-ping" />
                  <span>AWAITING KIVEX ADMIN / ARCHITECT APPROVAL</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#0A0A0A]">
                  Your Project Inquiry is Under Technical Review
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  We have received your project brief for <strong className="text-[#0A0A0A]">{latestInquiry.services}</strong>. Once our Admin or Staff approves your inquiry from the Kivex Operations Console, you will receive an instant notification and your project dashboard, staging preview, and payment schedule will unlock here.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Applicant Name</div>
                    <div className="text-xs font-bold text-[#0A0A0A] mt-0.5">{latestInquiry.name}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Registered Phone</div>
                    <div className="text-xs font-mono font-bold text-[#0A0A0A] mt-0.5">{latestInquiry.phone}</div>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                    <div className="text-[10px] font-mono uppercase text-slate-400">Verification Status</div>
                    <div className="text-xs font-bold text-amber-700 mt-0.5">Pending Admin Approval</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3 shrink-0">
                <button
                  onClick={() => clientUser?.email && fetchClientData(clientUser.email)}
                  className="px-6 py-3 rounded-full bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
                >
                  Check Approval Status ⟳
                </button>
                <a
                  href={`https://wa.me/${settings.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hello Kivex Team, I submitted my project inquiry (${latestInquiry.name} - ${latestInquiry.email}) and logged into the Client Portal. Please review and approve my project.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-[#FAF7F2] hover:bg-slate-100 border border-black/[0.12] text-[#0A0A0A] text-xs font-bold text-center transition-all"
                >
                  Connect on WhatsApp ↗
                </a>
              </div>
            </div>
          </div>
        )}

        {latestInquiry && latestInquiry.status === "APPROVED" && projects.length === 0 && (
          <div className="rounded-3xl bg-emerald-50 border-2 border-emerald-500 p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-mono font-bold mb-2">
                  ✓ INQUIRY APPROVED BY KIVEX ADMIN
                </span>
                <h2 className="text-xl font-extrabold text-[#0A0A0A]">
                  Your Project Inquiry Has Been Approved!
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-2xl">
                  Congratulations! Our technical team has approved your inquiry for <strong>{latestInquiry.services}</strong>. Our architect will connect with you shortly and initialize your sprint milestones below.
                </p>
              </div>
              <button
                onClick={() => clientUser?.email && fetchClientData(clientUser.email)}
                className="px-5 py-2.5 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shrink-0 cursor-pointer"
              >
                Refresh Project Board ⟳
              </button>
            </div>
          </div>
        )}

        {/* Tab Controls — Mobile horizontal scrollable strip */}
        <div className="no-scrollbar flex border-b border-black/[0.08] gap-1.5 overflow-x-auto pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            onClick={() => setActiveTab("projects")}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5",
              activeTab === "projects"
                ? "bg-[#2D5FC7] text-white shadow-sm"
                : "text-slate-600 hover:text-black hover:bg-white/[0.7] bg-white/40"
            )}
          >
            <span>📁 Projects ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("payment")}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5",
              activeTab === "payment"
                ? "bg-[#2D5FC7] text-white shadow-sm"
                : "text-slate-600 hover:text-black hover:bg-white/[0.7] bg-white/40"
            )}
          >
            <span>📲 Pay via QR</span>
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5",
              activeTab === "history"
                ? "bg-[#2D5FC7] text-white shadow-sm"
                : "text-slate-600 hover:text-black hover:bg-white/[0.7] bg-white/40"
            )}
          >
            <span>💳 Approvals ({payments.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("invoices")}
            className={cn(
              "px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0 flex items-center gap-1.5",
              activeTab === "invoices"
                ? "bg-[#2D5FC7] text-white shadow-sm"
                : "text-slate-600 hover:text-black hover:bg-white/[0.7] bg-white/40"
            )}
          >
            <span>🧾 Invoices ({projects.length + approvedPayments.length})</span>
          </button>
        </div>

        {/* ========================================================= */}
        {/* TAB 1: MY PROJECTS */}
        {/* ========================================================= */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-[#0A0A0A]">Active Deliverables Directory</h2>
                <p className="text-xs text-slate-500">Milestone stages, staging builds, and project billing</p>
              </div>
            </div>

            {loadingProjects ? (
              <div className="text-center py-16 text-slate-400 text-sm">
                Synchronizing projects with Neon Cloud...
              </div>
            ) : projects.length === 0 ? (
              <div className="rounded-3xl border border-black/[0.08] bg-white p-12 text-center shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#FAF7F2] border border-black/[0.08] flex items-center justify-center mx-auto mb-4 text-[#2D5FC7] font-bold">
                  KVX
                </div>
                <h3 className="text-lg font-bold text-[#0A0A0A]">
                  {isAwaitingInquiryApproval
                    ? "Project Board Unlocks Upon Inquiry Approval"
                    : "No Active Projects Assigned Yet"}
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  {isAwaitingInquiryApproval
                    ? "Your inquiry is in the verification queue above. As soon as Kivex Admin approves or creates your project, your milestones and staging URL will appear here."
                    : "Once our engineering team creates your project under your email address, it will automatically appear here with live milestones and tax invoices."}
                </p>
                <div className="mt-6 flex justify-center gap-3">
                  <Link
                    href="/"
                    className="px-5 py-2.5 rounded-full bg-[#2D5FC7] text-white text-xs font-bold shadow-xs hover:bg-[#1E3D8A] transition-colors"
                  >
                    Explore Kivex Solutions
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {projects.map((proj) => {
                  const milestones = Array.isArray(proj.milestones) ? proj.milestones : [];
                  const isPendingPayment = proj.status === "PENDING_PAYMENT";

                  return (
                    <div
                      key={proj.id}
                      className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-all group"
                    >
                      <div>
                        {/* Top Info */}
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#FAF7F2] border border-black/[0.08] text-[#0A0A0A]">
                              {proj.project_code}
                            </span>
                            <h3 className="text-lg font-bold text-[#0A0A0A] mt-2 group-hover:text-[#2D5FC7] transition-colors">
                              {proj.title}
                            </h3>
                            <div className="text-xs text-slate-500 mt-0.5">
                              {proj.category} • Budget:{" "}
                              <strong className="text-[#0A0A0A] font-mono">
                                ₹{Number(proj.price).toLocaleString("en-IN")}
                              </strong>
                            </div>
                          </div>

                          <div>
                            {isPendingPayment ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                                Payment Pending
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {proj.status}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mt-6">
                          <div className="flex items-center justify-between text-xs mb-1.5 font-semibold text-slate-700">
                            <span>Delivery Progress</span>
                            <span className="font-mono text-[#2D5FC7]">{proj.progress}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-[#FAF7F2] border border-black/[0.06] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-[#2D5FC7] rounded-full transition-all duration-500"
                              style={{ width: `${proj.progress}%` }}
                            />
                          </div>
                        </div>

                        {/* Milestones list */}
                        <div className="mt-6 pt-5 border-t border-slate-100 space-y-2.5">
                          <div className="text-[11px] font-mono uppercase font-bold text-slate-400">
                            Sprint Milestones
                          </div>
                          {milestones.map((m: any, i: number) => (
                            <div key={m.id || i} className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2.5">
                                <span
                                  className={cn(
                                    "w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold",
                                    m.completed
                                      ? "bg-emerald-600 text-white"
                                      : "bg-slate-200 text-slate-600"
                                  )}
                                >
                                  {m.completed ? "✓" : i + 1}
                                </span>
                                <span className={m.completed ? "text-[#0A0A0A] font-semibold" : "text-slate-500"}>
                                  {m.title}
                                </span>
                              </div>
                              <span className="text-[11px] font-mono text-slate-400">{m.date}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Bottom Actions */}
                      <div className="mt-6 pt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {proj.staging_url ? (
                            <a
                              href={proj.staging_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-[#2D5FC7] text-xs font-bold hover:bg-blue-100 transition-colors"
                            >
                              <span>Live Staging Preview</span>
                              <span>↗</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-400 font-mono">Staging link queued</span>
                          )}

                          <button
                            onClick={() => openProjectInvoice(proj)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-slate-100 border border-black/[0.1] text-[#0A0A0A] text-xs font-bold transition-colors cursor-pointer"
                          >
                            <span>View / Print Invoice</span>
                          </button>
                        </div>

                        {isPendingPayment && (
                          <button
                            onClick={() => {
                              setSelectedProjectId(proj.id);
                              setPaymentAmount(String(proj.price || 25000));
                              setActiveTab("payment");
                            }}
                            className="px-4 py-2 rounded-full bg-[#E8B62A] hover:bg-[#d4a422] text-[#0A0A0A] text-xs font-bold transition-all shadow-sm cursor-pointer"
                          >
                            Scan & Pay Now →
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: PAY VIA QR SCANNER */}
        {/* ========================================================= */}
        {activeTab === "payment" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 5 Cols: QR Card */}
            <div className="lg:col-span-5 rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 text-center shadow-xs">
              <span className="inline-block text-[10px] font-mono uppercase tracking-widest px-3 py-1 rounded-full bg-blue-50 text-[#2D5FC7] border border-blue-200 mb-4 font-bold">
                OFFICIAL UPI GATEWAY
              </span>

              <h2 className="text-xl font-bold text-[#0A0A0A]">Scan to Settle Milestone</h2>
              <p className="text-xs text-slate-500 mt-1">
                Scan using Google Pay, PhonePe, Paytm, or BHIM.
              </p>

              {/* Dynamic QR Box Display */}
              <div className="mt-6 mx-auto w-56 h-56 rounded-2xl bg-[#FAF7F2] border border-black/[0.08] p-3 flex flex-col items-center justify-center shadow-xs">
                {settings.qr_image_url ? (
                  <img
                    src={settings.qr_image_url}
                    alt="Official UPI QR"
                    className="w-full h-full object-contain rounded-xl"
                  />
                ) : (
                  <div className="w-full h-full border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-2 bg-white">
                    <svg className="w-40 h-40" viewBox="0 0 200 200" fill="none">
                      <rect width="200" height="200" fill="white" />
                      <rect x="20" y="20" width="45" height="45" rx="6" fill="#0A0A0A" />
                      <rect x="28" y="28" width="29" height="29" rx="3" fill="white" />
                      <rect x="34" y="34" width="17" height="17" rx="2" fill="#2D5FC7" />
                      <rect x="135" y="20" width="45" height="45" rx="6" fill="#0A0A0A" />
                      <rect x="143" y="28" width="29" height="29" rx="3" fill="white" />
                      <rect x="149" y="34" width="17" height="17" rx="2" fill="#2D5FC7" />
                      <rect x="20" y="135" width="45" height="45" rx="6" fill="#0A0A0A" />
                      <rect x="28" y="143" width="29" height="29" rx="3" fill="white" />
                      <rect x="34" y="149" width="17" height="17" rx="2" fill="#2D5FC7" />
                      <rect x="80" y="25" width="12" height="12" fill="#0A0A0A" />
                      <rect x="100" y="35" width="12" height="12" fill="#2D5FC7" />
                      <rect x="80" y="55" width="12" height="12" fill="#0A0A0A" />
                      <rect x="85" y="85" width="30" height="30" rx="4" fill="#0A0A0A" />
                      <rect x="92" y="92" width="16" height="16" rx="2" fill="#E8B62A" />
                      <rect x="135" y="85" width="15" height="15" fill="#0A0A0A" />
                      <rect x="155" y="105" width="15" height="15" fill="#2D5FC7" />
                      <rect x="80" y="135" width="15" height="15" fill="#0A0A0A" />
                      <rect x="105" y="150" width="15" height="15" fill="#2D5FC7" />
                      <rect x="135" y="140" width="18" height="18" fill="#0A0A0A" />
                      <rect x="160" y="160" width="15" height="15" fill="#0A0A0A" />
                    </svg>
                    <span className="text-[10px] font-mono font-bold text-slate-800 mt-1">
                      KIVEX TECHNOLOGY
                    </span>
                  </div>
                )}
              </div>

              {/* UPI ID Details */}
              <div className="mt-5 bg-[#FAF7F2] border border-black/[0.08] rounded-2xl p-3.5 flex items-center justify-between text-left gap-3">
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase text-slate-500 font-bold">UPI ID</div>
                  <div className="text-xs font-mono font-bold text-[#0A0A0A] truncate">{settings.upi_id}</div>
                  <div className="text-[10px] text-slate-500">{settings.beneficiary_name}</div>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(settings.upi_id);
                    alert("UPI ID copied!");
                  }}
                  className="shrink-0 px-4 py-2 rounded-xl bg-[#2D5FC7] text-white text-xs font-bold hover:bg-[#1E3D8A] active:scale-95 transition-all cursor-pointer touch-manipulation"
                >
                  📋 Copy
                </button>
              </div>

              <div className="mt-4 text-[11px] text-slate-500 text-left bg-[#FAF7F2] p-3.5 rounded-2xl border border-black/[0.06]">
                <div className="font-bold text-[#0A0A0A] mb-1">NEFT / IMPS Bank Settlement:</div>
                <div>Bank: {settings.bank_name}</div>
                <div>A/C: <span className="font-mono">{settings.account_number}</span></div>
                <div>IFSC: <span className="font-mono">{settings.ifsc_code}</span></div>
              </div>
            </div>

            {/* Right 7 Cols: Verification Form */}
            <div className="lg:col-span-7 rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-xs">
              <h2 className="text-xl font-bold text-[#0A0A0A]">Upload Payment Screenshot</h2>
              <p className="text-xs text-slate-500 mt-1">
                Submit your payment receipt screenshot and 12-digit UTR number. Once verified by Kivex Admin, your project status automatically switches to ACTIVE.
              </p>

              {paymentSuccessMsg && (
                <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  ✓ {paymentSuccessMsg}
                </div>
              )}
              {paymentErrorMsg && (
                <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-800 text-xs font-semibold">
                  ⚠️ {paymentErrorMsg}
                </div>
              )}

              <form onSubmit={handlePaymentSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Select Target Project *
                  </label>
                  <select
                    value={selectedProjectId}
                    onChange={(e) => setSelectedProjectId(Number(e.target.value))}
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2D5FC7] focus:bg-white"
                  >
                    <option value="">-- Choose a project --</option>
                    {projects.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.project_code} — {p.title} ({p.status})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Amount Paid (INR ₹) *
                    </label>
                    <input
                      type="number"
                      required
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-sm text-[#0A0A0A] font-mono focus:outline-none focus:border-[#2D5FC7] focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      12-Digit UTR / Transaction ID *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 428901849201"
                      value={utrNumber}
                      onChange={(e) => setUtrNumber(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-sm text-[#0A0A0A] font-mono focus:outline-none focus:border-[#2D5FC7] focus:bg-white"
                    />
                  </div>
                </div>

                {/* Screenshot Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Upload Payment Screenshot Proof *
                  </label>
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-4 text-center hover:border-[#2D5FC7] transition-colors relative bg-[#FAF7F2]">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      required={!screenshotPreview}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />

                    {screenshotPreview ? (
                      <div className="flex flex-col items-center">
                        <img
                          src={screenshotPreview}
                          alt="Screenshot"
                          className="h-32 object-contain rounded-lg border border-slate-300 shadow-sm"
                        />
                        <span className="text-[11px] text-emerald-600 mt-2 font-bold">
                          ✓ Screenshot attached — Click to change
                        </span>
                      </div>
                    ) : (
                      <div className="py-4">
                        <div className="text-xs font-bold text-slate-800">
                          Click or drag transaction receipt screenshot here
                        </div>
                        <div className="text-[10px] text-slate-500 mt-1">PNG, JPG up to 5MB</div>
                      </div>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submittingPayment}
                  className="w-full py-3 rounded-full bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-sm font-bold transition-all shadow-md shadow-[#2D5FC7]/20 cursor-pointer disabled:opacity-50 mt-2"
                >
                  {submittingPayment ? "Submitting for Verification..." : "Submit Proof for Instant Approval →"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PAYMENT APPROVALS HISTORY */}
        {/* ========================================================= */}
        {activeTab === "history" && (
          <div className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-xs">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-[#0A0A0A]">Submitted Transactions</h2>
              <p className="text-xs text-slate-500">Real-time verification status synchronized with Neon DB</p>
            </div>

            {payments.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No payment submissions on record for this account.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.08] text-slate-500 font-mono text-[11px] uppercase">
                      <th className="py-3 px-4">Date</th>
                      <th className="py-3 px-4">Project</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">UTR Number</th>
                      <th className="py-3 px-4">Screenshot</th>
                      <th className="py-3 px-4">Verification Status</th>
                      <th className="py-3 px-4 text-right">Invoice</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {payments.map((pay) => (
                      <tr key={pay.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-3.5 px-4 font-mono text-slate-500">
                          {new Date(pay.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 font-bold text-[#0A0A0A]">
                          {pay.project_title || `Project #${pay.project_id}`}
                        </td>
                        <td className="py-3.5 px-4 font-mono font-bold text-[#0A0A0A]">
                          ₹{Number(pay.amount).toLocaleString("en-IN")}
                        </td>
                        <td className="py-3.5 px-4 font-mono text-[#2D5FC7]">
                          {pay.utr_number}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => setPreviewScreenshotUrl(pay.screenshot_url)}
                            className="px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-slate-100 border border-slate-300 text-[11px] font-semibold text-slate-700 cursor-pointer"
                          >
                            View Receipt
                          </button>
                        </td>
                        <td className="py-3.5 px-4">
                          {pay.status === "PENDING_APPROVAL" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                              ⏳ Pending Admin Review
                            </span>
                          )}
                          {pay.status === "APPROVED" && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                              ✓ Approved & Active
                            </span>
                          )}
                          {pay.status === "REJECTED" && (
                            <div className="flex flex-col gap-0.5">
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[11px]">
                                ✕ Rejected
                              </span>
                              {pay.rejection_reason && (
                                <span className="text-[10px] text-red-600 italic">
                                  {pay.rejection_reason}
                                </span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => openPaymentInvoice(pay)}
                            className="px-3 py-1 rounded-lg bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white font-bold text-[11px] cursor-pointer"
                          >
                            Print Invoice
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 4: TAX INVOICES */}
        {/* ========================================================= */}
        {activeTab === "invoices" && (
          <div className="rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-xs space-y-6">
            <div>
              <h2 className="text-lg font-bold text-[#0A0A0A]">Official KIVEX Tax Invoices & Proforma Statements</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Click any invoice below to preview and print / download high-resolution PDF
              </p>
            </div>

            {projects.length === 0 && payments.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                Invoices will appear here once a project is assigned to your account.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {projects.map((proj) => (
                  <div
                    key={`proj-inv-${proj.id}`}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-black/[0.08] flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-50 text-[#2D5FC7] border border-blue-200">
                        PROJECT INVOICE • {proj.project_code}
                      </span>
                      <div className="text-base font-extrabold text-[#0A0A0A] mt-2">
                        {proj.title}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-700 mt-0.5">
                        Total Contract: ₹{Number(proj.price).toLocaleString("en-IN")}
                      </div>
                    </div>

                    <button
                      onClick={() => openProjectInvoice(proj)}
                      className="px-4 py-2.5 rounded-xl bg-[#2D5FC7] hover:bg-[#1E3D8A] text-xs font-bold text-white transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      Open & Print PDF →
                    </button>
                  </div>
                ))}

                {approvedPayments.map((p) => (
                  <div
                    key={`pay-inv-${p.id}`}
                    className="p-5 rounded-2xl bg-[#FAF7F2] border border-emerald-300 flex items-center justify-between gap-4"
                  >
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        PAID RECEIPT • #KVX-RCPT-{p.id.toString().padStart(4, "0")}
                      </span>
                      <div className="text-base font-extrabold text-[#0A0A0A] mt-2">
                        ₹{Number(p.amount).toLocaleString("en-IN")}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {p.project_title || `Project #${p.project_id}`} • UTR: {p.utr_number}
                      </div>
                    </div>

                    <button
                      onClick={() => openPaymentInvoice(p)}
                      className="px-4 py-2.5 rounded-xl bg-[#0A0A0A] hover:bg-[#2D5FC7] text-xs font-bold text-white transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      Print Receipt →
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Screenshot Preview Modal */}
      {previewScreenshotUrl && (
        <div className="no-print fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 text-center shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-[#0A0A0A]">Receipt Screenshot Proof</h3>
              <button
                onClick={() => setPreviewScreenshotUrl(null)}
                className="text-slate-400 hover:text-black text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <img
              src={previewScreenshotUrl}
              alt="Receipt"
              className="max-h-[60vh] w-auto mx-auto rounded-xl border border-slate-200"
            />
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* KIVEX CORPORATE TAX INVOICE MODAL & PRINT ENGINE */}
      {/* ========================================================= */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="max-w-3xl w-full my-auto">
            {/* Top Action Bar (Hidden when printing) */}
            <div className="no-print flex items-center justify-between bg-[#0A0A0A] text-white px-6 py-3.5 rounded-t-3xl border-b border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#E8B62A]" />
                <span>OFFICIAL KIVEX TECHNOLOGY TAX INVOICE</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-1.5 rounded-full bg-[#2D5FC7] hover:bg-[#4A7AE8] text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
                >
                  Print / Download PDF
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  Close ✕
                </button>
              </div>
            </div>

            {/* Printable Invoice Sheet */}
            <div
              id="kivex-printable-invoice"
              className="bg-white text-[#0A0A0A] p-8 sm:p-10 rounded-b-3xl shadow-2xl border border-black/10"
            >
              {/* Brand Header */}
              <div className="bg-[#F5EFE5] rounded-2xl p-6 border border-black/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <Logo className="h-9 w-auto" />
                  <div className="text-xs font-bold text-[#0A0A0A] mt-2">
                    {settings.company_name}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {settings.address} • {settings.email} • {settings.phone}
                  </div>
                  <div className="text-[11px] font-mono font-bold text-[#2D5FC7] mt-1">
                    GSTIN: {settings.gstin} • SAC CODE: 998314
                  </div>
                </div>

                <div className="sm:text-right">
                  <span
                    className={cn(
                      "inline-block text-[10px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full border",
                      selectedInvoice.status === "PAID & VERIFIED"
                        ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                        : "bg-[#FFF8E6] text-[#9A6F00] border-[#E8B62A]"
                    )}
                  >
                    {selectedInvoice.status}
                  </span>
                  <div className="text-lg font-black text-[#0A0A0A] font-mono mt-2">
                    #{selectedInvoice.invoiceNumber}
                  </div>
                  <div className="text-xs text-slate-500 font-mono">
                    Date: {selectedInvoice.date}
                  </div>
                </div>
              </div>

              {/* Client & Project Metadata */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200 text-xs">
                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    Billed To (Client)
                  </div>
                  <div className="text-sm font-extrabold text-[#0A0A0A] mt-1">
                    {selectedInvoice.clientName}
                  </div>
                  <div className="text-slate-600 mt-0.5">{selectedInvoice.clientEmail}</div>
                  {selectedInvoice.clientPhone && (
                    <div className="text-slate-600 font-mono mt-0.5">{selectedInvoice.clientPhone}</div>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.06] sm:text-right">
                  <div className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    Project Engagement Reference
                  </div>
                  <div className="text-sm font-extrabold text-[#2D5FC7] font-mono mt-1">
                    {selectedInvoice.projectCode}
                  </div>
                  <div className="text-slate-800 font-semibold mt-0.5">
                    {selectedInvoice.projectTitle}
                  </div>
                  {selectedInvoice.utrNumber && (
                    <div className="text-emerald-700 font-mono font-bold mt-0.5">
                      UTR Ref: {selectedInvoice.utrNumber}
                    </div>
                  )}
                </div>
              </div>

              {/* Itemized Table */}
              <div className="py-6 border-b border-slate-200">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-[#0A0A0A] text-[#0A0A0A] font-mono text-[11px] uppercase">
                      <th className="py-2.5 px-2">#</th>
                      <th className="py-2.5 px-2">Deliverable & Engineering Scope</th>
                      <th className="py-2.5 px-2">SAC</th>
                      <th className="py-2.5 px-2 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    <tr>
                      <td className="py-4 px-2 font-mono font-bold text-slate-500">01</td>
                      <td className="py-4 px-2">
                        <div className="font-bold text-[#0A0A0A] text-sm">
                          {selectedInvoice.projectTitle}
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          Category: {selectedInvoice.category} • Full-Stack Architecture, UI/UX & Cloud Deployment
                        </div>
                        {selectedInvoice.milestones && selectedInvoice.milestones.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {selectedInvoice.milestones.map((m, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] px-2 py-0.5 rounded bg-[#FAF7F2] border border-black/[0.08] text-slate-700"
                              >
                                {m.completed ? "✓ " : "• "}
                                {m.title}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-2 font-mono text-slate-600">998314</td>
                      <td className="py-4 px-2 text-right font-mono font-bold text-sm text-[#0A0A0A]">
                        ₹{Number(selectedInvoice.amount).toLocaleString("en-IN")}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Totals & Bank Info */}
              <div className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                <div className="sm:col-span-7 text-[11px] text-slate-600 space-y-1.5 bg-[#FAF7F2] p-4 rounded-xl border border-black/[0.06]">
                  <div className="font-mono font-bold uppercase text-[#0A0A0A]">
                    Official Remittance & Banking Coordinates
                  </div>
                  <div>Beneficiary: <strong>{settings.beneficiary_name}</strong></div>
                  <div>Bank: {settings.bank_name} • A/C: <span className="font-mono font-bold">{settings.account_number}</span></div>
                  <div>IFSC Code: <span className="font-mono font-bold">{settings.ifsc_code}</span> • UPI ID: <span className="font-mono font-bold text-[#2D5FC7]">{settings.upi_id}</span></div>
                  <div className="text-[10px] text-slate-400 pt-1">
                    Verified by: {selectedInvoice.approvedBy || "Kivex Accounts Desk"}
                  </div>
                </div>

                <div className="sm:col-span-5 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Taxable Value</span>
                    <span className="font-mono">
                      ₹{Math.round(selectedInvoice.amount / 1.18).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>IGST / GST (18% Included)</span>
                    <span className="font-mono">
                      ₹{(selectedInvoice.amount - Math.round(selectedInvoice.amount / 1.18)).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="pt-2 border-t-2 border-[#0A0A0A] flex justify-between items-center text-base font-black text-[#0A0A0A]">
                    <span>Total Amount</span>
                    <span className="font-mono text-[#2D5FC7]">
                      ₹{Number(selectedInvoice.amount).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Seal */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500">
                <div>
                  Computer generated official tax document • KIVEX TECHNOLOGY
                </div>
                <div className="font-mono font-bold text-[#0A0A0A]">
                  Authorized Signatory • KIVEX TECHNOLOGY
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="no-print border-t border-black/[0.08] px-6 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} KIVEX TECHNOLOGY • Client Operations Portal
      </footer>
    </div>
  );
}
