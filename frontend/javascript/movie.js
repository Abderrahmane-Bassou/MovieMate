const API = 'http://localhost:4000/api';
function token() { return localStorage.getItem('token'); }
function authHeaders() { const t = token(); return t ? { Authorization: 'Bearer ' + t } : {}; }

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

$(document).ready(function () {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id') || 1; // default to 1 for demo

  // load movie
  $.get(`${API}/movies/${id}`)
    .done(function (m) {
      $('#movieTitle').text(m.title);
      $('#movieGenre').text(`${m.genre_name || ''} | ${m.release_year || ''}`);
      $('#movieDesc').text(m.description || '');
      $('#movieAvg').text(m.avg_rating ? Number(m.avg_rating).toFixed(1) : '-');
    })
    .fail(function (xhr) {
      console.error('Failed to load movie:', xhr);
      $('.movie-info').html('<p class="error-message">Failed to load movie details.</p>');
    });

  // load reviews
  function loadReviews() {
    $.get(`${API}/reviews/movie/${id}`)
      .done(function (reviews) {
        const rl = $('#reviewList');
        rl.empty();
        if (reviews.length === 0) {
          rl.append('<p>No reviews yet. Be the first to review!</p>');
          return;
        }
        reviews.forEach(r => {
          const username = escapeHtml(r.username);
          const reviewText = escapeHtml(r.review_text);
          const date = escapeHtml(r.created_at);
          rl.append(`<div class="review-item"><strong>${username}</strong> <small>${date}</small><p>${reviewText}</p></div>`);
        });
      })
      .fail(function (xhr) {
        console.error('Failed to load reviews:', xhr);
        $('#reviewList').html('<p class="error-message">Failed to load reviews.</p>');
      });
  }
  loadReviews();

  $('#submitReview').on('click', function () {
    if (!token()) {
      alert('Please login to add a review');
      window.location.href = 'login.html';
      return;
    }
    const text = $('#reviewText').val().trim();
    if (!text) {
      alert('Please enter a review');
      return;
    }
    $.ajax({
      url: `${API}/reviews/movie/${id}`,
      method: 'POST',
      headers: authHeaders(),
      contentType: 'application/json',
      data: JSON.stringify({ review_text: text }),
      success: function () {
        $('#reviewText').val('');
        loadReviews();
        alert('Review submitted successfully!');
      },
      error: function (xhr) {
        alert(xhr.responseJSON?.message || 'Failed to submit review');
      }
    });
  });

  $('#submitRating').on('click', function () {
    if (!token()) {
      alert('Please login to rate this movie');
      window.location.href = 'login.html';
      return;
    }
    const value = $('#ratingSelect').val();
    $.ajax({
      url: `${API}/ratings/movie/${id}`,
      method: 'POST',
      headers: authHeaders(),
      contentType: 'application/json',
      data: JSON.stringify({ rating_value: value }),
      success: function () {
        alert('Rating submitted successfully!');
        location.reload(); // Reload to show updated average rating
      },
      error: function (xhr) {
        alert(xhr.responseJSON?.message || 'Failed to submit rating');
      }
    });
  });
});
