alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let tvShows = [];
let wins = 0;
let tvShow = "";
let tvShowText = [];
let guessesSoFar = [];
let guessesLeft = 0;

function loadTvShows() {
    // let obj1 = {tvShow: "The Rockford Files", link:"https://youtu.be/sQhwRr_-g50", compareText: "the rockford files"}
    let obj1 = {tvShow: "The Rockford Files", link:"https://www.youtube.com/embed/sQhwRr_-g50", compareText: "the rockford files"}
    let obj2 = {tvShow: "WKRP in Cincinnati", link:"https://www.youtube.com/embed/YQvCNLIVydM", compareText: "wkrp in cincinnati"}
    let obj3 = {tvShow: "Rawhide", link:"https://www.youtube.com/embed/E_XRfvBKEiY", compareText: "rawhide"}
    
    tvShows.push(obj1);
    tvShows.push(obj2);
    tvShows.push(obj3);
    document.getElementById("hangmanPic").style.visibility = "visible";
    document.getElementById("hangmanIframe").style.display = "none";
    document.addEventListener("keydown", processGuess);
    resetVars();
}

function resetVars () {
    document.getElementById("wins").innerHTML="wins:" + wins;
    tvShow = tvShows[Math.floor((Math.random() * 3))];
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
        guessesSoFar.push(e.key);
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
    guessesLeft--;
    document.getElementById("numberOfGuessesLeft").innerHTML = "Number of guesses left:" + guessesLeft;
    isGameOver();
}
 
function isGameOver() {
    if(guessesLeft === 0) {
        document.getElementById("info").innerHTML = "Sorry You Lost!"
        return;
    }

    for(i = 0; i < tvShowText.length; i++) {
        if(tvShowText[i] !== tvShow.tvShow[i]) {
            return;
        }
    }    
    document.getElementById("info").innerHTML = "Congratulations You Have Won!"
    document.getElementById("hangmanIframe").style.display = "block";
    document.getElementById("hangmanPic").style.display = "none";
    document.getElementById("hangmanIframe").src = tvShow.link;
    wins++;
    document.getElementById("wins").innerHTML = "wins:" + wins;
}