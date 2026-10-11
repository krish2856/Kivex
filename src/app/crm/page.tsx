"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { cn } from "@/lib/utils";

interface Inquiry {
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

interface ClientUserRecord {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  last_login?: string;
  created_at: string;
  project_count?: number;
  total_paid?: number;
}

interface PaymentRecord {
  id: number;
  project_id: number;
  project_title?: string;
  project_code?: string;
  client_name?: string;
  client_email: string;
  amount: string | number;
  utr_number: string;
  screenshot_url: string;
  status: "PENDING_APPROVAL" | "APPROVED" | "REJECTED";
  rejection_reason?: string;
  approved_by?: string;
  created_at: string;
}

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

interface StaffUser {
  id: number;
  name: string;
  email: string;
  role: "SUPER_ADMIN" | "PM" | "DEVELOPER" | "ACCOUNTS" | "SALES";
  branch_code: string;
  phone?: string;
  created_at: string;
}

interface ShowcaseTemplate {
  id: number;
  category: string;
  title: string;
  tagline?: string;
  badge?: string;
  description?: string;
  technologies?: string[];
  image_url: string;
  demo_url: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

interface CompanySettings {
  id?: number;
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
  branch_code: string;
  advance_percentage: number;
  whatsapp_notifications: boolean;
  google_client_id?: string;
}

export default function CompanyCRMPage() {
  const [currentUser, setCurrentUser] = useState<StaffUser | null>(null);

  // Login Form
  const [branchCode, setBranchCode] = useState("KIVEX_01002856");
  const [email, setEmail] = useState("admin@kivex.com");
  const [password, setPassword] = useState("admin123");
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState("");

  // CRM Active Section Tab
  const [activeTab, setActiveTab] = useState<
    "overview" | "leads" | "payments" | "projects" | "clients" | "templates" | "settings" | "staff"
  >("overview");

  // CRM Data States
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [templates, setTemplates] = useState<ShowcaseTemplate[]>([]);
  const [staffList, setStaffList] = useState<StaffUser[]>([]);
  const [registeredClients, setRegisteredClients] = useState<ClientUserRecord[]>([]);
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
    branch_code: "KIVEX_01002856",
    advance_percentage: 50,
    whatsapp_notifications: true,
    google_client_id: "",
  });

  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [leadFilter, setLeadFilter] = useState<"ALL" | "NEW" | "APPROVED" | "CONTACTED" | "CONVERTED">("ALL");
  const [projectFilter, setProjectFilter] = useState<"ALL" | "PENDING_PAYMENT" | "ACTIVE" | "IN_PROGRESS" | "COMPLETED">("ALL");

  // Modals
  const [selectedProofUrl, setSelectedProofUrl] = useState<string | null>(null);
  const [approvalModalInquiry, setApprovalModalInquiry] = useState<Inquiry | null>(null);
  const [approvalMessageText, setApprovalMessageText] = useState("");
  const [convertInquiryModal, setConvertInquiryModal] = useState<Inquiry | null>(null);
  const [convertTitle, setConvertTitle] = useState("");
  const [convertPrice, setConvertPrice] = useState("35000");
  const [convertCategory, setConvertCategory] = useState("Dental Practice & SaaS");

  // Create Project Modal
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [newProjectData, setNewProjectData] = useState({
    title: "",
    clientName: "",
    clientEmail: "",
    category: "Dental Practice",
    price: "45000",
    stagingUrl: "",
  });

