const API = 'http://localhost:4000/api';
function token() { return localStorage.getItem('token'); }
function authHeaders() { const t = token(); return t ? { Authorization: 'Bearer ' + t } : {}; }

$(document).ready(function () {
  $('#addMovieBtn').on('click', function () { $('#addMovieForm').toggle(); });

  function loadMovies() {
    $.get(`${API}/movies`, function (movies) {
      const list = $('#adminMovieList'); list.empty();
      movies.forEach(m => {
        list.append(`<div>${m.title} (${m.release_year}) <button data-id="${m.movie_id}" class="delMovie">Delete</button></div>`);
      });
      $('.delMovie').on('click', function () {
        const id = $(this).data('id');
        $.ajax({
          url: `${API}/movies/${id}`,
          method: 'DELETE',
          headers: authHeaders(),
          success: function () { loadMovies(); },
          error: function (xhr) { alert(xhr.responseJSON?.message || 'Error'); }
        });
      });
    });
  }

  function loadUsers() {
    $.ajax({
      url: `${API}/admin/users`,
      method: 'GET',
      headers: authHeaders(),
      success: function (users) {
        const list = $('#adminUserList'); list.empty();
        users.forEach(u => {
          list.append(`<div>${u.username} (${u.email}) <button data-id="${u.user_id}" class="delUser">Delete</button></div>`);
        });
        $('.delUser').on('click', function () {
          const id = $(this).data('id');
          $.ajax({
            url: `${API}/admin/users/${id}`,
            method: 'DELETE',
            headers: authHeaders(),
            success: function () { loadUsers(); },
            error: function (xhr) { alert(xhr.responseJSON?.message || 'Error'); }
          });
        });
      }
    });
  }

  $('#saveMovie').on('click', function () {
    const payload = {
      title: $('#mTitle').val(),
      description: $('#mDesc').val(),
      release_year: $('#mYear').val(),
      genre_id: $('#mGenre').val()
    };
    $.ajax({
      url: `${API}/movies`,
      method: 'POST',
      headers: authHeaders(),
      contentType: 'application/json',
      data: JSON.stringify(payload),
      success: function () { loadMovies(); $('#addMovieForm').hide(); },
      error: function (xhr) { alert(xhr.responseJSON?.message || 'Error'); }
    });
  });

  loadMovies();
  loadUsers();
});
