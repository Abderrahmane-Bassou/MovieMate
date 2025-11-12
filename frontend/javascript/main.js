const API = 'http://localhost:4000/api';

function token() {
  return localStorage.getItem('token');
}

function authHeaders() {
  const t = token();
  return t ? { Authorization: 'Bearer ' + t } : {};
}

$(document).ready(function () {
  if ($('#movieList').length) {
    $.get(`${API}/movies`, function (data) {
      const list = $('#movieList');
      list.empty();
      data.forEach(m => {
        list.append(`
          <div class="movie-card">
            <h3>${m.title}</h3>
            <p>${m.genre_name || ''} | ${m.release_year || ''}</p>
            <p>⭐ ${m.avg_rating ? Number(m.avg_rating).toFixed(1) : '-'}</p>
            <button onclick="window.location.href='movie.html?id=${m.movie_id}'">View Details</button>
          </div>
        `);
      });
    });
  }

  $('#searchMovie').on('keyup', function () {
    const val = $(this).val().toLowerCase();
    $('.movie-card').each(function () {
      $(this).toggle($(this).text().toLowerCase().includes(val));
    });
  });

  $('#logoutBtn').on('click', function () {
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  });
});
