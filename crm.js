const API_BASE_URL = 'http://localhost:3000/api'; 

// Login UI
const loginScreen = document.getElementById('loginScreen');
const dashboardScreen = document.getElementById('dashboardScreen');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');

// Dashboard UI
const logoutBtn = document.getElementById('logoutBtn');
const backendStatus = document.getElementById('backendStatus');
const currentUserDisplay = document.getElementById('currentUserDisplay');

// Tabs & Views
const adminNav = document.getElementById('adminNav');
const tabLeads = document.getElementById('tabLeads');
const tabUsers = document.getElementById('tabUsers');
const viewLeads = document.getElementById('viewLeads');
const viewUsers = document.getElementById('viewUsers');

// Leads UI
const leadsBody = document.getElementById('leadsBody');
const loadingLeads = document.getElementById('loadingLeads');
const noLeads = document.getElementById('noLeads');
const totalLeadsCount = document.getElementById('totalLeadsCount');
const refreshBtn = document.getElementById('refreshBtn');

// Users UI
const usersBody = document.getElementById('usersBody');
const showAddUserBtn = document.getElementById('showAddUserBtn');

// Modals
const userModal = document.getElementById('userModal');
const cancelUserBtn = document.getElementById('cancelUserBtn');
const saveUserBtn = document.getElementById('saveUserBtn');
const newUsername = document.getElementById('newUsername');
const newPassword = document.getElementById('newPassword');
const newRole = document.getElementById('newRole');

const passwordModal = document.getElementById('passwordModal');
const cancelPwBtn = document.getElementById('cancelPwBtn');
const savePwBtn = document.getElementById('savePwBtn');
const pwTargetUser = document.getElementById('pwTargetUser');
const changePasswordInput = document.getElementById('changePasswordInput');

let currentToken = '';
let currentRole = '';
let currentUserIdForPw = null;

// Initialization
if (sessionStorage.getItem('kivexToken')) {
    currentToken = sessionStorage.getItem('kivexToken');
    currentRole = sessionStorage.getItem('kivexRole');
    const uName = sessionStorage.getItem('kivexUsername');
    showDashboard(uName, currentRole);
}

// Health Check
async function checkBackend() {
    try {
        const res = await fetch(`${API_BASE_URL}/health`);
        if (res.ok) {
            backendStatus.textContent = 'Backend Online';
            backendStatus.className = 'status-badge online';
        } else throw new Error();
    } catch {
        backendStatus.textContent = 'Backend Offline';
        backendStatus.className = 'status-badge offline';
    }
}

function getHeaders() {
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentToken}`
    };
}

// Login
loginBtn.addEventListener('click', async () => {
    const username = usernameInput.value.trim();
    const password = passwordInput.value;
    if (!username || !password) return;

    loginBtn.textContent = 'Checking...';
    loginError.classList.add('hidden');

    try {
        const res = await fetch(`${API_BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (res.ok) {
            const data = await res.json();
            currentToken = data.token;
            currentRole = data.role;
            
            sessionStorage.setItem('kivexToken', currentToken);
            sessionStorage.setItem('kivexRole', currentRole);
            sessionStorage.setItem('kivexUsername', data.username);
            
            showDashboard(data.username, currentRole);
        } else {
            loginError.classList.remove('hidden');
        }
    } catch (err) {
        loginError.textContent = "Cannot connect to server.";
        loginError.classList.remove('hidden');
    } finally {
        loginBtn.textContent = 'Login';
    }
});

function showDashboard(username, role) {
    loginScreen.classList.add('hidden');
    dashboardScreen.classList.remove('hidden');
    currentUserDisplay.textContent = `Logged in as: ${username}`;
    
    if (role === 'admin') {
        adminNav.classList.remove('hidden');
    }
    
    checkBackend();
    fetchLeads();
}

function logout() {
    sessionStorage.clear();
    location.reload();
}
logoutBtn.addEventListener('click', logout);

// Navigation
tabLeads.addEventListener('click', () => {
    tabLeads.classList.add('active');
    tabUsers.classList.remove('active');
    viewLeads.classList.remove('hidden');
    viewUsers.classList.add('hidden');
    fetchLeads();
});

