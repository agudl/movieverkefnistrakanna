let movies = document.getElementById('main-content')

function getGenreName(id) {
    return genres.filter(function(item) { return item.id == id; })[0].name
}

function getDirectorName(item) {
    return moviecrew.filter(function(item) { return item.id == id; })[0].job;
}

class MovieDB {
    constructor(api_key, base_uri) {
        this.api_key = "3c2e3323fb6685239c36ee9312c7bcb0",
        this.base_uri = "http://api.themoviedb.org/3/",
        this.images_uri = "http://image.tmdb.org/t/p/"
    }
};

class Genre extends MovieDB {
    constructor(api_key, base_uri) {
        super(api_key, base_uri)
    }
    getById(id) {
        let v = new XMLHttpRequest();
        v.open("GET", this.base_uri + "genre/" +id+ "/movies?api_key=" +this.api_key, true);
        v.onload = function (e) {
          if (v.readyState != 4 || v.status != 200) return;
          let response = JSON.parse(v.responseText);

          let PopularSection = document.createElement("section");
             document.body.appendChild(PopularSection);

             let heading = document.createElement("h1");
             heading.className += "genreHeading";
             heading.innerHTML = getGenreName(id);
             PopularSection.appendChild(heading);

            let ActionDiv = document.createElement("div");
            ActionDiv.className += "responsive";
            PopularSection.appendChild(ActionDiv);
            movies.appendChild(PopularSection);



          for (var i = 0; i < response.results.length; i++) {
              let imgDiv = document.createElement("div");
              let img = document.createElement("img");
              img.id = response.results[i].id;
              img.className += "slideImg";
              img.src = "http://image.tmdb.org/t/p/original/" + response.results[i].poster_path;
              if (img.src == "http://image.tmdb.org/t/p/original/null") {
                  img.src = "img/no_image.png";
              }
            //   if (response.results[i].poster_path = "") {
            //       imgDiv.style.display = "none";
            //   }
              imgDiv.appendChild(img);
              ActionDiv.appendChild(imgDiv);

              let img_voteAverage = document.createElement("div");
              img_voteAverage.className += "vote-circle";
              let img_movieVoteSpan = document.createElement("span");
              img_voteAverage.appendChild(img_movieVoteSpan);
              img_movieVoteSpan.innerHTML = +response.results[i].vote_average;
              imgDiv.appendChild(img_voteAverage);

              let infoBox = document.createElement("div");
              infoBox.className += "infoBox";
              let infoTitle = document.createElement("h3");
              infoBox.appendChild(infoTitle);
              imgDiv.appendChild(infoBox);

              infoTitle.innerHTML = response.results[i].original_title;

              let infoActors = document.createElement("p");
              infoBox.appendChild(infoActors);
              infoActors.innerHTML = "Actors";
          }

          $(ActionDiv).slick({
              infinite: true,
              slidesToShow: 1,
              slidesToScroll: 1,
              variableWidth: true
          });

        //     $(".slideImg").hover(
        //         function() {
        //             $(this).siblings(".infoBox").css("height", "30%");
        //             $(this).siblings(".infoBox").css("display", "block");
        //    },   function() {
        //             $(this).siblings(".infoBox").css("height", "0%");
        //             $(this).siblings(".infoBox").css("display", "none");
        //       }
        //   );

        //   $(".infoBox").hover(
        //       function() {
        //           $(this).css("height", "30%");
        //       }
        //   );

          $(".slideImg").on("click", function(e) {

              $('.loading').show().delay(800).fadeOut(400);
              $(".loading").css("display", "flex");
              $("#main-content").remove()
              window.scrollTo(0, 0);
              getMovie($(this).attr("id"))
              this.off(e)
          });

        };
        v.send();
      }
};

