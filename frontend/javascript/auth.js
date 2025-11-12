const API = 'http://localhost:4000/api';

$(document).ready(function () {
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#email').val();
    const password = $('#password').val();
    $.ajax({
      url: `${API}/auth/login`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function (res) {
        localStorage.setItem('token', res.token);
        window.location.href = 'index.html';
      },
      error: function (xhr) {
        $('#loginMessage').text(xhr.responseJSON?.message || 'Login failed');
      }
    });
  });

  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    const username = $('#username').val();
    const email = $('#email').val();
    const password = $('#password').val();
    $.ajax({
      url: `${API}/auth/register`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, email, password }),
      success: function (res) {
        $('#registerMessage').text('Registered. Please log in.');
      },
      error: function (xhr) {
        $('#registerMessage').text(xhr.responseJSON?.message || 'Register failed');
      }
    });
  });
});
