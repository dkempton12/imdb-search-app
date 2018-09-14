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
    movies.forEach(movie = (index) => {
      output += `
        <div class="col-md-3">
          <div class="well text-center">
            <img src="${movie.Poster}"/>
            <h5>${movie.Title}</h5>
            <a onClick="movieSelected('${movie.imdbID}')"></a> 
          </div>
        </div>
      `
    })
  } )
  .catch((err) => {
    console.log(err);
  });
}
