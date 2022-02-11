//Accessing all elemnts from Html file
var searchBtn = $("#search");
var input = $("#myInput");
var dataList = $("#datalist");
var heroDetails = $("#herodetails");
var fav1 = $("#favourites");
var container = $(".container");
var home = $("#home");
var favList = $("#favList");
var arr = [];
var p = [];

//Function for showing suggestions in search box
function superHeroes() {
  for (let i = 0; i < 1; i++) {
    $.get(
      "https://superheroapi.com/api.php/954174915474343/search/" + "i",
      function (response) {
        for (let heroes of response.results) {
          let alldata = heroes.name;
          let text = heroes.name;
          dataList.append(`<option value="${alldata}">
             ${text}
        </option>`);
        }
      }
    );
  }
}
for (let i = 0; i < 1; i++) {
  superHeroes();
}

//function for fetching superhero details like name and powerstats
function click1() {
  container.css("display", "none");
  heroDetails.show();

  $.get(
    "https://superheroapi.com/api.php/954174915474343/search/" + input.val(),
    function (response) {
      for (let hero of response.results) {
        let photos = hero.image;
        let bio = hero.biography;
        console.log(bio);
        //console.log(photos);

        let p1 = "Name: " + " " + hero.name;
        let p4 = "Aliases: " + bio.aliases;
        let p2 = "Powerstat-Speed: " + hero.powerstats.speed;
        let p3 = "Powerstat-power: " + hero.powerstats.power;
        heroDetails.html(`
            <div id="favbackground"> 
            <img style="height:300px;margin-top:95px; width:369px;" src="${photos.url}">  
            <button id="fav" style="width: -webkit-fill-available;  "> <i class="fas fa-heart"></i> </button>
            </div>
            <div> 
            <p style="font-size : 42px; display:flex; align-items: center; justify-content: center; "> ${p1} </p> 
            <p style="font-size : 42px; display:flex; align-items: center; justify-content: center; " > ${p2} </p> 
             <p style="font-size : 42px; display:flex; align-items: center; justify-content: center; ">${p3} </p> 
             <p style="font-size : 42px; display:flex; align-items: center; justify-content: center; ">${p4} </p> 
             </div>
             
            `);
        heroDetails.css("height", "100vh");
        heroDetails.css(
          "background-image",
          "linear-gradient(45deg, #11a25fed, transparent)"
        );

        $("#fav").click(function () {
          let fav = hero.name;
          arr.push(fav);
          p.push(photos.url);
          localStorage["heroes"] = JSON.stringify(arr);
          localStorage["pictures"] = JSON.stringify(p);
        });
      }
    }
  );
}

var keys = {};
//function for adding our Favourite superhero to Favourite List
favList.click(function () {
  fav1.css("background-image", "linear-gradient(45deg, #0ea63c,transparent)");
  $("#displayHero").show();
  heroDetails.css("display", "none");
  container.css("display", "none");
  fav1.show();

  let storedDatas = JSON.parse(localStorage["heroes"]);
  let pictures = JSON.parse(localStorage["pictures"]);
  let b;
  let pic;
  console.log(storedDatas);
  console.log(pictures.url);
  for (let a in storedDatas) {
    if (keys[storedDatas[a]]) {
      continue;
    } else {
      keys[storedDatas[a]] = a;
      b = storedDatas[a];
      pic = pictures[a];
      console.log(pic);
      fav1.append(`
            <div id="displayHero">
             <img style="width:300px; height:300px; margin-top:40px " src="${pic}"> </img>
              <p>${b}</p>
            </div>
            `);
    }
  }
});

searchBtn.click(click1);

//Function for reaching Home
home.click(function () {
  container.show();
  heroDetails.css("display", "none");
  $("#displayHero").css("display", "none");
  fav1.css('display', 'none');
});
