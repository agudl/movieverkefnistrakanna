$(document).ready( function() {
    $(document).foundation();

    // $(".searchCircle").css("display", "none");

    $(".reveal").css("top","25%");

    setTimeout(function() {
        $(".banner").css("height", "60vh");
        $(".navigation").css("display", "block");
        $("body").css("overflow", "auto");
    }, 1400);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
           $(".searchCircle").css("right", "-8%");
           $(".searchlogo").css("position", "fixed");
           $(".searchlogo").css("right", "0%");
       } else if ($(this).scrollTop() < 300) {
           $(".searchCircle").css("right", "-800%");
           $(".searchCircle").css("transform", "(70deg)");
           $(".searchlogo").css("position", "absolute");
           $(".searchlogo").css("right", "0%");
       }
   });

   var mq = window.matchMedia( "(max-width: 760px)" );

   if (mq.matches) {

       $("iframe").attr("height", "40%");

       $(".banner").css("height", "90vh");

       $(window).scroll(function () {
           if ($(this).scrollTop() > 300) {
              $(".searchCircle").css("right", "5%");
              $(".searchlogo").css("position", "fixed");
              $(".searchlogo").css("right", "7%");
              $(".searchlogo").css("top", "auto");
              $(".searchlogo").css("bottom", "4%");
              $(".searchlogo").css("width", "7%");

          } else if ($(this).scrollTop() < 300) {
              $(".searchCircle").css("right", "-800%");
              $(".searchCircle").css("transform", "(70deg)");
              $(".searchlogo").css("position", "absolute");
              $(".searchlogo").css("right", "0%");
              $(".searchlogo").css("width", "15%");
          }
      });
   }

   $(".slick-next").click(function() {
       $(".slick-prev").css("display", "block");
   })


});


let genres = [
    {
        "id": 28,
        "name": "Action"
    },
    {
        "id": 12,
        "name": "Adventure"
    },
    {
        "id": 16,
        "name": "Animation"
    },
    {
        "id": 35,
        "name": "Comedy"
    },
    {
        "id": 80,
        "name": "Crime"
    },
    {
        "id": 99,
        "name": "Documentary"
    },
    {
        "id": 18,
        "name": "Drama"
    },
    {
        "id": 10751,
        "name": "Family"
    },
    {
        "id": 14,
        "name": "Fantasy"
    },
    {
        "id": 36,
        "name": "History"
    },
    {
        "id": 27,
        "name": "Horror"
    },
    {
        "id": 10402,
        "name": "Music"
    },
    {
        "id": 9648,
        "name": "Mystery"
    },
    {
        "id": 10749,
        "name": "Romance"
    },
    {
        "id": 878,
        "name": "Science Fiction"
    },
    {
        "id": 10770,
        "name": "TV Movie"
    },
    {
        "id": 53,
        "name": "Thriller"
    },
    {
        "id": 10752,
        "name": "War"
    },
    {
        "id": 37,
        "name": "Western"
    }
];

// console.log(genres.filter(function(item) { return item.id == id; })[0]);

let action = new Genre();
action.getById(28);


let western = new Genre();
western.getById(37);
// genres.pop(getGenreName(37));

let war = new Genre();
war.getById(10752);
// genres.pop(getGenreName(10752));

$("#seeMore").click(function() {

    let gifImg = document.createElement("img");
    gifImg.src = "img/loading.gif";
    gifImg.className += "loadingIcon";
    movies.appendChild(gifImg);
    $(this).css("display", "none");

    setTimeout(function() {
        gifImg.style.display = "none";
        for (var i = 0; i < 3; i++) {
            let randomNumber = Math.floor(Math.random() * (genres.length - 0)) + 0;
            let newGenre = new Genre();
            newGenre.getById(genres[randomNumber].id);
            genres.pop(genres[randomNumber]);
        }
        $("#seeMore").css("display", "flex");

    }, 1000);


    if (genres.length < 2) {
        $("#seeMore").css("display", "none");
    }
});

$(".slideImg").on("click", function(e) {
    $("#main-content").remove();
    getMovie($(this).attr("id"));
    $(window).scrollTop = 0;
    this.off(e);
});
