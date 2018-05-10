alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let tvShows = [];
let wins = 0;
let tvShow = "";
let tvShowText = [];
let guessesSoFar = [];
let guessesLeft = 0;

function loadTvShows() {
    let obj1 = {tvShow: "The Rockford Files", link:"https://youtu.be/sQhwRr_-g50", compareText: "the rockford files"}
    let obj2 = {tvShow: "WKRP in Cincinnati", link:"https://youtu.be/YQvCNLIVydM", compareText: "wkrp in cincinnati"}
    tvShows.push(obj1);
    tvShows.push(obj2);
    document.addEventListener("keydown", processGuess)
    resetVars();
}

function resetVars () {
    document.getElementById("wins").innerHTML="wins:" + wins;
    tvShow = tvShows[Math.floor((Math.random() * 2))];
    document.getElementById("tvTitle").innerHTML=siftTvShow();
    document.getElementById("numberOfGuessesLeft").innerHTML = "Number of guesses left:" + guessesLeft;
    document.getElementById("letterGuessed").innerHTML = ""; 
    document.getElementById("info").innerHTML = "Press any letter for your first guess.";
    
    guessesSoFar = [];   
}

function siftTvShow() {
    tvShowText = [];
    for(i = 0; i < tvShow.tvShow.length; i++) {
        if(tvShow.tvShow[i] !== " ") {
            tvShowText.push("_");
        }
        else {
            tvShowText.push(" ");
        }
    }
    guessesLeft = Math.floor(tvShowText.length * 1.5);
    return tvShowText;
}

function processGuess(e) {
    if(alpha.indexOf(e.key) < 0){
        alert("Character " + e.key + " is not a valid key. Try again.")
        return;
    }
    if(guessesSoFar.indexOf(e.key.toLowerCase()) > -1) {
        document.getElementById("info").innerHTML = "You have already guessed " + e.key;
        return;
    }
    else {
        document.getElementById("info").innerHTML = "";
    }

    let ind
    let indArray = [];
    for(i = 0; i < tvShow.tvShow.length; i++)
    {
         ind = tvShow.compareText.indexOf(e.key.toLowerCase(), i);
         if(ind > -1) {
             indArray.push(ind);
             i = ind
         }
    }
    let index;
    for(i = 0; i < indArray.length; i++){
        tvShowText[indArray[i]] = tvShow.tvShow[indArray[i]]        
    }
    document.getElementById("tvTitle").innerHTML=tvShowText;
}
