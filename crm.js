// --- CRM Dashboard Logic ---

// The URL where your Render backend will be hosted.
// For local testing, it defaults to localhost:3000
const API_BASE_URL = 'http://localhost:3000/api'; // CHANGE THIS TO YOUR RENDER URL LATER (e.g., https://kivex-backend.onrender.com/api)

const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const passwordInput = document.getElementById('adminPassword');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');
const refreshBtn = document.getElementById('refreshBtn');

const leadsBody = document.getElementById('leadsBody');
const loadingLeads = document.getElementById('loadingLeads');
const noLeads = document.getElementById('noLeads');
const totalLeadsCount = document.getElementById('totalLeadsCount');
const backendStatus = document.getElementById('backendStatus');

let currentPassword = '';

// Check if already logged in via sessionStorage
if (sessionStorage.getItem('kivexAdminAuth')) {
    currentPassword = sessionStorage.getItem('kivexAdminAuth');
    showDashboard();
}

// Check backend status
async function checkBackend() {
    try {
        const res = await fetch(`${API_BASE_URL}/health`);
        if (res.ok) {
            backendStatus.textContent = 'Backend Online';
            backendStatus.className = 'status-badge online';
        } else {
            throw new Error('Not OK');
        }
    } catch (err) {
        backendStatus.textContent = 'Backend Offline';
        backendStatus.className = 'status-badge offline';
        console.error("Backend health check failed:", err);
    }
}

// Login
loginBtn.addEventListener('click', async () => {
    const pwd = passwordInput.value;
    if (!pwd) return;

    loginBtn.textContent = 'Checking...';
    loginError.classList.add('hidden');

    try {
        // Try fetching leads to verify password
        const res = await fetch(`${API_BASE_URL}/leads`, {
            headers: { 'x-admin-password': pwd }
        });

        if (res.ok) {
            currentPassword = pwd;
            sessionStorage.setItem('kivexAdminAuth', pwd);
            showDashboard();
            
            const data = await res.json();
            renderLeads(data.leads);
        } else {
            loginError.classList.remove('hidden');
        }
    } catch (err) {
        loginError.textContent = "Could not connect to backend.";
        loginError.classList.remove('hidden');
        console.error(err);
    } finally {
        loginBtn.textContent = 'Login';
    }
});

// Show Dashboard UI
function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
    checkBackend();
    fetchLeads();
}

// Fetch Leads
async function fetchLeads() {
    loadingLeads.classList.remove('hidden');
    leadsBody.innerHTML = '';
    noLeads.classList.add('hidden');

    try {
        const res = await fetch(`${API_BASE_URL}/leads`, {
            headers: { 'x-admin-password': currentPassword }
        });

        if (res.status === 401) {
            logout(); // Password changed or invalid
            return;
        }

        const data = await res.json();
        renderLeads(data.leads);
    } catch (err) {
        console.error("Error fetching leads:", err);
        loadingLeads.textContent = "Failed to load leads.";
    }
}

// Render leads into table
function renderLeads(leads) {
    loadingLeads.classList.add('hidden');
    
    if (!leads || leads.length === 0) {
        noLeads.classList.remove('hidden');
        totalLeadsCount.textContent = "0";
        return;
    }

    totalLeadsCount.textContent = leads.length;

    leads.forEach(lead => {
        const tr = document.createElement('tr');
        
        // Format Date
        const dateObj = new Date(lead.created_at);
        const dateStr = dateObj.toLocaleDateString() + ' ' + dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        tr.innerHTML = `
            <td>${dateStr}</td>
            <td style="font-weight: 600;">${escapeHtml(lead.name)}</td>
            <td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td>
            <td>${escapeHtml(lead.project || '-')}</td>
            <td style="max-width: 300px; white-space: pre-wrap;">${escapeHtml(lead.message || '-')}</td>
        `;
        leadsBody.appendChild(tr);
    });
}

// Logout
function logout() {
    currentPassword = '';
    sessionStorage.removeItem('kivexAdminAuth');
    passwordInput.value = '';
    dashboardScreen.classList.add('hidden');
    loginScreen.classList.remove('hidden');
}

logoutBtn.addEventListener('click', logout);
refreshBtn.addEventListener('click', fetchLeads);

// Utility to prevent XSS
function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}