function getMovie(movieid) {

        var r = new XMLHttpRequest();
        r.open("GET", "http://api.themoviedb.org/3/" + "movie/" +movieid+ "?api_key=3c2e3323fb6685239c36ee9312c7bcb0", true);
        console.log(r.open);
        r.onreadystatechange = function () {
            if (r.readyState != 4 || r.status != 200) return;
            let response = JSON.parse(r.responseText);

            $(".banner").css("background-image", "url(http://image.tmdb.org/t/p/original" +response.backdrop_path+ ")");
            $(".banner").css("height", "90vh");
            $(".banner").css("background-size", "cover");
            $(".banner").css("box-shadow", "0px 0px 0px");

            setTimeout(function() {

            }, 2000);

            $(".playButton").css("display", "block");
            $("#main-content").css("display", "none");
            $(".bannerText").css("display", "none");
            $(".btn").css("display", "none");
            $(".bannerPolygon").css("display", "block");
            let movieDiv = document.createElement("div");
            movieDiv.className += "movieDiv";
            let moviePoster = document.createElement("img");
            moviePoster.className += "moviePoster";
            moviePoster.src = "http://image.tmdb.org/t/p/original" +response.poster_path;
            movieDiv.appendChild(moviePoster);

            let movieVoteAverage = document.createElement("div");
            movieVoteAverage.className += "vote-circle";
            let movieVoteSpan = document.createElement("span");
            movieVoteSpan.innerHTML = +response.vote_average;
            movieVoteAverage.appendChild(movieVoteSpan);
            movieDiv.appendChild(movieVoteAverage);
            document.body.appendChild(movieDiv);

            let basicInfo = document.createElement("div");
            basicInfo.className += "basicInfo medium-7 medium-offset-5 small-12";

            let movieTitle = document.createElement("h1");
            movieTitle.innerHTML = response.original_title;
            basicInfo.appendChild(movieTitle);

            let movieYear = document.createElement("h3");
            movieYear.innerHTML = 2016;
            basicInfo.appendChild(movieYear);
            console.log("hello");

            var c = new XMLHttpRequest();
            console.log("http://api.themoviedb.org/3/" + "movie/" +movieid+ "/credits?api_key=3c2e3323fb6685239c36ee9312c7bcb0");
            c.open("GET", "http://api.themoviedb.org/3/" + "movie/" +movieid+ "/credits?api_key=3c2e3323fb6685239c36ee9312c7bcb0", true);
            c.onreadystatechange = function () {
                if (c.readyState != 4 || c.status != 200) return;
                let moviecrew = JSON.parse(c.responseText);

                let movieCrew = document.createElement("ul");
                let movieDirector = document.createElement("li");
                movieDirector.innerHTML = "<b>Director:</b> " +moviecrew.crew.filter(function(item) { return item.job == "Director"; })[0].name;;
                let movieWriters = document.createElement("li");
                movieWriters.innerHTML = "<b>Writers:</b> " +moviecrew.crew.filter(function(item) { return item.department == "Writing"; })[0].name;
                movieCrew.appendChild(movieDirector);
                movieCrew.appendChild(movieWriters);
                basicInfo.appendChild(movieCrew);
                movieDiv.appendChild(basicInfo);


                let movieDetails = document.createElement("div");
                movieDetails.className += "movieDetails";
                let row = document.createElement("div");
                row.className += "";
                let rowdiv1 = document.createElement("div");
                rowdiv1.className += "row"

                let movieDuration = document.createElement("ul");
                movieDuration.className += "medium-3 small-12"
                let movieDurationHeading = document.createElement("li");
                movieDurationHeading.innerHTML = "<b>Duration:</b> "
                movieDuration.appendChild(movieDurationHeading);
                let movieDurationLi = document.createElement("li");
                movieDurationLi.innerHTML = +response.runtime + " minutes";
                movieDuration.appendChild(movieDurationLi);
                rowdiv1.appendChild(movieDuration);

                let movieGenre = document.createElement("ul");
                movieGenre.className += "medium-3 small-12"
                let movieGenreHeading = document.createElement("li");
                movieGenreHeading.innerHTML = "<b>Genre:</b> "
                movieGenre.appendChild(movieGenreHeading);
                for (var i = 0; i < response.genres.length; i++) {
                    let genre = document.createElement("li");
                    genre.innerHTML = response.genres[i].name;
                    movieGenre.appendChild(genre);
                }
                rowdiv1.appendChild(movieGenre);

                row.appendChild(rowdiv1);
                let rowdiv2 = document.createElement("div");
                rowdiv2.className += "medium-9 small-12"
                row.appendChild(rowdiv2);
                movieDetails.appendChild(row);
                movieDiv.appendChild(movieDetails);


                let rowDivStoryline = document.createElement("div");
                rowDivStoryline.className += "movieStoryline medium-9 small-6 medium-7 medium-offset-5 small-12"
                let movieStorylineh2 = document.createElement("h2");
                movieStorylineh2.innerHTML = "Plot"
                rowDivStoryline.appendChild(movieStorylineh2);
                let movieStoryline = document.createElement("p");
                movieStoryline.innerHTML = response.overview;
                rowDivStoryline.appendChild(movieStoryline);
                movieDiv.appendChild(rowDivStoryline);

                let castSection = document.createElement("section");
                let castDiv = document.createElement("div");
                castDiv.className += "responsive";
                movieDiv.appendChild(castDiv);
                let castHeading = document.createElement("h2");
                castHeading.innerHTML = "Cast";
                castSection.appendChild(castHeading)
                castSection.appendChild(castDiv);
                movieDiv.appendChild(castSection);

                for (var i = 0; i < moviecrew.cast.length; i++) {
                    let castImgDiv = document.createElement("div");
                    let castImg = document.createElement("img");
                    castImg.id = moviecrew.cast[i].id;
                    castImg.className += "castImg";
                    castImg.src = "http://image.tmdb.org/t/p/original/" + moviecrew.cast[i].profile_path;
                    if (castImg.src == "http://image.tmdb.org/t/p/original/null") {
                        castImg.src = "img/no_image.png";
                    }
                    let castName = document.createElement("h2");
                    castName.innerHTML = moviecrew.cast[i].name;
                    let castCharacter = document.createElement("h3");
                    castCharacter.innerHTML = "Character: " +moviecrew.cast[i].character;
                    castImgDiv.appendChild(castImg);
                    castImgDiv.appendChild(castName);
                    castImgDiv.appendChild(castCharacter);
                    castDiv.appendChild(castImgDiv);
                }

                var similar = new XMLHttpRequest();
                similar.open("GET", "http://api.themoviedb.org/3/" + "movie/" +movieid+ "/similar?api_key=3c2e3323fb6685239c36ee9312c7bcb0", true);
                similar.onreadystatechange = function () {
                    if (similar.readyState != 4 || similar.status != 200) return;
                    let similarMovies = JSON.parse(similar.responseText);

                    let similarMovieSection = document.createElement("section");
                    let similarMoviesHeading = document.createElement("h3");
                    similarMoviesHeading.innerHTML = "You might also like:"
                    similarMovieSection.appendChild(similarMoviesHeading);
                    let similarMovieDiv = document.createElement("div");
                    similarMovieDiv.className += "similarMovies responsive";
                    similarMovieSection.appendChild(similarMovieDiv);
                    movieDiv.appendChild(similarMovieSection);
                    let movieContent = document.getElementById('movieContent');
                    movieContent.appendChild(movieDiv);
                    for (var i = 0; i < similarMovies.results.length; i++) {
                        let similarMovieImgDiv = document.createElement("div");
                        let similarMovieImg = document.createElement("img");
                        similarMovieImg.className += "similarImg";
                        similarMovieImg.id =  +similarMovies.results[i].id;
                        similarMovieImg.src = "http://image.tmdb.org/t/p/original/" + similarMovies.results[i].poster_path;
                        similarMovieImgDiv.appendChild(similarMovieImg);
                        //   if (c.src == "http://image.tmdb.org/t/p/original/null") {
                        //       castImg.src = "img/no_image.png";
                        //   }
                        //   let castName = document.createElement("h3");
                        //   castName.innerHTML = moviecrew.cast[i].name;
                        //   similarMovieImgDiv.appendChild(similarMovieImg);
                        //   castImgDiv.appendChild(castName);
                        similarMovieDiv.appendChild(similarMovieImgDiv);
                    }

                    $(".similarImg").on("click", function() {

                        $('.loading').show().delay(800).fadeOut(400);
                        $(".loading").css("display", "flex");

                        $(".movieDiv").remove();
                        window.scrollTo(0, 0);
                        getMovie($(this).attr("id"));

                    });

                    $(similarMovieDiv).slick({
                        infinite: false,
                        slidesToShow: 4,
                        slidesToScroll: 4,
                        variableWidth: true
                    });
                };

                similar.send();

                $(castDiv).slick({
                    infinite: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true
                });

                let trailers = new XMLHttpRequest();
                trailers.open("GET", "http://api.themoviedb.org/3/" + "movie/" +movieid+ "/videos?api_key=3c2e3323fb6685239c36ee9312c7bcb0", true);
                trailers.onreadystatechange = function () {
                    if (trailers.readyState != 4 || trailers.status != 200) return;
                    let trailersNew = JSON.parse(trailers.responseText);

                    $("#playClick").click(function() {
                        console.log(trailersNew.results[0].key);
                        $("iframe").attr("src", "https://www.youtube.com/embed/" +trailersNew.results[0].key);
                    });


                };
                trailers.send();



            };
            c.send();

        };
        r.send();



};


$(".logo").click(function() {
    $(".movieDiv").empty();
    window.location = "index.html";
});