  // Template Modal & Edit Template Modal
  const [showAddTemplateModal, setShowAddTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<ShowcaseTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    category: "DENTAL",
    title: "",
    tagline: "",
    badge: "",
    description: "",
    technologies: "NEXT.JS, TAILWIND CSS",
    imageUrl: "",
    demoUrl: "",
    displayOrder: 1,
  });

  // Staff Modal
  const [showAddStaffModal, setShowAddStaffModal] = useState(false);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    password: "",
    role: "PM",
    branchCode: "KIVEX_01002856",
    phone: "",
  });

  // Rejection Modal
  const [rejectPaymentId, setRejectPaymentId] = useState<number | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  // Settings Save Feedback
  const [settingsSavedMsg, setSettingsSavedMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Change Password Modal & State
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [pwdTargetEmail, setPwdTargetEmail] = useState("");
  const [pwdCurrent, setPwdCurrent] = useState("");
  const [pwdNew, setPwdNew] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [pwdLoading, setPwdLoading] = useState(false);
  const [pwdMsg, setPwdMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load Session & Set KIVEX TECHNOLOGY Page Title
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = "KIVEX TECHNOLOGY — Company & Staff Login";
    }
    const saved = localStorage.getItem("kivex_crm_session");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCurrentUser(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Fetch all CRM records
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.title = currentUser
        ? "KIVEX TECHNOLOGY — Company & Staff CRM"
        : "KIVEX TECHNOLOGY — Company & Staff Login";
    }
    if (!currentUser) return;
    fetchAllCRMData();
  }, [currentUser]);

  const fetchAllCRMData = async () => {
    setLoadingData(true);
    try {
      const [inqRes, payRes, projRes, tplRes, staffRes, setRes, usrRes] = await Promise.all([
        fetch("/api/inquiries"),
        fetch("/api/payments"),
        fetch("/api/projects"),
        fetch("/api/templates"),
        fetch("/api/crm/staff"),
        fetch("/api/settings"),
        fetch("/api/users?role=CLIENT"),
      ]);

      const [inqData, payData, projData, tplData, staffData, setData, usrData] = await Promise.all([
        inqRes.json(),
        payRes.json(),
        projRes.json(),
        tplRes.json(),
        staffRes.json(),
        setRes.json(),
        usrRes.json(),
      ]);

      if (inqData.success) setInquiries(inqData.inquiries || []);
      if (payData.success) setPayments(payData.payments || []);
      if (projData.success) setProjects(projData.projects || []);
      if (tplData.success) setTemplates(tplData.templates || []);
      if (staffData.success) setStaffList(staffData.staff || []);
      if (setData.success && setData.settings) setSettings(setData.settings);
      if (usrData.success) setRegisteredClients(usrData.users || []);
    } catch (err) {
      console.error("Error fetching CRM records:", err);
    } finally {
      setLoadingData(false);
    }
  };

  // Login Handler
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError("");

    try {
      const res = await fetch("/api/auth/crm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          branchCode: branchCode.trim(),
          email: email.trim(),
          password: password.trim(),
        }),
      });

      const data = await res.json();
      if (data.success && data.user) {
        localStorage.setItem("kivex_crm_session", JSON.stringify(data.user));
        setCurrentUser(data.user);
      } else {
        setLoginError(data.error || "Invalid branch credentials.");
      }
    } catch (err: any) {
      setLoginError("Could not connect to authentication server.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("kivex_crm_session");
    setCurrentUser(null);
  };

  // Approve Payment
  const handleApprovePayment = async (paymentId: number) => {
    if (!confirm("Are you sure you want to APPROVE this payment and activate the project?")) return;
    try {
      const res = await fetch("/api/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: paymentId,
          status: "APPROVED",
          approvedBy: `${currentUser?.name} (${currentUser?.role})`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAllCRMData();
      } else {
        alert(data.error || "Approval failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error approving payment");
    }
  };

  // Reject Payment
  const handleRejectPayment = async () => {
    if (!rejectPaymentId) return;
    try {
      const res = await fetch("/api/payments", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: rejectPaymentId,
          status: "REJECTED",
          rejectionReason: rejectionReason.trim() || "Transaction verification failed. Please check UTR / Receipt.",
          approvedBy: `${currentUser?.name} (${currentUser?.role})`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setRejectPaymentId(null);
        setRejectionReason("");
        fetchAllCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Convert Inquiry to Project
  const handleConvertInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!convertInquiryModal) return;

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: convertTitle.trim() || `Project for ${convertInquiryModal.name}`,
          clientEmail: convertInquiryModal.email,
          clientName: convertInquiryModal.name,
          category: convertCategory,
          price: convertPrice,
        }),
      });

      const data = await res.json();
      if (data.success) {
        await fetch("/api/inquiries", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: convertInquiryModal.id,
            status: "CONVERTED",
            notes: `Converted to project: ${data.project.project_code}`,
          }),
        });

        setConvertInquiryModal(null);
        fetchAllCRMData();
        setActiveTab("projects");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create Project Direct
  const handleCreateProjectDirect = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProjectData),
      });
      const data = await res.json();
      if (data.success) {
        setShowNewProjectModal(false);
        setNewProjectData({
          title: "",
          clientName: "",
          clientEmail: "",
          category: "Dental Practice",
          price: "45000",
          stagingUrl: "",
        });
        fetchAllCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Update Project Status & Progress
  const handleUpdateProjectStatus = async (projectId: number, newStatus: string, newProgress: number) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectId,
          status: newStatus,
          progress: newProgress,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAllCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Milestone in Project
  const handleToggleMilestone = async (project: Project, milestoneId: string) => {
    const updatedMilestones = project.milestones.map((m) =>
      m.id === milestoneId ? { ...m, completed: !m.completed } : m
    );
    const completedCount = updatedMilestones.filter((m) => m.completed).length;
    const calcProgress = Math.round((completedCount / updatedMilestones.length) * 100);

    try {
      await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
          milestones: updatedMilestones,
          progress: calcProgress,
        }),
      });
      fetchAllCRMData();
    } catch (err) {
      console.error(err);
    }
  };

  // Add Showcase Template
  const handleAddTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/templates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTemplate),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddTemplateModal(false);
        setNewTemplate({
          category: "DENTAL",
          title: "",
          tagline: "",
          badge: "",
          description: "",
          technologies: "NEXT.JS, TAILWIND CSS",
          imageUrl: "",
          demoUrl: "",
          displayOrder: 1,
        });
        fetchAllCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Template
  const handleDeleteTemplate = async (templateId: number) => {
    if (!confirm("Remove this template from live website?")) return;
    try {
      await fetch(`/api/templates?id=${templateId}`, { method: "DELETE" });
      fetchAllCRMData();
    } catch (err) {
      console.error(err);
    }
  };

  // Save Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSettingsSavedMsg("");
    try {
      const res = await fetch("/api/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: settings.company_name,
          gstin: settings.gstin,
          email: settings.email,
          phone: settings.phone,
          address: settings.address,
          upiId: settings.upi_id,
          beneficiaryName: settings.beneficiary_name,
          bankName: settings.bank_name,
          accountNumber: settings.account_number,
          ifscCode: settings.ifsc_code,
          qrImageUrl: settings.qr_image_url,
          branchCode: settings.branch_code,
          advancePercentage: settings.advance_percentage,
          whatsappNotifications: settings.whatsapp_notifications,
          googleClientId: settings.google_client_id || "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setSettingsSavedMsg("Enterprise Settings, Banking & Gateway updated successfully!");
        setTimeout(() => setSettingsSavedMsg(""), 4000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Change Password Handler
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwdNew !== pwdConfirm) {
      setPwdMsg({ type: "error", text: "New password and Confirm password do not match!" });
      return;
    }
    if (pwdNew.length < 6) {
      setPwdMsg({ type: "error", text: "New password must be at least 6 characters long." });
      return;
    }
    setPwdLoading(true);
    setPwdMsg(null);
    try {
      const emailToUpdate = pwdTargetEmail || currentUser?.email || "admin@kivex.com";
      const res = await fetch("/api/crm/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailToUpdate,
          oldPassword: pwdCurrent,
          newPassword: pwdNew,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update password");
      setPwdMsg({ type: "success", text: "Password updated successfully!" });
      setPwdCurrent("");
      setPwdNew("");
      setPwdConfirm("");
      setTimeout(() => {
        setShowChangePasswordModal(false);
        setPwdTargetEmail("");
        setPwdMsg(null);
      }, 1500);
    } catch (err: any) {
      setPwdMsg({ type: "error", text: err.message || "Failed to update password" });
    } finally {
      setPwdLoading(false);
    }
  };

  // Add Staff Member
  const handleAddStaff = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/crm/staff", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStaff),
      });
      const data = await res.json();
      if (data.success) {
        setShowAddStaffModal(false);
        setNewStaff({
          name: "",
          email: "",
          password: "",
          role: "PM",
          branchCode: "KIVEX_01002856",
          phone: "",
        });
        fetchAllCRMData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Staff Member
  const handleDeleteStaff = async (staffId: number) => {
    if (!confirm("Are you sure you want to remove this staff user?")) return;
    try {
      await fetch(`/api/crm/staff?id=${staffId}`, { method: "DELETE" });
      fetchAllCRMData();
    } catch (err) {
      console.error(err);
    }
  };

  // Ask Client on WhatsApp to Verify their Google Email on Client Portal
  const handleAskClientToVerifyEmail = (inq: Inquiry) => {
    const cleanPhone = inq.phone.replace(/[^0-9]/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const origin = typeof window !== "undefined" ? window.location.origin : "https://kivextechnology.com";
    const portalUrl = `${origin}/client?email=${encodeURIComponent(inq.email)}&name=${encodeURIComponent(inq.name)}&phone=${encodeURIComponent(inq.phone)}`;
    const waText = encodeURIComponent(
      `🔐 *KIVEX TECHNOLOGY — VERIFY YOUR GOOGLE EMAIL*\n\n` +
        `Hello ${inq.name},\n` +
        `We have received your project inquiry for *${inq.services}*.\n\n` +
        `Before we unlock your project dashboard in our CRM, please verify your Google Email (*${inq.email}*) by signing in with Google on our Client Portal:\n` +
        `${portalUrl}\n\n` +
        `Once your email is verified, our Admin will approve your project and you will receive your confirmation here on WhatsApp!\n\n` +
        `Best regards,\n*KIVEX TECHNOLOGY*`
    );
    window.open(`https://wa.me/${formattedPhone}?text=${waText}`, "_blank");
  };

  // Approve Inquiry & Open Approval Notification Dispatch Modal
  const handleApproveInquiry = async (inq: Inquiry) => {
    try {
      const res = await fetch("/api/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: inq.id,
          status: "APPROVED",
          notes: `Approved by ${currentUser?.name || "Admin"}`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fetchAllCRMData();

        const origin = typeof window !== "undefined" ? window.location.origin : "https://kivextechnology.com";
        const portalUrl = `${origin}/client?email=${encodeURIComponent(inq.email)}&name=${encodeURIComponent(inq.name)}&phone=${encodeURIComponent(inq.phone)}`;
        const msg =
          `🎉 *KIVEX TECHNOLOGY — PROJECT INQUIRY APPROVED!*\n\n` +
          `Dear ${inq.name},\n` +
          `Great news! Your Google Email (${inq.email}) is verified and your project inquiry for *${inq.services}* has been officially *APPROVED* by our Admin & Architecture Desk!\n\n` +
          `✅ *Your Client Portal Dashboard is now UNLOCKED.*\n` +
          `Our team will connect with you shortly to share your project milestones, staging preview, and roadmap.\n\n` +
          `🔗 *Login with Google to Access Your Portal:*\n${portalUrl}\n\n` +
          `Best regards,\n*KIVEX TECHNOLOGY*`;

        setApprovalMessageText(msg);
        setApprovalModalInquiry({ ...inq, status: "APPROVED" });
      }
    } catch (err) {
      console.error("Error approving inquiry:", err);
    }
  };

  // Delete Inquiry / Lead
  const handleDeleteInquiry = async (inquiryId: number) => {
    if (!confirm("Are you sure you want to permanently delete this inquiry lead?")) return;
    try {
      await fetch(`/api/inquiries?id=${inquiryId}`, { method: "DELETE" });
      fetchAllCRMData();
    } catch (err) {
      console.error("Error deleting inquiry:", err);
    }
  };

  // Delete Project
  const handleDeleteProject = async (projectId: number) => {
    if (!confirm("Are you sure you want to permanently delete this project?")) return;
    try {
      await fetch(`/api/projects?id=${projectId}`, { method: "DELETE" });
      fetchAllCRMData();
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  // Delete Client User
  const handleDeleteClientUser = async (userId?: number, clientEmail?: string) => {
    if (!confirm(`Are you sure you want to delete client ${clientEmail || ""}?`)) return;
    try {
      if (userId) {
        await fetch(`/api/users?id=${userId}`, { method: "DELETE" });
      }
      fetchAllCRMData();
    } catch (err) {
      console.error("Error deleting client user:", err);
    }
  };

  // Save Edited Showcase Template
  const handleSaveEditedTemplate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTemplate) return;
    try {
      const res = await fetch("/api/templates", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingTemplate.id,
          category: editingTemplate.category,
          title: editingTemplate.title,
          tagline: editingTemplate.tagline,
          badge: editingTemplate.badge,
          description: editingTemplate.description,
          imageUrl: editingTemplate.image_url,
          demoUrl: editingTemplate.demo_url,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEditingTemplate(null);
        fetchAllCRMData();
      }
    } catch (err) {
      console.error("Error updating template:", err);
    }
  };

  // Combine registered Google/Portal users + project clients
  const clientsMap = new Map<
    string,
    {
      id?: number;
      email: string;
      name: string;
      phone?: string;
      lastLogin?: string;
      projectCount: number;
      totalPaid: number;
    }
  >();

  registeredClients.forEach((u) => {
    clientsMap.set(u.email.toLowerCase(), {
      id: u.id,
      email: u.email,
      name: u.name,
      phone: u.phone || "",
      lastLogin: u.last_login,
      projectCount: Number(u.project_count || 0),
      totalPaid: Number(u.total_paid || 0),
    });
  });

  projects.forEach((p) => {
    const key = p.client_email.toLowerCase();
    const existing = clientsMap.get(key);
    if (!existing) {
      clientsMap.set(key, {
        email: p.client_email,
        name: p.client_name,
        projectCount: 1,
        totalPaid: 0,
      });
    } else if (!existing.id) {
      existing.projectCount += 1;
    }
  });

  payments
    .filter((pay) => pay.status === "APPROVED")
    .forEach((pay) => {
      const key = pay.client_email.toLowerCase();
      const existing = clientsMap.get(key);
      if (existing && !existing.id) {
        existing.totalPaid += Number(pay.amount);
      }
    });

  const clientsList = Array.from(clientsMap.values());

  // ==========================================
  // VIEW: COMPANY & STAFF CRM LOGIN (KIVEX TECHNOLOGY BRANDED)
  // ==========================================
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-[#F5EFE5] text-[#0A0A0A] flex flex-col justify-between selection:bg-[#2D5FC7] selection:text-white">
        <header className="border-b border-black/[0.08] bg-[#F5EFE5] px-4 sm:px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-7 sm:h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#0A0A0A] text-white">
                KIVEX TECHNOLOGY • STAFF LOGIN
              </span>
              <Link
                href="/"
                className="text-xs font-semibold text-[#525252] hover:text-[#0A0A0A] transition-colors"
              >
                ← Website
              </Link>
            </div>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
          <div className="w-full max-w-md rounded-3xl bg-white border border-black/[0.08] p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] relative overflow-hidden">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F5EFE5] border border-black/[0.08] mb-3">
                <Logo className="h-7 w-auto" showTagline={false} />
              </div>

              <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#2D5FC7] mb-1">
                KIVEX TECHNOLOGY
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight">
                Company & Staff Login
              </h1>
              <p className="mt-1.5 text-xs text-[#525252]">
                Sign in with your Branch Code, Staff Email & Password to manage leads, projects, and payments from Phone or PC.
              </p>

              {loginError && (
                <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs text-left font-semibold">
                  ⚠️ {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="mt-6 space-y-3.5 text-left">
                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#525252] mb-1">
                    Kivex Branch Code
                  </label>
                  <input
                    type="text"
                    required
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value)}
                    placeholder="e.g. KIVEX_01002856"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono text-sm focus:outline-none focus:border-[#2D5FC7] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#525252] mb-1">
                    Admin / Staff Email or Username
                  </label>
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@kivex.com"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] text-sm focus:outline-none focus:border-[#2D5FC7] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#525252]">
                      Security Password
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-[11px] font-semibold text-[#2D5FC7] hover:underline cursor-pointer"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] text-sm focus:outline-none focus:border-[#2D5FC7] focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full py-3.5 rounded-full bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-sm font-bold transition-all cursor-pointer shadow-md shadow-[#2D5FC7]/20 disabled:opacity-50 mt-2"
                >
                  {loginLoading ? "Signing in to Kivex CRM..." : "Login to Kivex Company CRM →"}
                </button>
              </form>

              <div className="mt-5 pt-4 border-t border-black/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#737373]">
                <button
                  type="button"
                  onClick={() => {
                    setBranchCode("KIVEX_01002856");
                    setEmail("admin@kivex.com");
                    setPassword("admin123");
                  }}
                  className="text-[#2D5FC7] font-semibold hover:underline cursor-pointer"
                >
                  ⚡ Tap to Fill Default Admin Credentials
                </button>
                <Link href="/client" className="text-slate-600 hover:text-black font-semibold">
                  Client Login Portal →
                </Link>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-black/[0.08] px-6 py-4 text-center text-xs text-[#737373]">
          KIVEX TECHNOLOGY • Official Company & Staff CRM Portal
        </footer>
      </div>
    );
  }

  // ==========================================
  // VIEW: AUTHENTICATED CRM DASHBOARD (DESKTOP + PHONE FRIENDLY)
  // ==========================================
  const pendingPayments = payments.filter((p) => p.status === "PENDING_APPROVAL");
  const newInquiries = inquiries.filter((i) => i.status === "NEW");
  const isSuperAdmin = currentUser.role === "SUPER_ADMIN";

  // Filtered Leads
  const filteredInquiries = inquiries.filter((inq) => {
    const matchFilter = leadFilter === "ALL" || inq.status === leadFilter;
    const matchSearch =
      !searchQuery ||
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.services.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Filtered Projects
  const filteredProjects = projects.filter((proj) => {
    const matchFilter = projectFilter === "ALL" || proj.status === projectFilter;
    const matchSearch =
      !searchQuery ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.client_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.project_code.toLowerCase().includes(searchQuery.toLowerCase());
    return matchFilter && matchSearch;
  });

  // Total Revenue Calculated
  const totalRevenue = payments
    .filter((p) => p.status === "APPROVED")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="min-h-screen bg-[#F5EFE5] text-[#0A0A0A] flex flex-col lg:flex-row selection:bg-[#2D5FC7] selection:text-white">
      {/* LEFT NAVIGATION RAIL / SIDEBAR (Desktop lg+) */}
      <aside className="hidden lg:flex w-64 bg-[#0C0D12] border-r border-[#1E2029] flex-col justify-between shrink-0 text-[#F5EFE5] z-30">
        <div>
          {/* Logo & Branch Area */}
          <div className="p-6 border-b border-white/[0.08]">
            <Link href="/">
              <Logo className="h-8 w-auto" />
            </Link>
            <div className="mt-2.5 flex items-center justify-between">
              <span className="text-xs font-semibold text-white/90 truncate max-w-[130px]">
                {currentUser.name || "Kivex Admin"}
              </span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Online
              </span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="p-4 space-y-1.5 text-xs font-semibold">
            <button
              onClick={() => setActiveTab("overview")}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                activeTab === "overview"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Command Center</span>
            </button>

            <button
              onClick={() => setActiveTab("leads")}
              className={cn(
                "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                activeTab === "leads"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <span>Inbound Leads</span>
              </div>
              {newInquiries.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#E8B62A] text-black text-[10px] font-bold">
                  {newInquiries.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("payments")}
              className={cn(
                "w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                activeTab === "payments"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <div className="flex items-center gap-3">
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                <span>Payment Approvals</span>
              </div>
              {pendingPayments.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#E8B62A] text-black text-[10px] font-bold">
                  {pendingPayments.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("projects")}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                activeTab === "projects"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Projects Directory</span>
            </button>

            <button
              onClick={() => setActiveTab("clients")}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                activeTab === "clients"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <span>Clients Roster ({clientsList.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("templates")}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                activeTab === "templates"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Showcase Templates CMS</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={cn(
                "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                activeTab === "settings"
                  ? "bg-[#2D5FC7] text-white shadow-sm"
                  : "text-white/60 hover:text-white hover:bg-white/[0.04]"
              )}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Company & Banking Settings</span>
            </button>

            {isSuperAdmin && (
              <button
                onClick={() => setActiveTab("staff")}
                className={cn(
                  "w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left",
                  activeTab === "staff"
                    ? "bg-[#2D5FC7] text-white shadow-sm"
                    : "text-white/60 hover:text-white hover:bg-white/[0.04]"
                )}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>Staff & Roles ({staffList.length})</span>
              </button>
            )}
          </nav>
        </div>

        {/* Profile Card & Logout */}
        <div className="p-4 border-t border-white/[0.08] space-y-2.5">
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
              <div className="text-[11px] text-white/50 truncate max-w-[140px]">{currentUser.email}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Sign Out"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
          <button
            onClick={() => {
              setPwdTargetEmail(currentUser.email || "");
              setShowChangePasswordModal(true);
            }}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg bg-white/[0.06] hover:bg-white/10 text-[11px] font-semibold text-white/80 hover:text-white transition-all cursor-pointer"
          >
            <span>🔑</span>
            <span>Change Password</span>
          </button>
        </div>
      </aside>

      {/* MOBILE TOP BAR + TOUCH TAB NAVIGATION (< 1024px Phone & Tablet Friendly) */}
      <div className="lg:hidden sticky top-0 z-30 bg-[#0C0D12] text-white border-b border-white/10">
        <div className="px-4 py-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <Link href="/">
              <Logo className="h-6 w-auto" />
            </Link>
            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-white">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPwdTargetEmail(currentUser.email || "");
                setShowChangePasswordModal(true);
              }}
              className="px-2 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-white cursor-pointer"
              title="Change Password"
            >
              🔑 Pwd
            </button>
            <button
              onClick={() => fetchAllCRMData()}
              className="px-2 py-1 rounded-lg bg-white/10 text-[11px] font-semibold text-white cursor-pointer"
            >
              ⟳ Sync
            </button>
            <button
              onClick={() => setShowNewProjectModal(true)}
              className="px-2.5 py-1 rounded-lg bg-[#2D5FC7] text-[11px] font-bold text-white cursor-pointer"
            >
              + Project
            </button>
            <button
              onClick={handleLogout}
              className="px-2.5 py-1 rounded-lg bg-red-500/20 text-red-300 text-[11px] font-semibold cursor-pointer"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Horizontal Scrollable Mobile Tab Strip */}
        <div className="flex items-center gap-1.5 overflow-x-auto px-4 pb-3 no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setActiveTab("overview")}
            className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer",
              activeTab === "overview" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
            )}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("leads")}
            className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
              activeTab === "leads" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
            )}
          >
            <span>Leads</span>
            {newInquiries.length > 0 && (
              <span className="px-1.5 rounded-full bg-[#E8B62A] text-black text-[10px] font-bold">
                {newInquiries.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("payments")}
            className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer flex items-center gap-1",
              activeTab === "payments" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
            )}
          >
            <span>Payments</span>
            {pendingPayments.length > 0 && (
              <span className="px-1.5 rounded-full bg-[#E8B62A] text-black text-[10px] font-bold">
                {pendingPayments.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer",
              activeTab === "projects" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
            )}
          >
            Projects ({projects.length})
          </button>
          <button
            onClick={() => setActiveTab("clients")}
            className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer",
              activeTab === "clients" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
            )}
          >
            Clients ({clientsList.length})
          </button>
          <button
            onClick={() => setActiveTab("templates")}
            className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer",
              activeTab === "templates" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
            )}
          >
            Templates
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={cn(
              "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer",
              activeTab === "settings" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
            )}
          >
            Settings
          </button>
          {isSuperAdmin && (
            <button
              onClick={() => setActiveTab("staff")}
              className={cn(
                "px-3 py-1.5 rounded-full whitespace-nowrap transition-all cursor-pointer",
                activeTab === "staff" ? "bg-[#2D5FC7] text-white" : "bg-white/5 text-white/70"
              )}
            >
              Staff ({staffList.length})
            </button>
          )}
        </div>
      </div>

      {/* RIGHT MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="sticky top-0 z-20 bg-[#F5EFE5]/95 backdrop-blur-md border-b border-black/[0.08] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <h2 className="text-sm sm:text-base font-extrabold text-[#0A0A0A] tracking-tight capitalize">
              {activeTab === "overview" && "Command Center & Analytics"}
              {activeTab === "leads" && "Inbound Leads Pipeline"}
              {activeTab === "payments" && "Payment Approvals Queue"}
              {activeTab === "projects" && "Client Project Sprints"}
              {activeTab === "clients" && "Client Accounts Directory"}
              {activeTab === "templates" && "Website Showcase Templates CMS"}
              {activeTab === "settings" && "Company & Payment Settings"}
              {activeTab === "staff" && "Staff Accounts & Access Rights"}
            </h2>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              System Active
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:flex-initial">
              <input
                type="text"
                placeholder="Search leads, projects, UTR..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-64 px-3.5 py-1.5 pl-8 rounded-full bg-white border border-black/[0.12] text-xs text-[#0A0A0A] placeholder-slate-400 focus:outline-none focus:border-[#2D5FC7] shadow-2xs"
              />
              <svg className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <button
              onClick={() => setShowNewProjectModal(true)}
              className="hidden sm:inline-flex px-4 py-2 rounded-full bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0"
            >
              + New Project
            </button>
          </div>
        </header>

        {/* Dynamic Content Canvas */}
        <main className="p-4 sm:p-8 space-y-6">
          {/* ========================================================= */}
          {/* 1. COMMAND CENTER / OVERVIEW */}
          {/* ========================================================= */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Friendly 4-Step Operations Guide */}
              <div className="rounded-2xl bg-white border border-black/[0.08] p-4 sm:p-5 shadow-xs">
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#2D5FC7] mb-2.5">
                  KIVEX TECHNOLOGY • QUICK OPERATIONS GUIDE
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                    <span className="font-mono font-bold text-[#2D5FC7]">STEP 1 •</span>{" "}
                    <strong className="text-[#0A0A0A]">Client Submits Form</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Lead appears in Inbound Leads & sends WhatsApp inquiry.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                    <span className="font-mono font-bold text-emerald-600">STEP 2 •</span>{" "}
                    <strong className="text-[#0A0A0A]">Gmail Verification</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Client signs in on <code className="font-mono">/client</code> with real Google Mail.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                    <span className="font-mono font-bold text-[#E8B62A]">STEP 3 •</span>{" "}
                    <strong className="text-[#0A0A0A]">Approve & Notify</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Click <strong>Approve & Send Msg ✓</strong> to unlock portal & WhatsApp client.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.06]">
                    <span className="font-mono font-bold text-purple-600">STEP 4 •</span>{" "}
                    <strong className="text-[#0A0A0A]">Project & QR Payment</strong>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Convert lead to project, verify UTR receipt & print GST Invoice.
                    </p>
                  </div>
                </div>
              </div>

              {/* Metric Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="rounded-2xl bg-white border border-black/[0.08] p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#525252] font-mono uppercase">
                    <span>Inbound Inquiries</span>
                    <span className="w-2 h-2 rounded-full bg-[#2D5FC7]" />
                  </div>
                  <div className="text-3xl font-black text-[#0A0A0A] mt-2">{inquiries.length}</div>
                  <div className="text-xs text-[#E8B62A] font-semibold mt-1">
                    {newInquiries.length} uncontacted website leads
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-black/[0.08] p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#525252] font-mono uppercase">
                    <span>Pending Approvals</span>
                    <span className="w-2 h-2 rounded-full bg-[#E8B62A]" />
                  </div>
                  <div className="text-3xl font-black text-[#E8B62A] mt-2">
                    {pendingPayments.length}
                  </div>
                  <div className="text-xs text-[#525252] mt-1">
                    Awaiting Super Admin review
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-black/[0.08] p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#525252] font-mono uppercase">
                    <span>Active Projects</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="text-3xl font-black text-[#0A0A0A] mt-2">
                    {projects.filter((p) => p.status === "ACTIVE" || p.status === "IN_PROGRESS").length}
                  </div>
                  <div className="text-xs text-emerald-600 font-semibold mt-1">
                    {projects.length} total across all clients
                  </div>
                </div>

                <div className="rounded-2xl bg-white border border-black/[0.08] p-5 shadow-xs">
                  <div className="flex items-center justify-between text-xs text-[#525252] font-mono uppercase">
                    <span>Verified Collections</span>
                    <span className="w-2 h-2 rounded-full bg-[#2D5FC7]" />
                  </div>
                  <div className="text-3xl font-black text-[#2D5FC7] mt-2">
                    ₹{totalRevenue.toLocaleString("en-IN")}
                  </div>
                  <div className="text-xs text-[#525252] mt-1 font-mono">
                    Official HDFC / UPI Settlements
                  </div>
                </div>
              </div>

              {/* Priority Action Queues (2 Columns) */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pending Payments Queue */}
                <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                      <span>Payment Approvals Required</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#FFF8E6] text-[#C99A1A] border border-[#F0CC5A] text-[11px] font-bold">
                        {pendingPayments.length} Action Needed
                      </span>
                    </h3>
                    <button
                      onClick={() => setActiveTab("payments")}
                      className="text-xs text-[#2D5FC7] hover:underline font-semibold"
                    >
                      View Desk →
                    </button>
                  </div>

                  {pendingPayments.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      ✓ No payments waiting in queue.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {pendingPayments.slice(0, 3).map((pay) => (
                        <div
                          key={pay.id}
                          className="p-3.5 rounded-xl bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs font-bold text-[#0A0A0A]">
                              ₹{Number(pay.amount).toLocaleString("en-IN")} • {pay.client_name || pay.client_email}
                            </div>
                            <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                              UTR: {pay.utr_number}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setSelectedProofUrl(pay.screenshot_url)}
                              className="px-2.5 py-1 rounded-md bg-white border border-slate-300 text-xs font-semibold hover:bg-slate-50"
                            >
                              Proof
                            </button>
                            <button
                              onClick={() => handleApprovePayment(pay.id)}
                              className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                            >
                              Approve ✓
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fresh Website Inquiries Queue */}
                <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-[#0A0A0A] flex items-center gap-2">
                      <span>Inbound Website Leads</span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2D5FC7] border border-blue-200 text-[11px] font-bold">
                        {inquiries.length} Received
                      </span>
                    </h3>
                    <button
                      onClick={() => setActiveTab("leads")}
                      className="text-xs text-[#2D5FC7] hover:underline font-semibold"
                    >
                      View All →
                    </button>
                  </div>

                  {inquiries.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No inbound leads received yet.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {inquiries.slice(0, 3).map((inq) => (
                        <div
                          key={inq.id}
                          className="p-3.5 rounded-xl bg-[#FAF7F2] border border-black/[0.06] flex items-center justify-between gap-3"
                        >
                          <div>
                            <div className="text-xs font-bold text-[#0A0A0A]">{inq.name}</div>
                            <div className="text-[11px] text-slate-500">{inq.email} • {inq.phone}</div>
                            <div className="text-[11px] text-[#2D5FC7] font-semibold mt-0.5 truncate max-w-xs">{inq.services}</div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {inq.status === "NEW" && (
                              <button
                                onClick={() => handleApproveInquiry(inq)}
                                className="px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs cursor-pointer"
                              >
                                Approve ✓
                              </button>
                            )}
                            <button
                              onClick={() => {
                                setConvertInquiryModal(inq);
                                setConvertTitle(`Custom Platform: ${inq.name}`);
                              }}
                              className="px-3 py-1 rounded-full bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-semibold shadow-xs cursor-pointer"
                            >
                              Convert
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 2. INBOUND LEADS PIPELINE */}
          {/* ========================================================= */}
          {activeTab === "leads" && (
            <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Inbound Leads & Inquiry Approval Queue</h3>
                  <p className="text-xs text-[#525252]">
                    Approve client inquiries to unlock their Client Portal and send them an instant WhatsApp approval notification.
                  </p>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-1.5 bg-[#FAF7F2] p-1 rounded-xl border border-black/[0.06] text-xs font-semibold">
                  {(["ALL", "NEW", "APPROVED", "CONTACTED", "CONVERTED"] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setLeadFilter(st)}
                      className={cn(
                        "px-3 py-1 rounded-lg transition-colors cursor-pointer",
                        leadFilter === st ? "bg-[#2D5FC7] text-white shadow-xs" : "text-slate-600 hover:text-black"
                      )}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {filteredInquiries.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No inquiries found matching current filters.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/[0.08] text-slate-500 font-mono text-[11px] uppercase">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Prospect</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Google Email Verification</th>
                        <th className="py-3 px-4">Services</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {filteredInquiries.map((inq) => {
                        const verifiedPortalUser = registeredClients.find(
                          (u) => u.email.toLowerCase() === inq.email.toLowerCase()
                        );
                        return (
                          <tr key={inq.id} className="hover:bg-[#FAF7F2] transition-colors">
                            <td className="py-3.5 px-4 font-mono text-slate-500">
                              {new Date(inq.created_at).toLocaleDateString()}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-[#0A0A0A]">{inq.name}</div>
                              <div className="text-[11px] text-slate-500 max-w-[180px] truncate">
                                {inq.business_description}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="text-slate-800 font-medium">{inq.email}</div>
                              <div className="font-mono text-slate-500 text-[11px]">{inq.phone}</div>
                            </td>
                            <td className="py-3.5 px-4">
                              {verifiedPortalUser ? (
                                <div>
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold">
                                    ● VERIFIED ON PORTAL
                                  </span>
                                  {verifiedPortalUser.last_login && (
                                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                                      {new Date(verifiedPortalUser.last_login).toLocaleString()}
                                    </div>
                                  )}
                                </div>
                              ) : (
                                <div className="space-y-1">
                                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                                    ○ NOT VERIFIED YET
                                  </span>
                                  <div>
                                    <button
                                      type="button"
                                      onClick={() => handleAskClientToVerifyEmail(inq)}
                                      className="text-[11px] text-[#2D5FC7] hover:underline font-bold cursor-pointer"
                                    >
                                      Ask to Verify on WhatsApp →
                                    </button>
                                  </div>
                                </div>
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-[#2D5FC7] font-semibold max-w-[180px]">
                              {inq.services}
                            </td>
                            <td className="py-3.5 px-4">
                              <span
                                className={cn(
                                  "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold",
                                  inq.status === "NEW" && "bg-amber-100 text-amber-800",
                                  inq.status === "APPROVED" && "bg-emerald-100 text-emerald-800",
                                  inq.status === "CONTACTED" && "bg-blue-100 text-blue-800",
                                  inq.status === "CONVERTED" && "bg-purple-100 text-purple-800"
                                )}
                              >
                                {inq.status}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => handleApproveInquiry(inq)}
                                  className="px-2.5 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-xs cursor-pointer"
                                  title="Approve Inquiry & Open WhatsApp Approval Message"
                                >
                                  {inq.status === "APPROVED"
                                    ? "Send Approval Msg 💬"
                                    : "Approve & Send Msg ✓"}
                                </button>
                                <button
                                  onClick={() => {
                                    setConvertInquiryModal(inq);
                                    setConvertTitle(`Custom Platform: ${inq.name}`);
                                  }}
                                  className="px-2.5 py-1 rounded-md bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-[11px] font-semibold shadow-xs cursor-pointer"
                                >
                                  Convert to Project
                                </button>
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="px-2 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11px] font-semibold cursor-pointer"
                                  title="Delete Lead"
                                >
                                  Delete ✕
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 3. PAYMENT APPROVALS QUEUE */}
          {/* ========================================================= */}
          {activeTab === "payments" && (
            <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Payment Verification Desk</h3>
                  <p className="text-xs text-[#525252]">
                    Review client UPI QR screenshots. Approving instantly marks the client&apos;s project as ACTIVE!
                  </p>
                </div>
              </div>

              {payments.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No payment transactions on record.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/[0.08] text-slate-500 font-mono text-[11px] uppercase">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Project</th>
                        <th className="py-3 px-4">Client</th>
                        <th className="py-3 px-4">Amount</th>
                        <th className="py-3 px-4">UTR Reference</th>
                        <th className="py-3 px-4">Receipt Proof</th>
                        <th className="py-3 px-4">Verification</th>
                        <th className="py-3 px-4 text-right">Action</th>
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
                          <td className="py-3.5 px-4">
                            <div className="text-slate-800">{pay.client_name || "Client"}</div>
                            <div className="text-slate-500 text-[11px]">{pay.client_email}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#0A0A0A]">
                            ₹{Number(pay.amount).toLocaleString("en-IN")}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#2D5FC7]">
                            {pay.utr_number}
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => setSelectedProofUrl(pay.screenshot_url)}
                              className="px-2.5 py-1 rounded bg-[#FAF7F2] hover:bg-slate-100 border border-slate-300 text-[11px] font-semibold text-slate-800 cursor-pointer"
                            >
                              Inspect Screenshot
                            </button>
                          </td>
                          <td className="py-3.5 px-4">
                            {pay.status === "PENDING_APPROVAL" && (
                              <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[11px]">
                                ⏳ Pending Review
                              </span>
                            )}
                            {pay.status === "APPROVED" && (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                                ✓ Approved ({pay.approved_by || "Admin"})
                              </span>
                            )}
                            {pay.status === "REJECTED" && (
                              <span className="px-2.5 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[11px]">
                                ✕ Rejected
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {pay.status === "PENDING_APPROVAL" ? (
                              <div className="inline-flex items-center gap-2">
                                <button
                                  onClick={() => handleApprovePayment(pay.id)}
                                  className="px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs cursor-pointer"
                                >
                                  Approve & Activate ✓
                                </button>
                                <button
                                  onClick={() => {
                                    setRejectPaymentId(pay.id);
                                    setRejectionReason("");
                                  }}
                                  className="px-2.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 border border-red-200 text-red-600 text-xs font-semibold cursor-pointer"
                                >
                                  Reject ✕
                                </button>
                              </div>
                            ) : (
                              <span className="text-slate-400 text-xs italic font-mono">Settled</span>
                            )}
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
          {/* 4. PROJECTS DIRECTORY & SPRINTS */}
          {/* ========================================================= */}
          {activeTab === "projects" && (
            <div className="space-y-6">
              <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Projects & Field Sales Directory</h3>
                  <p className="text-xs text-[#525252]">
                    Create projects manually for any client&apos;s Google email. Once created, the client can log into /client and immediately view their project.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-1 bg-[#FAF7F2] p-1 rounded-xl border border-black/[0.06] text-xs font-semibold">
                    {(["ALL", "PENDING_PAYMENT", "ACTIVE", "IN_PROGRESS", "COMPLETED"] as const).map((st) => (
                      <button
                        key={st}
                        onClick={() => setProjectFilter(st)}
                        className={cn(
                          "px-2.5 py-1 rounded-lg transition-colors cursor-pointer text-[11px]",
                          projectFilter === st ? "bg-[#2D5FC7] text-white shadow-xs" : "text-slate-600 hover:text-black"
                        )}
                      >
                        {st}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowNewProjectModal(true)}
                    className="px-3.5 py-1.5 rounded-xl bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    + Create Project
                  </button>
                </div>
              </div>

              {filteredProjects.length === 0 ? (
                <div className="rounded-2xl bg-white border border-black/[0.08] p-12 text-center text-xs text-slate-400">
                  No projects matching filter.
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {filteredProjects.map((proj) => {
                    const milestones = Array.isArray(proj.milestones) ? proj.milestones : [];

                    return (
                      <div
                        key={proj.id}
                        className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                                {proj.project_code}
                              </span>
                              <h4 className="text-base font-bold text-[#0A0A0A] mt-1.5">{proj.title}</h4>
                              <div className="text-xs text-slate-500">
                                {proj.client_name} (<span className="font-mono text-[#2D5FC7]">{proj.client_email}</span>)
                              </div>
                            </div>

                            <span
                              className={cn(
                                "px-2.5 py-1 rounded-full text-[11px] font-bold font-mono",
                                proj.status === "ACTIVE" && "bg-emerald-100 text-emerald-800",
                                proj.status === "PENDING_PAYMENT" && "bg-amber-100 text-amber-800",
                                proj.status === "IN_PROGRESS" && "bg-blue-100 text-blue-800",
                                proj.status === "COMPLETED" && "bg-purple-100 text-purple-800"
                              )}
                            >
                              {proj.status}
                            </span>
                          </div>

                          {/* Progress Controller */}
                          <div className="mt-4 pt-4 border-t border-slate-100">
                            <div className="flex justify-between text-xs mb-1 font-semibold text-slate-700">
                              <span>Sprint Delivery: {proj.progress}%</span>
                              <span className="font-mono text-[#2D5FC7]">₹{Number(proj.price).toLocaleString("en-IN")}</span>
                            </div>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={proj.progress}
                              onChange={(e) =>
                                handleUpdateProjectStatus(proj.id, proj.status, Number(e.target.value))
                              }
                              className="w-full accent-[#2D5FC7] cursor-pointer"
                            />
                          </div>

                          {/* Milestones Checklist */}
                          <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                            <div className="text-[11px] font-mono uppercase font-bold text-slate-400">
                              Milestone Phases
                            </div>
                            {milestones.map((m) => (
                              <label
                                key={m.id}
                                className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-black"
                              >
                                <input
                                  type="checkbox"
                                  checked={m.completed}
                                  onChange={() => handleToggleMilestone(proj, m.id)}
                                  className="w-4 h-4 accent-[#2D5FC7] rounded"
                                />
                                <span className={m.completed ? "line-through text-slate-400" : ""}>
                                  {m.title}
                                </span>
                              </label>
                            ))}
                          </div>

                          {/* Staging URL */}
                          {proj.staging_url && (
                            <div className="mt-4 pt-3 border-t border-slate-100 text-xs">
                              <span className="text-slate-400">Staging: </span>
                              <a
                                href={proj.staging_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#2D5FC7] font-semibold hover:underline"
                              >
                                {proj.staging_url} ↗
                              </a>
                            </div>
                          )}
                        </div>

                        {/* Status Switcher & Delete Buttons */}
                        <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <div className="flex flex-wrap gap-1.5">
                            <button
                              onClick={() => handleUpdateProjectStatus(proj.id, "ACTIVE", Math.max(proj.progress, 30))}
                              className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-[11px] font-semibold cursor-pointer"
                            >
                              Active
                            </button>
                            <button
                              onClick={() => handleUpdateProjectStatus(proj.id, "IN_PROGRESS", Math.max(proj.progress, 65))}
                              className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-[11px] font-semibold cursor-pointer"
                            >
                              In Progress
                            </button>
                            <button
                              onClick={() => handleUpdateProjectStatus(proj.id, "COMPLETED", 100)}
                              className="px-2.5 py-1 rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200 text-[11px] font-semibold cursor-pointer"
                            >
                              Completed
                            </button>
                          </div>

                          <button
                            onClick={() => handleDeleteProject(proj.id)}
                            className="px-2.5 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11px] font-semibold cursor-pointer"
                          >
                            Delete Project ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* ========================================================= */}
          {/* 5. CLIENTS DIRECTORY & GOOGLE LOGIN TRACKER */}
          {/* ========================================================= */}
          {activeTab === "clients" && (
            <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Clients Roster & Google Auth Login Tracker</h3>
                  <p className="text-xs text-[#525252]">
                    Real-time directory of all clients who signed into the Client Portal via Google Mail, their last login timestamp, active projects, and total spend.
                  </p>
                </div>

                <button
                  onClick={() => setShowNewProjectModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  + Create Project for Client
                </button>
              </div>

              {clientsList.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-400">
                  No registered clients yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-black/[0.08] text-slate-500 font-mono text-[11px] uppercase">
                        <th className="py-3 px-4">Client Name</th>
                        <th className="py-3 px-4">Google Mail / Login ID</th>
                        <th className="py-3 px-4">Last Portal Login</th>
                        <th className="py-3 px-4">Projects</th>
                        <th className="py-3 px-4">Total Paid (INR)</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-black/[0.04]">
                      {clientsList.map((client) => (
                        <tr key={client.email} className="hover:bg-[#FAF7F2] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-[#0A0A0A]">{client.name}</div>
                            {client.phone && (
                              <div className="text-[11px] font-mono text-slate-500">{client.phone}</div>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-[#2D5FC7] font-mono font-semibold">
                            {client.email}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">
                            {client.lastLogin ? (
                              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {new Date(client.lastLogin).toLocaleString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-[11px]">Awaiting First Login</span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-[#2D5FC7] font-bold text-[11px]">
                              {client.projectCount} Projects
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-600">
                            ₹{client.totalPaid.toLocaleString("en-IN")}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="inline-flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setNewProjectData({
                                    ...newProjectData,
                                    clientName: client.name,
                                    clientEmail: client.email,
                                  });
                                  setShowNewProjectModal(true);
                                }}
                                className="px-2.5 py-1 rounded-md bg-[#2D5FC7] text-white hover:bg-[#1E3D8A] text-[11px] font-semibold cursor-pointer"
                              >
                                + Assign Project
                              </button>
                              {client.id && (
                                <button
                                  onClick={() => handleDeleteClientUser(client.id, client.email)}
                                  className="px-2.5 py-1 rounded-md bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-[11px] font-semibold cursor-pointer"
                                >
                                  Delete User ✕
                                </button>
                              )}
                            </div>
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
          {/* 6. SHOWCASE TEMPLATES CMS */}
          {/* ========================================================= */}
          {activeTab === "templates" && (
            <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Website Showcase Templates CMS ({templates.length} Active)</h3>
                  <p className="text-xs text-[#525252]">
                    Add, edit live links, or remove website templates for Dental, Real Estate, and SaaS. Any link update reflects on the main website immediately.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddTemplateModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  + Add Showcase Template
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    className="rounded-2xl bg-white border border-black/[0.08] overflow-hidden flex flex-col justify-between shadow-xs group"
                  >
                    <div className="relative h-44 w-full bg-slate-100 overflow-hidden">
                      <img
                        src={tpl.image_url}
                        alt={tpl.title}
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-2.5 left-2.5 bg-black/80 text-[#E8B62A] text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                        {tpl.category}
                      </span>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#0A0A0A]">{tpl.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{tpl.description}</p>
                        <div className="mt-2 text-[10px] font-mono text-slate-400 truncate">
                          Link: {tpl.demo_url}
                        </div>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <a
                          href={tpl.demo_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2D5FC7] font-semibold hover:underline"
                        >
                          Live Demo ↗
                        </a>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => setEditingTemplate(tpl)}
                            className="text-slate-700 hover:text-[#2D5FC7] text-xs font-bold cursor-pointer"
                          >
                            Edit Link ✎
                          </button>
                          <button
                            onClick={() => handleDeleteTemplate(tpl.id)}
                            className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                          >
                            Delete ✕
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* 7. COMPANY & PAYMENT SETTINGS */}
          {/* ========================================================= */}
          {activeTab === "settings" && (
            <div className="rounded-2xl bg-white border border-black/[0.08] p-6 sm:p-8 shadow-xs max-w-4xl">
              <div className="mb-6">
                <h3 className="text-base font-bold text-[#0A0A0A]">Company Profile, Banking & Gateway Settings</h3>
                <p className="text-xs text-[#525252]">
                  Configure your company identity, official UPI handle, QR Code, bank account, and branch credentials. Changes save in real-time and update the client portal.
                </p>
              </div>

              {settingsSavedMsg && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                  ✓ {settingsSavedMsg}
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
                {/* 1. Legal Company Info */}
                <div className="border-b border-slate-200 pb-5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D5FC7] mb-3">
                    1. Company Entity & Registration
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Company Registered Name</label>
                      <input
                        type="text"
                        value={settings.company_name}
                        onChange={(e) => setSettings({ ...settings, company_name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">GSTIN Number</label>
                      <input
                        type="text"
                        value={settings.gstin}
                        onChange={(e) => setSettings({ ...settings, gstin: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Support Email</label>
                      <input
                        type="email"
                        value={settings.email}
                        onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Support Phone</label>
                      <input
                        type="text"
                        value={settings.phone}
                        onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-slate-700 font-semibold mb-1">Registered Address</label>
                      <input
                        type="text"
                        value={settings.address}
                        onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Payment & QR Configuration */}
                <div className="border-b border-slate-200 pb-5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D5FC7] mb-3">
                    2. Payment Gateway & Official UPI Scanner
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Official UPI ID (Shown on Client Portal)</label>
                      <input
                        type="text"
                        value={settings.upi_id}
                        onChange={(e) => setSettings({ ...settings, upi_id: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono font-bold text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">UPI Beneficiary Name</label>
                      <input
                        type="text"
                        value={settings.beneficiary_name}
                        onChange={(e) => setSettings({ ...settings, beneficiary_name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Bank Name</label>
                      <input
                        type="text"
                        value={settings.bank_name}
                        onChange={(e) => setSettings({ ...settings, bank_name: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Account Number</label>
                      <input
                        type="text"
                        value={settings.account_number}
                        onChange={(e) => setSettings({ ...settings, account_number: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">IFSC Code</label>
                      <input
                        type="text"
                        value={settings.ifsc_code}
                        onChange={(e) => setSettings({ ...settings, ifsc_code: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Default Advance Deposit %</label>
                      <input
                        type="number"
                        min="10"
                        max="100"
                        value={settings.advance_percentage}
                        onChange={(e) => setSettings({ ...settings, advance_percentage: Number(e.target.value) })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Branch Code & Notification Policy */}
                <div className="border-b border-slate-200 pb-5">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D5FC7] mb-3">
                    3. Branch Credentials & Notifications
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">Primary Branch Code</label>
                      <input
                        type="text"
                        value={settings.branch_code}
                        onChange={(e) => setSettings({ ...settings, branch_code: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono font-bold"
                      />
                    </div>

                    <div className="flex items-center pt-5">
                      <label className="flex items-center gap-2.5 cursor-pointer text-slate-800 font-semibold">
                        <input
                          type="checkbox"
                          checked={settings.whatsapp_notifications}
                          onChange={(e) => setSettings({ ...settings, whatsapp_notifications: e.target.checked })}
                          className="w-4 h-4 accent-[#2D5FC7] rounded"
                        />
                        <span>Enable WhatsApp Instant Lead Routing</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* 4. Google OAuth 2.0 Configuration (For Live Production Hosting) */}
                <div className="pb-2">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D5FC7] mb-1">
                    4. Google OAuth 2.0 Authentication (Client Portal — Host Ready)
                  </h4>
                  <p className="text-[11px] text-slate-500 mb-3">
                    Paste your Google Cloud OAuth 2.0 Client ID here anytime (before or after hosting). Once saved, the Client Portal (<code className="font-mono text-[#0A0A0A]">/client</code>) automatically opens the official Google Account Popup and verifies real Google tokens.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-slate-700 font-semibold mb-1">
                        Google OAuth 2.0 Client ID (<span className="font-mono text-[11px] text-slate-500">xxxx.apps.googleusercontent.com</span>)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1234567890-abcdefg.apps.googleusercontent.com"
                        value={settings.google_client_id || ""}
                        onChange={(e) => setSettings({ ...settings, google_client_id: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                      />
                    </div>

                    <div className="p-4 rounded-xl bg-[#FAF7F2] border border-black/[0.08] space-y-1.5 text-[11px] text-slate-600">
                      <div className="font-bold text-[#0A0A0A]">
                        How to Get Your Google Client ID When You Host:
                      </div>
                      <div>
                        1. Open <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-[#2D5FC7] underline font-semibold">Google Cloud Console → Credentials</a> and click <strong>Create Credentials → OAuth client ID (Web application)</strong>.
                      </div>
                      <div>
                        2. Under <strong>Authorized JavaScript origins</strong>, add <code className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[#0A0A0A]">http://localhost:3000</code> and your live hosted domain (e.g. <code className="px-1.5 py-0.5 rounded bg-white border border-slate-200 font-mono text-[#0A0A0A]">{typeof window !== "undefined" ? window.location.origin : "https://yourdomain.com"}</code>).
                      </div>
                      <div>
                        3. Copy the generated <strong>Client ID</strong> and paste it above (or in your hosting environment variable <code className="font-mono text-[#0A0A0A]">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>).
                      </div>
                    </div>
                  </div>
                </div>

                {/* 5. Administrator Password & Security */}
                <div className="border-t border-slate-200 pt-5">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#2D5FC7]">
                      5. Administrator Password &amp; Account Security
                    </h4>
                    <button
                      type="button"
                      onClick={() => {
                        setPwdTargetEmail(currentUser.email || "");
                        setShowChangePasswordModal(true);
                      }}
                      className="px-3.5 py-1.5 rounded-lg bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold cursor-pointer transition-all"
                    >
                      🔑 Change Password Now
                    </button>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Change your admin credentials anytime. All changes take effect immediately across all sessions.
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold transition-all shadow-md cursor-pointer"
                  >
                    Save Enterprise Settings ✓
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* ========================================================= */}
          {/* 8. STAFF & ROLES (SUPER ADMIN ONLY) */}
          {/* ========================================================= */}
          {activeTab === "staff" && isSuperAdmin && (
            <div className="rounded-2xl bg-white border border-black/[0.08] p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-base font-bold text-[#0A0A0A]">Staff Roster & Permissions</h3>
                  <p className="text-xs text-[#525252]">
                    Super Admin console for creating project managers, developers, auditors, and sales personnel.
                  </p>
                </div>

                <button
                  onClick={() => setShowAddStaffModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold shadow-xs cursor-pointer"
                >
                  + Add New Staff Member
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-black/[0.08] text-slate-500 font-mono text-[11px] uppercase">
                      <th className="py-3 px-4">Name</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Branch Code</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Joined Date</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.04]">
                    {staffList.map((st) => (
                      <tr key={st.id} className="hover:bg-[#FAF7F2] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-[#0A0A0A]">{st.name}</td>
                        <td className="py-3.5 px-4 text-slate-700">{st.email}</td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">{st.branch_code}</td>
                        <td className="py-3.5 px-4">
                          <span
                            className={cn(
                              "px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold",
                              st.role === "SUPER_ADMIN" && "bg-purple-100 text-purple-800",
                              st.role === "PM" && "bg-blue-100 text-blue-800",
                              st.role === "ACCOUNTS" && "bg-amber-100 text-amber-800",
                              st.role === "DEVELOPER" && "bg-emerald-100 text-emerald-800",
                              st.role === "SALES" && "bg-pink-100 text-pink-800"
                            )}
                          >
                            {st.role}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 font-mono text-slate-500">
                          {new Date(st.created_at).toLocaleDateString()}
                        </td>
                        <td className="py-3.5 px-4 text-right space-x-3">
                          <button
                            onClick={() => {
                              setPwdTargetEmail(st.email);
                              setShowChangePasswordModal(true);
                            }}
                            className="text-[#2D5FC7] hover:underline text-xs font-semibold cursor-pointer"
                          >
                            🔑 Change Password
                          </button>
                          {st.role !== "SUPER_ADMIN" && (
                            <button
                              onClick={() => handleDeleteStaff(st.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer"
                            >
                              Remove ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: Enlarge Screenshot Proof */}
      {selectedProofUrl && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 text-center shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-bold text-[#0A0A0A]">Client UPI Receipt Proof</h3>
              <button
                onClick={() => setSelectedProofUrl(null)}
                className="text-slate-400 hover:text-black text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            <img
              src={selectedProofUrl}
              alt="Receipt preview"
              className="max-h-[60vh] w-auto mx-auto rounded-xl border border-slate-200"
            />
          </div>
        </div>
      )}

      {/* MODAL: Reject Payment Reason */}
      {rejectPaymentId && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 text-left shadow-2xl">
            <h3 className="text-base font-bold text-[#0A0A0A]">Reject Payment Proof</h3>
            <p className="text-xs text-slate-500 mt-1">
              Provide feedback for why this transaction was rejected.
            </p>

            <textarea
              rows={3}
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. UTR number mismatch or blurry receipt."
              className="w-full mt-4 p-3 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-xs focus:outline-none focus:border-red-500"
            />

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setRejectPaymentId(null)}
                className="px-4 py-2 rounded-lg bg-slate-100 text-xs text-slate-600 hover:text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectPayment}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-xs font-bold text-white shadow-xs"
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Convert Inquiry to Project */}
      {convertInquiryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#0A0A0A]">Convert Inquiry to Client Project</h3>
              <button
                onClick={() => setConvertInquiryModal(null)}
                className="text-slate-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleConvertInquiry} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  value={convertTitle}
                  onChange={(e) => setConvertTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Client Name</label>
                  <input
                    type="text"
                    disabled
                    value={convertInquiryModal.name}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Client Email</label>
                  <input
                    type="text"
                    disabled
                    value={convertInquiryModal.email}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <input
                    type="text"
                    value={convertCategory}
                    onChange={(e) => setConvertCategory(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Agreed Value (INR ₹)</label>
                  <input
                    type="number"
                    value={convertPrice}
                    onChange={(e) => setConvertPrice(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setConvertInquiryModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white font-bold shadow-xs cursor-pointer"
                >
                  Create Project & Bind to Client →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Create Project Direct */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#0A0A0A]">Create Client Project</h3>
              <button
                onClick={() => setShowNewProjectModal(false)}
                className="text-slate-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProjectDirect} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Dental Practice Flagship Portal"
                  value={newProjectData.title}
                  onChange={(e) => setNewProjectData({ ...newProjectData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Client Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. Rajesh Khanna"
                    value={newProjectData.clientName}
                    onChange={(e) => setNewProjectData({ ...newProjectData, clientName: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Client Google Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="client@gmail.com"
                    value={newProjectData.clientEmail}
                    onChange={(e) => setNewProjectData({ ...newProjectData, clientEmail: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={newProjectData.category}
                    onChange={(e) => setNewProjectData({ ...newProjectData, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  >
                    <option value="Dental Practice">Dental Practice</option>
                    <option value="Real Estate">Real Estate</option>
                    <option value="SaaS / CRM">SaaS / CRM</option>
                    <option value="Custom Project">Custom Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Agreed Value (INR ₹)</label>
                  <input
                    type="number"
                    value={newProjectData.price}
                    onChange={(e) => setNewProjectData({ ...newProjectData, price: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Staging Preview URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://preview.vercel.app"
                  value={newProjectData.stagingUrl}
                  onChange={(e) => setNewProjectData({ ...newProjectData, stagingUrl: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white font-bold shadow-xs cursor-pointer"
                >
                  Save Project →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Showcase Template */}
      {showAddTemplateModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#0A0A0A]">Add Dynamic Showcase Template</h3>
              <button
                onClick={() => setShowAddTemplateModal(false)}
                className="text-slate-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddTemplate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Category</label>
                  <select
                    value={newTemplate.category}
                    onChange={(e) => setNewTemplate({ ...newTemplate, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  >
                    <option value="DENTAL">DENTAL</option>
                    <option value="REAL_ESTATE">REAL_ESTATE</option>
                    <option value="SAAS">SAAS</option>
                    <option value="CUSTOM">CUSTOM</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Badge</label>
                  <input
                    type="text"
                    placeholder="e.g. FLAGSHIP / MODERN"
                    value={newTemplate.badge}
                    onChange={(e) => setNewTemplate({ ...newTemplate, badge: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Template Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Aura Dental Atelier"
                  value={newTemplate.title}
                  onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Modern Aesthetics & Implants"
                  value={newTemplate.tagline}
                  onChange={(e) => setNewTemplate({ ...newTemplate, tagline: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate({ ...newTemplate, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Preview Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="/dental/templates/dental-prime-eight.png"
                    value={newTemplate.imageUrl}
                    onChange={(e) => setNewTemplate({ ...newTemplate, imageUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Live Demo URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://example.vercel.app"
                    value={newTemplate.demoUrl}
                    onChange={(e) => setNewTemplate({ ...newTemplate, demoUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTemplateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white font-bold shadow-xs"
                >
                  Publish Template →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Add Staff Member */}
      {showAddStaffModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#0A0A0A]">Create Staff Account</h3>
              <button
                onClick={() => setShowAddStaffModal(false)}
                className="text-slate-400 hover:text-black"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddStaff} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Patel"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Email *</label>
                <input
                  type="email"
                  required
                  placeholder="vikram@kivex.com"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Password *</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Assigned Role</label>
                  <select
                    value={newStaff.role}
                    onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value as any })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                  >
                    <option value="PM">Project Manager (PM)</option>
                    <option value="DEVELOPER">Lead Developer</option>
                    <option value="ACCOUNTS">Accounts / Auditor</option>
                    <option value="SALES">Sales Specialist</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">Branch Code</label>
                  <input
                    type="text"
                    value={newStaff.branchCode}
                    onChange={(e) => setNewStaff({ ...newStaff, branchCode: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-mono"
                  />
                </div>
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddStaffModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:text-black"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white font-bold shadow-xs"
                >
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Edit Showcase Template Link & Info */}
      {editingTemplate && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 text-left shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-bold text-[#0A0A0A]">Edit Showcase Template & Live Link</h3>
              <button
                onClick={() => setEditingTemplate(null)}
                className="text-slate-400 hover:text-black cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEditedTemplate} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-700 font-semibold mb-1">Template Title *</label>
                <input
                  type="text"
                  required
                  value={editingTemplate.title}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A] font-semibold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Live Demo Link (Updates Website Immediately) *</label>
                <input
                  type="url"
                  required
                  value={editingTemplate.demo_url}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, demo_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#2D5FC7] font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Preview Image URL *</label>
                <input
                  type="text"
                  required
                  value={editingTemplate.image_url}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, image_url: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editingTemplate.description || ""}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-[#0A0A0A]"
                />
              </div>

              <div className="mt-5 flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTemplate(null)}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-600 hover:text-black cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white font-bold shadow-xs cursor-pointer"
                >
                  Save & Sync to Website →
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: Approval Notification Dispatch (WhatsApp + Email + Portal Unlock) */}
      {approvalModalInquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white rounded-3xl p-6 sm:p-7 text-left shadow-2xl border border-black/10">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold mb-1.5">
                  ● PORTAL UNLOCKED &amp; APPROVED
                </span>
                <h3 className="text-base sm:text-lg font-extrabold text-[#0A0A0A]">
                  Send Project Approval Message to {approvalModalInquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setApprovalModalInquiry(null)}
                className="text-slate-400 hover:text-black text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FAF7F2] border border-black/[0.08] mb-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Client WhatsApp Number
                </span>
                <span className="font-mono font-bold text-[#0A0A0A]">
                  {approvalModalInquiry.phone}
                </span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-slate-400 block">
                  Client Google Email (Portal ID)
                </span>
                <span className="font-mono font-bold text-[#2D5FC7]">
                  {approvalModalInquiry.email}
                </span>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Approval Notification Message (Editable before sending):
              </label>
              <textarea
                rows={8}
                value={approvalMessageText}
                onChange={(e) => setApprovalMessageText(e.target.value)}
                className="w-full p-3.5 rounded-2xl bg-[#FAF7F2] border border-black/[0.12] text-xs text-[#0A0A0A] font-mono leading-relaxed focus:outline-none focus:border-[#2D5FC7]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => {
                  const cleanPhone = approvalModalInquiry.phone.replace(/[^0-9]/g, "");
                  const formattedPhone =
                    cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
                  const waUrl = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(
                    approvalMessageText
                  )}`;
                  window.open(waUrl, "_blank");
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Send Approval on WhatsApp 💬</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const subject = encodeURIComponent(
                    "KIVEX TECHNOLOGY — Your Project Inquiry is Approved!"
                  );
                  const body = encodeURIComponent(
                    approvalMessageText.replace(/\*/g, "")
                  );
                  window.open(
                    `mailto:${approvalModalInquiry.email}?subject=${subject}&body=${body}`,
                    "_blank"
                  );
                }}
                className="w-full py-3 px-4 rounded-xl bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <span>Send Approval via Email ✉️</span>
              </button>
            </div>

            <div className="mt-3 flex items-center justify-between pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(approvalMessageText);
                  alert("Approval message & Client Portal link copied to clipboard!");
                }}
                className="text-xs font-semibold text-[#2D5FC7] hover:underline cursor-pointer"
              >
                📋 Copy Message Text
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const inq = approvalModalInquiry;
                    setApprovalModalInquiry(null);
                    setConvertInquiryModal(inq);
                    setConvertTitle(`Custom Platform: ${inq.name}`);
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FAF7F2] hover:bg-slate-200 border border-black/10 text-xs font-bold text-[#0A0A0A] cursor-pointer"
                >
                  + Convert to Project Now
                </button>
                <button
                  type="button"
                  onClick={() => setApprovalModalInquiry(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Change Account Password */}
      {showChangePasswordModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-3xl p-6 sm:p-7 text-left shadow-2xl border border-black/10">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#2D5FC7]/10 flex items-center justify-center text-base">
                  🔑
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-[#0A0A0A]">
                    Change Account Password
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    {pwdTargetEmail ? `Updating password for ${pwdTargetEmail}` : "Set a new secure password for this account"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowChangePasswordModal(false);
                  setPwdTargetEmail("");
                  setPwdMsg(null);
                }}
                className="text-slate-400 hover:text-black text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {pwdMsg && (
              <div
                className={cn(
                  "p-3 rounded-xl text-xs font-semibold mb-4",
                  pwdMsg.type === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                )}
              >
                {pwdMsg.type === "success" ? "✓" : "⚠️"} {pwdMsg.text}
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3.5 text-xs">
              {!pwdTargetEmail && (
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    Current Password *
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter current password"
                    value={pwdCurrent}
                    onChange={(e) => setPwdCurrent(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2D5FC7] focus:bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  New Password * (min 6 characters)
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter new strong password"
                  value={pwdNew}
                  onChange={(e) => setPwdNew(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2D5FC7] focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Confirm New Password *
                </label>
                <input
                  type="password"
                  required
                  placeholder="Re-type new password"
                  value={pwdConfirm}
                  onChange={(e) => setPwdConfirm(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAF7F2] border border-black/[0.12] text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2D5FC7] focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setShowChangePasswordModal(false);
                    setPwdTargetEmail("");
                    setPwdMsg(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 hover:text-black font-semibold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={pwdLoading}
                  className="px-5 py-2 rounded-xl bg-[#2D5FC7] hover:bg-[#1E3D8A] text-white font-bold transition-all shadow-sm cursor-pointer disabled:opacity-50"
                >
                  {pwdLoading ? "Updating..." : "Update Password →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
