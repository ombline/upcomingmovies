//FETCH DATA FROM API//

function getMoviesInfo() {
  return $.ajax({
    url:
      "https://api.themoviedb.org/3/movie/upcoming?api_key=163032d6acd155006ea3af7678639181",
    method: "GET",
    success: function(response) {
      console.log(response.results);
    },
    error: function(err) {
      console.log(err);
    }
  });
}

//DISPLAY DATA//

getMoviesInfo()
  .then(response => {
    for (var i = 0; i < response.results.length; i++) {
      $(".slide").append(`
        <div class="movieInfo">
          <img src="https://image.tmdb.org/t/p/w342${response.results[i]
            .poster_path}">
          <div class="movieDescription">
            <h2>${response.results[i].title}
            </h2>
            <p>${response.results[i].overview}</p>
          </div>
        </div>
        `);
      $(".dots-container").append(`
          <span class="dots" onclick="currentDiv(${[i + 1]})"></span>
          `);
    }
  })
  .then(response => {
    showDivs();
  });

//SHOW ONE HIDE OTHERS//

var slideIndex = 1;
showDivs(slideIndex);

function showDivs(n) {
  var i;
  var x = document.getElementsByClassName("movieInfo");
  var dots = document.getElementsByClassName("dots");
  if (n > x.length) {
    slideIndex = 1; //start from beginning when over
  }
  if (n < 1) {
    slideIndex = x.length;
  }
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
    x[slideIndex - 1].style.display = "flex";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  dots[slideIndex - 1].className += " active";
}

function plusDivs(n) {
  showDivs((slideIndex += n));
}

function currentDiv(n) {
  console.log("n");
  showDivs((slideIndex = n));
}
