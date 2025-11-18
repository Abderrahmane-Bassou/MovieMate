const API = 'http://localhost:4000/api';

function token() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const t = token();
  return t ? { Authorization: 'Bearer ' + t } : {};
}

function getUserData() {
  const userData = localStorage.getItem('userData');
  return userData ? JSON.parse(userData) : null;
}

// Helper function to escape HTML and prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return String(text).replace(/[&<>"']/g, m => map[m]);
}

function showAuthView() {
  $('#authView').removeClass('hidden');
  $('#moviesView').addClass('hidden');
}

function showMoviesView() {
  $('#authView').addClass('hidden');
  $('#moviesView').removeClass('hidden');
  loadMovies();
}

function loadMovies() {
  $.get(`${API}/movies`)
    .done(function (data) {
      const list = $('#movieList');
      list.empty();

      if (data.length === 0) {
        list.append('<p class="error-message">No movies available.</p>');
        return;
      }

      data.forEach(m => {
        const title = escapeHtml(m.title);
        const genre = escapeHtml(m.genre_name || '');
        const year = escapeHtml(m.release_year || '');
        const rating = m.avg_rating ? Number(m.avg_rating).toFixed(1) : '-';

        list.append(`
          <div class="movie-card">
            <h3>${title}</h3>
            <p>${genre} | ${year}</p>
            <p>⭐ ${rating}</p>
            <button onclick="window.location.href='movie.html?id=${m.movie_id}'">View Details</button>
          </div>
        `);
      });
    })
    .fail(function (xhr) {
      console.error('Failed to load movies:', xhr);
      $('#movieList').html('<p class="error-message">Failed to load movies. Please try again later.</p>');
    });
}

$(document).ready(function () {
  // Check authentication state on page load
  if (token()) {
    showMoviesView();
  } else {
    showAuthView();
  }

  // Login Form Handler
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    const email = $('#loginEmail').val();
    const password = $('#loginPassword').val();

    $.ajax({
      url: `${API}/auth/login`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ email, password }),
      success: function (res) {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userData', JSON.stringify(res.user));
        $('#loginMessage').text('Login successful!').css('color', '#4caf50');

        // Reload page to show movies view
        setTimeout(() => {
          window.location.reload();
        }, 500);
      },
      error: function (xhr) {
        $('#loginMessage').text(xhr.responseJSON?.message || 'Login failed').css('color', '#e94560');
      }
    });
  });

  // Register Form Handler
  $('#registerForm').on('submit', function (e) {
    e.preventDefault();
    const username = $('#registerUsername').val();
    const email = $('#registerEmail').val();
    const password = $('#registerPassword').val();

    $.ajax({
      url: `${API}/auth/register`,
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ username, email, password }),
      success: function (res) {
        $('#registerMessage').text('Registration successful! Please login.').css('color', '#4caf50');
        $('#registerForm')[0].reset();
      },
      error: function (xhr) {
        $('#registerMessage').text(xhr.responseJSON?.message || 'Registration failed').css('color', '#e94560');
      }
    });
  });

  // Search Movie Handler
  $('#searchMovie').on('keyup', function () {
    const val = $(this).val().toLowerCase();
    $('.movie-card').each(function () {
      $(this).toggle($(this).text().toLowerCase().includes(val));
    });
  });
});
