// Shared navigation functionality for all pages

function token() {
  return localStorage.getItem('token');
}

function getUserData() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

function updateNavigation() {
  const navLinks = $('#navLinks');
  if (!navLinks.length) return; // Exit if no nav element found

  navLinks.empty();

  if (token()) {
    const user = getUserData();
    const isAdmin = user && user.user_role === 'ADMIN';

    navLinks.append('<li><a href="index.html">Home</a></li>');
    navLinks.append('<li><a href="profile.html">Profile</a></li>');
    if (isAdmin) {
      navLinks.append('<li><a href="admin.html">Admin</a></li>');
    }
    navLinks.append('<li><a href="#" id="logoutBtn">Logout</a></li>');

    // Add logout handler
    $(document).off('click', '#logoutBtn').on('click', '#logoutBtn', function (e) {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = 'index.html';
    });
  }
}

// Initialize navigation when DOM is ready
$(document).ready(function() {
  updateNavigation();
});
