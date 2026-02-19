// ===== USER DATA =====
let users = JSON.parse(localStorage.getItem('users')) || [
    {
        id: 1,
        name: "Admin User",
        email: "admin@tutor.com",
        password: "admin123",
        type: "admin"
    },
    {
        id: 2,
        name: "Test Student",
        email: "student@test.com",
        password: "student123",
        type: "student"
    }
];

let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// ===== MODAL FUNCTIONS =====
function showModal(modalId) {
    closeAllModals();
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

function closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => modal.style.display = 'none');
    document.body.style.overflow = 'auto';
}

function switchModal(modalId) {
    closeAllModals();
    showModal(modalId);
}

// ===== LOGIN FUNCTION =====
function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showToast(`Welcome back, ${user.name}!`, 'success');
        closeModal('loginModal');
        updateAuthUI();
        
        // Reset form
        document.getElementById('loginForm').reset();
    } else {
        showToast('Invalid email or password', 'error');
    }
}

// ===== REGISTER FUNCTION =====
function register() {
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const type = document.getElementById('regType').value;
    
    if (!name || !email || !password || !type) {
        showToast('Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showToast('Password must be at least 6 characters', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showToast('Email already exists', 'error');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        type: type
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    showToast('Registration successful! Please login.', 'success');
    closeModal('registerModal');
    showModal('loginModal');
    
    // Reset form
    document.getElementById('registerForm').reset();
}

// ===== LOGOUT FUNCTION =====
function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    showToast('Logged out successfully', 'success');
    updateAuthUI();
    closeAllModals();
}

// ===== UPDATE AUTH UI =====
function updateAuthUI() {
    const authButtons = document.getElementById('authButtons');
    
    if (currentUser) {
        authButtons.innerHTML = `
            <span class="user-welcome">
                <i class="fas fa-user-circle" style="color: var(--gold);"></i>
                ${currentUser.name}
            </span>
            <button class="btn-outline-gold" onclick="logout()">Logout</button>
        `;
    } else {
        authButtons.innerHTML = `
            <button class="btn-gold" onclick="showModal('loginModal')">Login</button>
            <button class="btn-outline-gold" onclick="showModal('registerModal')">Register</button>
        `;
    }
}

// ===== CHECK IF USER IS LOGGED IN =====
function requireAuth() {
    if (!currentUser) {
        showToast('Please login to continue', 'error');
        showModal('loginModal');
        return false;
    }
    return true;
}

// ===== CLOSE MODALS WHEN CLICKING OUTSIDE =====
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeAllModals();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
});