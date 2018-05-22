
//*******************/
//***  VARIABLES  ***/
//*******************/
//array of guessed letters
var guessedLetters = [];

var guessesRemaining = 5;

var totalWins = 0;
var totalLosses = 0;
var totalGamesPlayed = 0;

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
wordToGuess = wordToGuess.toUpperCase(wordToGuess);

            //document.querySelector("#word-to-guess").innerHTML = wordToGuess;

//*******************/
//***  FUNCTIONS  ***/
//*******************/


//***   LOGIC ***//

// for each letter add
for (i=0; i < wordToGuess.length; i++) {
    //console.log("String " + wordToGuess[i].toString() + " is alphanum " + isAlphaNumeric(wordToGuess[i]));

    // create space at beginning
    if (i===0) {
        var htmlLeadSpan = document.createElement("span");  
        var htmlLeadTextNbsp = document.createTextNode(String.fromCharCode(160));
    
        htmlLeadSpan.setAttribute("class", "blank-separator");
        htmlLeadSpan.appendChild(htmlLeadTextNbsp);  
    
        document.getElementById("word-to-guess").appendChild(htmlLeadSpan); 
    }

    // 1) <span id="word-char-X"><u>T</u></span>
    var htmlSpan = document.createElement("span");                
    htmlSpan.setAttribute("id", "span-char-" + i);
    var htmlText = document.createTextNode(wordToGuess[i]);

    // if the character is a word separator, do not underline it
    if (wordToGuess[i] === " " || !/[\w]/.test(wordToGuess[i])) {        //  !isAlphaNumeric(wordToGuess[i])) {
        htmlSpan.appendChild(htmlText);  
    } else {                                                    
        var htmlUnderline = document.createElement("u");
        htmlUnderline.setAttribute("id", "underline-char-" + i);
        htmlSpan.appendChild(htmlUnderline);  
        htmlUnderline.appendChild(htmlText);  
    }

    // 2) create space around letters (instead of using padding so can style differently if desired)
    var htmlSpan2 = document.createElement("span");  
    var htmlTextNbsp = document.createTextNode(String.fromCharCode(160));

    htmlSpan2.setAttribute("class", "blank-separator");
    htmlSpan2.appendChild(htmlTextNbsp);  

    document.getElementById("word-to-guess").appendChild(htmlSpan);
    document.getElementById("word-to-guess").appendChild(htmlSpan2); 

    console.log("html: " + document.getElementById("word-to-guess").innerHTML);
}

//*******************/
//***  EVENTS     ***/
//*******************/
document.onkeyup = function(event) {
    var key = event.key;

    console.log("Key pressed is: " + key);
    console.log(key);

    key = key.toUpperCase();

    // only evaluate characters we care about
    if (/[a-zA-Z0-9]/.test(key) && key.length === 1) {

        // if letter is in the word to guess
        if (wordToGuess.indexOf(key) !== -1) {

            // show the letters that match
            console.log("found it");

        } else {
            // letter is not in the word so decrement the guesses remaining, unless that was the last guess
            if (guessesRemaining > 0 ) {

                guessesRemaining--;

                // if the guessed letter has not been entered before, add it to the guesses.  Otherwise, ignore.
                if (guessedLetters.indexOf(key) === -1) {
                    guessedLetters.push(key);
                    document.querySelector("#guessed-letters").innerHTML = guessedLetters;
                }

                document.querySelector("#guesses-remaining").innerHTML = guessesRemaining;

            } else {            // there were no guesses remaining

                // END GAME
                totalLosses++;
                totalGamesPlayed++;

                document.querySelector("#total-losses").innerHTML = totalLosses;
                document.querySelector("#total-games-played").innerHTML = totalGamesPlayed;

                console.log(totalLosses);
                console.log(totalGamesPlayed);

                //gameReset();              TODO
            }

        }
    }

  }

//********************/
//*** PSEUDO NOTES ***/
//********************/

//functions:
// -> showGameStats
// -> logGameStats
// -> revealLetter

// objects:
// -> var game = {... }