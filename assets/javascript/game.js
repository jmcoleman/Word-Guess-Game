//word bank
var wordBank = ["United Kingdom","Windsor Castle","Duke of Sussex","Prince Harry","St. George Cathedral","Meghan Markle","Duchess of Sussex",
    "Carriage","black-tie","Frogmore House","Jaguar","Queen","Celebreties","Sir Elton John","Ascot Landau","Commonwealth","E190518","Blues and Royals",
    "frockcoat","Veil","page boys","tiara","Duke of Cambridge","best man","Archbishop of Canterbury","St. George's Chapel","Duchess of Cambridge",
    "Prince George","Princess Charlotte","St. George's Hall","Bishop Michael Curry","Doria Ragland","Prince of Wales","Nottingham Cottage","American",
    "Suits","Princess of Wales","fireworks","cocktail ring","Princess Diana","The Royal Navy","British Army","Royal Air Force","parade","Captain Wales",
    "George Clooney","Amal Clooney", "Serena Williams","David Beckham","fashion","modern","diversity","Prince William","Kensington Palace","Nott Cott"
];

// randomly chooses a word from the word bank
var wordToGuess = wordBank[Math.floor(Math.random() * wordBank.length)];
console.log("Word to guess: " + wordToGuess);
wordToGuess = wordToGuess.toUpperCase(wordToGuess);

            //document.querySelector("#word-to-guess").innerHTML = wordToGuess;

// for each letter add
for (i=0; i < wordToGuess.length; i++) {

    // 1) <span id="word-char-X"><u>T</u></span>
    var htmlSpan = document.createElement("span");                
    htmlSpan.setAttribute("id", "word-char-" + i);
    var htmlText = document.createTextNode(wordToGuess[i]);

    // if the character is a word separator, do not underline it
    if (wordToGuess[i] === " ") {
        htmlSpan.appendChild(htmlText);  
    } else {                                                    
        var htmlUnderline = document.createElement("u");
        htmlSpan.appendChild(htmlUnderline);  
        htmlUnderline.appendChild(htmlText);  
    }

    // 2) <span>&nbsp</span> tp create space around letters instead of using padding
    var htmlSpan2 = document.createElement("span");  
    var htmlTextNbsp = document.createTextNode(String.fromCharCode(160));

    htmlSpan2.setAttribute("class", "blank-separator");
    htmlSpan2.appendChild(htmlTextNbsp);  

    document.getElementById("word-to-guess").appendChild(htmlSpan);
    document.getElementById("word-to-guess").appendChild(htmlSpan2); 

    console.log("html: " + document.getElementById("word-to-guess").innerHTML);
}


//array of guessed letters
var guessedLetters = [];

var guessesRemaining = 0;

var totalWins = 0;
var totalLosses = 0;
var totalGamesPlayed = 0;


//functions:
// -> showGameStats
// -> logGameStats
// -> revealLetter

// objects:
// -> var game = {... }

document.onkeyup = function(event) {
    var key = event.key;

    console.log("Key pressed is: " + key);

    guessedLetters.push(key);
    document.querySelector("#guessed-letters").innerHTML = guessedLetters;

    //if key pushed is in the word, then show that letter in the word to guess
        //func: call method to show letter
    //else add the letter to the previous guesses letters 
        //if it hasn't already been added, add it

        //otherwise, do nothing


  }