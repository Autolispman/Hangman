alpha = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let tvShows = [];
let wins = 0;
let tvShow = "";
let tvShowText = [];
let guessesSoFar = [];
let guessesLeft = 0;

function loadTvShows() {
    // let obj1 = {tvShow: "The Rockford Files", link:"https://youtu.be/sQhwRr_-g50", compareText: "the rockford files"}
    let obj1 = {tvShow: "The Rockford Files", link:"assets/images/The Rockford Files.mp4", compareText: "the rockford files"}
    let obj2 = {tvShow: "WKRP in Cincinnati", link:"assets/images/WKRP in Cincinnati.mp4", compareText: "wkrp in cincinnati"}
    let obj3 = {tvShow: "Rawhide", link:"assets/images/Rawhide.mp4", compareText: "rawhide"}
    let obj4 = {tvShow: "Flintstones", link:"assets/images/Flintstones.mp4", compareText: "flintstones"}
    let obj5 = {tvShow: "Gilligans Island", link:"assets/images/Gilligans Island.mp4", compareText: "gilligans island"}
    let obj6 = {tvShow: "Hawaii Five O", link:"assets/images/Hawaii Five O.mp4", compareText: "hawaii five o"}
    let obj7 = {tvShow: "Jeopardy", link:"assets/images/Jeopardy.mp4", compareText: "jeopardy"}
    let obj8 = {tvShow: "Knight Rider", link:"assets/images/Knight Rider.mp4", compareText: "knight rider"}
    let obj9 = {tvShow: "Mission Impossible", link:"assets/images/Mission Impossible.mp4", compareText: "mission impossible"}
    let obj10 = {tvShow: "Mister Ed", link:"assets/images/Mister Ed.mp4", compareText: "mister ed"}
    let obj11 = {tvShow: "Sanford and Son", link:"assets/images/Sanford and Son.mp4", compareText: "sanford and son"}
    let obj12 = {tvShow: "Star Trek The Next Generation", link:"assets/images/Star Trek The Next Generation.mp4", compareText: "star trek the next generation"}
    let obj13 = {tvShow: "The Andy Griffith Show", link:"assets/images/The Andy Griffith Show.mp4", compareText: "the andy griffith show"}
    let obj14 = {tvShow: "The Brady Bunch", link:"assets/images/The Brady Bunch.mp4", compareText: "the brady bunch"}
    let obj15 = {tvShow: "The Dukes of Hazzard", link:"assets/images/The Dukes of Hazzard.mp4", compareText: "the dukes of hazzard"}
    let obj16 = {tvShow: "The Jeffersons", link:"assets/images/The Jeffersons.mp4", compareText: "the jeffersons"}
    let obj17 = {tvShow: "The Monkees", link:"assets/images/The Monkees.mp4", compareText: "the monkees"}
    let obj18 = {tvShow: "The Muppet Show", link:"assets/images/The Muppet Show.mp4", compareText: "the muppet show"}
    let obj19 = {tvShow: "The Twilight Zone", link:"assets/images/The Twilight Zone.mp4", compareText: "the twilight zone"}
    let obj20 = {tvShow: "Welcome Back Kotter", link:"assets/images/Welcome Back Kotter.mp4", compareText: "welcome back kotter"}
    
    tvShows.push(obj1);
    tvShows.push(obj2);
    tvShows.push(obj3);
    tvShows.push(obj4);
    tvShows.push(obj5);
    tvShows.push(obj6);
    tvShows.push(obj7);
    tvShows.push(obj8);
    tvShows.push(obj9);
    tvShows.push(obj10);
    tvShows.push(obj11);
    tvShows.push(obj12);
    tvShows.push(obj13);
    tvShows.push(obj14);
    tvShows.push(obj15);
    tvShows.push(obj16);
    tvShows.push(obj17);
    tvShows.push(obj18);
    tvShows.push(obj19);
    tvShows.push(obj20);
    
    document.addEventListener("keydown", processGuess);
    resetVars();
}

function resetVars () {
    document.getElementById("hangmanIframe").src = "#";
    document.getElementById("hangmanIframe").style.display = "none";
    document.getElementById("hangmanPic").style.display = "block";
    document.getElementById("wins").innerHTML="wins:" + wins;
    tvShow = tvShows[Math.floor((Math.random() * tvShows.length))];
    document.getElementById("tvTitle").innerHTML=siftTvShow();
    document.getElementById("numberOfGuessesLeft").innerHTML = "Number of guesses left:" + guessesLeft;
    document.getElementById("info").innerHTML = "Press any letter for your first guess.";  
    document.getElementById("guessesSoFar").innerHTML = "Letters guessed:";  
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
    if(alpha.indexOf(e.key.toLowerCase()) < 0){
        document.getElementById("info").innerHTML = "Character " + e.key + " is not a valid key. Try again.";
        return;
    }
    if(guessesSoFar.indexOf(e.key.toLowerCase()) > -1) {
        document.getElementById("info").innerHTML = "You have already guessed " + e.key;
        return;
    }
    if(document.getElementById("tvTitle").innerHTML.indexOf("_") > -1) {
        document.getElementById("info").innerHTML = e.key;
        guessesSoFar.push(e.key);
        document.getElementById("guessesSoFar").innerHTML = "Letters guessed: " + guessesSoFar;
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

function newGame () {
    resetVars();
}