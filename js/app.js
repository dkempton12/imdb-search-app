$(document).ready(() => {
  // submit event
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  })
})

function getMovies(searchText) {
  // Making request to the API using Axios
  axios.get('http://www.omdbapi.com?s='+searchText+'&apikey=thewdb') // concatenating searchText to return it
  .then((response) => {
    console.log(response);
    let movies = response.data.Search; // this puts the movies searched array into this variable
    let output = '';
    $.each(movies, (index, movie) => {
      output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="${movie.Poster}"/>
            <h5>${movie.Title}</h5>
            <a onClick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
          </div>
        </div>
      `
    });
    $('#movies').html(output);
  } )
  .catch((err) => {
    console.log(err);
  });
}

//sessionStorage
function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  // move over to movie.html
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');

  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=thewdb') // concatenating searchText to return it
  .then((response) => {
    console.log(response);
    let movie = response.data;
    // this is just one object of data, not an array, so we don't need to loop through
    let output = `
    <div class="row">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail"/>
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Released}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Rated}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Writer}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Actors}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" class="btn btn-default">Go Back to Search</a>
      </div>
    </div>
    `;
    $('#movie').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}
