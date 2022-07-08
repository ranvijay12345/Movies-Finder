const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=dbffdfe4&s=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=dbffdfe4&i=";

var search_input = document.getElementById("search_input");
var card = document.getElementsByClassName("movie-cards")[0];

document.getElementsByClassName("search")[0].addEventListener("click", function(){
    console.log(search_input.value);
    const query = search_input.value;
    if(query){  // if the query variable is not null then call to the function getMovies
        getMovies(API_URL+query);  
    }
}); 

async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    showMovies(respData.Search);
}

function showMovies(movies){
    card.innerHTML="";
    movies.forEach(async function(movie){
        const movieData = await fetch(API_URL_SEARCH+movie.imdbID);
        const movieDataobj = await movieData.json();
        movi_display(movieDataobj);
    });
}

function movi_display(imovie){
    const movieElm = document.createElement("div");
    movieElm.classList.add("movie-card");
    movieElm.innerHTML=`
        <div class="card">
            <img src= "${imovie.Poster}" alt = "Poster" width = "300px" height = "300px"/>
            <br>
            <div class = "movi-discription">
                <span class="movie-title"><b>Title - </b><span class="value">${imovie.Title}</span></span>
                <span class="movie-title"><b>Rating - </b><span class="value">${imovie.imdbRating}</span></span>
                <span class="movie-title"><b>Director - </b><span class="value">${imovie.Director}</span></span>
                <span class="movie-title"><b>Released Date - </b><span class="value">${imovie.Released}</span></span>
                <span class="movie-title"><b>Genre - </b><span class="value">${imovie.Genre}</span></span>
            </div>
        </div>
    `;
    card.appendChild(movieElm);
}