tabUsers.addEventListener('click', () => {
    tabUsers.classList.add('active');
    tabLeads.classList.remove('active');
    viewUsers.classList.remove('hidden');
    viewLeads.classList.add('hidden');
    fetchUsers();
});

// Fetch Leads
async function fetchLeads() {
    loadingLeads.classList.remove('hidden');
    leadsBody.innerHTML = '';
    noLeads.classList.add('hidden');

    try {
        const res = await fetch(`${API_BASE_URL}/leads`, { headers: getHeaders() });
        if (res.status === 401 || res.status === 403) return logout();
        
        const data = await res.json();
        renderLeads(data.leads);
    } catch (err) {
        loadingLeads.textContent = "Failed to load leads.";
    }
}
refreshBtn.addEventListener('click', fetchLeads);

function renderLeads(leads) {
    loadingLeads.classList.add('hidden');
    if (!leads || !leads.length) {
        noLeads.classList.remove('hidden');
        totalLeadsCount.textContent = "0";
        return;
    }
    totalLeadsCount.textContent = leads.length;

    leads.forEach(lead => {
        const d = new Date(lead.created_at);
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${d.toLocaleDateString()} ${d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'})}</td>
            <td style="font-weight: 600;">${escapeHtml(lead.name)}</td>
            <td><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td>
            <td>${escapeHtml(lead.project || '-')}</td>
            <td style="max-width: 300px; white-space: pre-wrap;">${escapeHtml(lead.message || '-')}</td>
        `;
        leadsBody.appendChild(tr);
    });
}

// Fetch Users (Admin)
async function fetchUsers() {
    try {
        const res = await fetch(`${API_BASE_URL}/users`, { headers: getHeaders() });
        if (res.status === 401 || res.status === 403) return logout();
        
        const data = await res.json();
        usersBody.innerHTML = '';
        data.users.forEach(u => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${escapeHtml(u.username)}</td>
                <td><span class="tag">${u.role.toUpperCase()}</span></td>
                <td>${new Date(u.created_at).toLocaleDateString()}</td>
                <td>
                    <button class="btn-small" onclick="openChangePwModal(${u.id}, '${escapeHtml(u.username)}')">Change Password</button>
                </td>
            `;
            usersBody.appendChild(tr);
        });
    } catch (err) {
        console.error(err);
    }
}

// User Management Modals
showAddUserBtn.addEventListener('click', () => {
    newUsername.value = '';
    newPassword.value = '';
    userModal.classList.remove('hidden');
});
cancelUserBtn.addEventListener('click', () => userModal.classList.add('hidden'));

saveUserBtn.addEventListener('click', async () => {
    const un = newUsername.value.trim();
    const pw = newPassword.value;
    const rl = newRole.value;
    if(!un || !pw) return alert("Username and Password required");

    saveUserBtn.textContent = 'Saving...';
    try {
        const res = await fetch(`${API_BASE_URL}/users`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ username: un, password: pw, role: rl })
        });
        if (res.ok) {
            userModal.classList.add('hidden');
            fetchUsers();
        } else {
            const data = await res.json();
            alert(data.error || "Failed to add user");
        }
    } finally {
        saveUserBtn.textContent = 'Save';
    }
});

// Change Password Modal
window.openChangePwModal = function(id, username) {
    currentUserIdForPw = id;
    pwTargetUser.textContent = `Target User: ${username}`;
    changePasswordInput.value = '';
    passwordModal.classList.remove('hidden');
}

cancelPwBtn.addEventListener('click', () => passwordModal.classList.add('hidden'));

savePwBtn.addEventListener('click', async () => {
    const newPw = changePasswordInput.value;
    if(!newPw) return alert("Please enter a new password");

    savePwBtn.textContent = 'Updating...';
    try {
        const res = await fetch(`${API_BASE_URL}/users/${currentUserIdForPw}/password`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify({ newPassword: newPw })
        });
        if (res.ok) {
            alert("Password updated successfully!");
            passwordModal.classList.add('hidden');
        } else {
            alert("Failed to update password.");
        }
    } finally {
        savePwBtn.textContent = 'Update';
    }
});

function escapeHtml(unsafe) {
    if (!unsafe) return '';
    return unsafe.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}
