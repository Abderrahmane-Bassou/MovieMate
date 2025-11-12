$(document).ready(function () {
const movies = [
{ title: 'Inception', year: 2010, genre: 'Sci-Fi', rating: 5 },
{ title: 'The Dark Knight', year: 2008, genre: 'Action', rating: 5 },
{ title: 'Forrest Gump', year: 1994, genre: 'Drama', rating: 4 },
{ title: 'The Conjuring', year: 2013, genre: 'Horror', rating: 4 },
{ title: 'The Hangover', year: 2009, genre: 'Comedy', rating: 3 }
];


function renderMovies(filter = '') {
const list = $('#movieList');
list.empty();
const filtered = movies.filter(m => m.title.toLowerCase().includes(filter.toLowerCase()));
filtered.forEach(movie => {
list.append(`
<div class='movie-card'>
<h3>${movie.title}</h3>
<p>${movie.genre} | ${movie.year}</p>
<p>⭐ ${movie.rating}</p>
<button onclick=\"window.location.href='movie.html'\">View Details</button>
</div>
`);
});
}


$('#searchMovie').on('keyup', function () {
renderMovies($(this).val());
});


renderMovies();
});