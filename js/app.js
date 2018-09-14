$(document).ready(() => {
  // submit event
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  })
})

function getMovies(searchText) {
  console.log(searchText);
}
