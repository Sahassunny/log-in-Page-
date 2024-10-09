// script.js
// alert("Hi there" );

// Sample Users
const users = [
    { email: "user1@example.com", password: "password1" },
    { email: "user2@example.com", password: "password2" },
    { email: "user3@example.com", password: "password3" }
];

// Initialize Users in localStorage
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Wait for the Document to Load
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', handleLogout);
    }

    const userEmailSpan = document.getElementById('userEmail');
    if (userEmailSpan) {
        displayWelcomeMessage();
    }

    // Password Visibility Toggle
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('password');

    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('change', function() {
            if (this.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }
});

// Handle Login Form Submission
function handleLogin(event) {
    event.preventDefault(); // Prevent form from submitting normally

    // Get Input Values
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const errorMsg = document.getElementById('error');

    // Retrieve Users from localStorage
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    // Check if User Exists
    const user = storedUsers.find(user => user.email === email && user.password === password);

    if (user) {
        // Store Current User in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        // Redirect to Welcome Page
        window.location.href = 'Hi.html';
    } else {
        // Display Error Message
        errorMsg.textContent = 'Invalid email or password.';
    }
}

// Display Welcome Message on Welcome Page
function displayWelcomeMessage() {
    const user = getCurrentUser();
    if (user) {
        document.getElementById('userEmail').textContent = user.email;
    } else {
        // If no user is logged in, redirect to login page
        window.location.href = 'index.html';
    }
}

// Get Current User from localStorage
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser'));
}

// Handle Logout
function handleLogout(event) {
    event.preventDefault(); // Prevent default link behavior
    // Remove Current User from localStorage
    localStorage.removeItem('currentUser');
    // Redirect to Login Page
    window.location.href = 'index.html';
}
