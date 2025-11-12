const API = 'http://localhost:4000/api';
function token() { return localStorage.getItem('token'); }
function authHeaders() { const t = token(); return t ? { Authorization: 'Bearer ' + t } : {}; }

$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 1; // default to 1 for demo

  // load movie
  $.get(`${API}/movies/${id}`, function (m) {
    $('#movieTitle').text(m.title);
    $('#movieGenre').text(`${m.genre_name || ''} | ${m.release_year || ''}`);
    $('#movieDesc').text(m.description || '');
    $('#movieAvg').text(m.avg_rating ? Number(m.avg_rating).toFixed(1) : '-');
  });

  // load reviews
  function loadReviews() {
    $.get(`${API}/reviews/movie/${id}`, function (reviews) {
      const rl = $('#reviewList'); rl.empty();
      reviews.forEach(r => {
        rl.append(`<div><strong>${r.username}</strong> <small>${r.created_at}</small><p>${r.review_text}</p></div><hr/>`);
      });
    });
  }
  loadReviews();

  $('#submitReview').on('click', function () {
    if (!token()) { alert('Login to add review'); return; }
    const text = $('#reviewText').val();
    $.ajax({
      url: `${API}/reviews/movie/${id}`,
      method: 'POST',
      headers: authHeaders(),
      contentType: 'application/json',
      data: JSON.stringify({ review_text: text }),
      success: function () { $('#reviewText').val(''); loadReviews(); },
      error: function (xhr) { alert(xhr.responseJSON?.message || 'Error'); }
    });
  });

  $('#submitRating').on('click', function () {
    if (!token()) { alert('Login to rate'); return; }
    const value = $('#ratingSelect').val();
    $.ajax({
      url: `${API}/ratings/movie/${id}`,
      method: 'POST',
      headers: authHeaders(),
      contentType: 'application/json',
      data: JSON.stringify({ rating_value: value }),
      success: function () { alert('Rated'); },
      error: function (xhr) { alert(xhr.responseJSON?.message || 'Error'); }
    });
  });
});
