$(document).ready(function(){
  $('.searchlogo').click(function() {
       $('.search').fadeIn();
       $("body").css("overflow", "hidden");
     });

     $(".closeMe").click(function() {
       $('.search').fadeOut();
       $("body").css("overflow", "auto");
     });

               $('.Genre').slick({
                 dots: true,
                 infinite: false,
                 speed: 300,
                 slidesToShow: 2.7,
                 slidesToScroll: 3,
                 responsive: [
                   {
                     breakpoint: 1024,
                     settings: {
                       slidesToShow: 3,
                       slidesToScroll: 3,
                       infinite: true,
                       dots: true
                     }
                   },
                   {
                     breakpoint: 600,
                     settings: {
                       slidesToShow: 2,
                       slidesToScroll: 2
                     }
                   },
                   {
                     breakpoint: 480,
                     settings: {
                       slidesToShow: 1,
                       slidesToScroll: 1
                     }
                   }
                   // You can unslick at a given breakpoint now by adding:
                   // settings: "unslick"
                   // instead of a settings object
                 ]
               });



  $(document).foundation();


//$(".value").innerHTML = $(".slider-handlemin").attr("aria-valuenow", newprogress).value;

$('.slider').on('moved.zf.slider', function(){
  let handleValue1 = $(".slider-handlemin").attr('aria-valuenow');
  let handleValue2 = $(".slider-handlemax").attr('aria-valuenow');
  document.getElementById("talamin").innerHTML = handleValue1/10;
  document.getElementById("talamax").innerHTML = handleValue2/10;
});

  $('.btnG').click(function(){
    $(this).toggleClass('btnG1');
  });

  $(".seemore").click(function() {
    $('.row1').show();
    $(".seeless").show();
        $(".seemore").hide();
  });

  $(".seeless").click(function() {
    $('.row1').hide();
      $('.seeless').hide();
          $('.seemore').show();
      });
});

$(".advancedSearch").click(function() {
    $(".container").toggleClass("shown");
    $("#searchContent").css("display","none");
})

    $(".leitainput1").keyup(function(e) {
        let inputValue = $('.leitainput1').val();
        $("#searchContent").empty();
        $(".container").removeClass("shown");
        $("#searchContent").css("display","block");
        if ($('.leitainput1').val() == "") {
            return;
        }
        let newSearch = new XMLHttpRequest();
        newSearch.open("GET", "https://api.themoviedb.org/3/search/multi?api_key=3c2e3323fb6685239c36ee9312c7bcb0&language=en-US&query="+inputValue+"", true);
        newSearch.onreadystatechange = function () {
          if (newSearch.readyState != 4 || newSearch.status != 200) return;
          let newSearchArr = JSON.parse(newSearch.responseText);

          let searchDiv = document.createElement("div");
          let searchContent = document.getElementById('searchContent')

          for (var i = 0; i < 3; i++) {

              let searchResultDiv = document.createElement("div");
              searchResultDiv.className += "searchResults medium-6 small-11";
              let searchImg = document.createElement("img");
              searchResultDiv.id = newSearchArr.results[i].id;
              searchResultDiv.appendChild(searchImg);
              searchImg.src = "https://image.tmdb.org/t/p/original"+newSearchArr.results[i].poster_path;
              if (newSearchArr.results[i].media_type == "person") {
                  searchImg.src = "https://image.tmdb.org/t/p/original"+newSearchArr.results[i].profile_path;
              }
              if (newSearchArr.results[i].poster_path == null && newSearchArr.results[i].profile_path == null) {
                  searchImg.src = "img/no_image.png";
              }
              let searchBasicInfo = document.createElement("div");
              searchBasicInfo.className += "searchInfo";
              searchResultDiv.appendChild(searchBasicInfo);
              let searchHeading = document.createElement("h2");
              searchHeading.innerHTML = newSearchArr.results[i].name;
              if (newSearchArr.results[i].media_type == "movie") {
                  searchHeading.innerHTML = newSearchArr.results[i].original_title;
              }
              let searchOverview = document.createElement("p");
              searchOverview.innerHTML = newSearchArr.results[i].overview.slice(0,180) + "..";
              if (newSearchArr.results[i].media_type == "person") {
                      searchOverview.innerHTML += newSearchArr.results[i].overview.slice(0,180) + "..";
              }
              searchBasicInfo.appendChild(searchHeading);
              searchBasicInfo.appendChild(searchOverview);
              searchDiv.appendChild(searchResultDiv);
              searchContent.appendChild(searchDiv);

          }

        //   var text = $("p").text();
        //   console.log($("p").text());
        //   text = (text.length > 20) ? text.slice(0,-20) : text;
        //   $("p").text(text);

          $(".searchResults").click(function(e) {
              $('.loading').show().delay(800).fadeOut(400);
              $(".loading").css("display", "flex");
              window.scrollTo(0, 0);
             getMovie($(this).attr("id"));
             $(".search").css("display", "none");
             $(".movieDiv").remove();
             $("body").css("overflow", "auto");
             this.off(e)
          })

        };
        newSearch.send();
    });
// https://api.themoviedb.org/3/search/multi?api_key=3c2e3323fb6685239c36ee9312c7bcb0&query=de&page=1


// class MovieDB {
//     constructor()
// }
