//*******************/
//***  VARIABLES  ***/
//*******************/
var totalWins = 0;
var totalLosses = 0;
var totalGamesPlayed = 0;
const MAXGUESSES = 5;

var wordBankCategory1 = ["United Kingdom","Windsor Castle","Duke of Sussex","Prince Harry","St. George Cathedral","Meghan Markle","Duchess of Sussex",
"Carriage","black-tie","Frogmore House","Jaguar","Queen","Celebreties","Sir Elton John","Ascot Landau","Commonwealth","Blues and Royals",
"frockcoat","Veil","page boys","tiara","Duke of Cambridge","best man","Archbishop of Canterbury","St. George's Chapel","Duchess of Cambridge",
"Prince George","Princess Charlotte","St. George's Hall","Bishop Michael Curry","Doria Ragland","Prince of Wales","Nottingham Cottage","American",
"Suits","Princess of Wales","fireworks","cocktail ring","Princess Diana","The Royal Navy","British Army","Royal Air Force","parade","Captain Wales",
"George Clooney","Amal Clooney", "Serena Williams","David Beckham","fashion","modern","diversity","Prince William","Kensington Palace","Nott Cott"
];

var myGame = new Game(MAXGUESSES,wordBankCategory1);              // create a new game

//*******************/
//***  OBJECTS    ***/
//*******************/

// tracks game and operations used to play game
function Game(maxGuesses, wordBank) {
    this.wordToGuess = wordBank[Math.floor(Math.random() * wordBank.length)];      // randomly choose a word from the word bank
    this.wordToGuess = this.wordToGuess.toUpperCase();

    this.guessesRemaining = maxGuesses;
    this.guessedLetters = [];

    this.start = function() {
        // clear portion solved and redraw it.
        var node = document.getElementById("word-to-guess");
        node.innerHTML = '';

        console.log(this.wordToGuess);
        getRenderedFont("word-to-guess");

        this.showStartWord(this.wordToGuess);
        //this.showSolvedWord(this.wordToGuess);
    };

    this.showSolvedWord = function(word) {
        // clear portion solved and redraw it.
        var node = document.getElementById("word-to-guess");
        node.innerHTML = '';
    
        // add leading space at front of word and trailing space after each letter
        for (let j = 0; j < word.length; j++) {
            if (j===0) { this.drawLetter(String.fromCharCode(160), -1, true); };
            this.drawLetter(word[j], j, true);
            this.drawLetter(String.fromCharCode(160), -1, true);
        }
    };

    this.showStartWord = function(word) {
        // add leading space at front of word and trailing space after each letter
        for (let j = 0; j < word.length; j++) {
            if (j===0) { this.drawLetter(" ", -1, true); };
            this.drawLetter(word[j], j, false);
            this.drawLetter(" ", -1, true);
        }
    };

    this.drawLetter = function (char, position, isShown) {
        //Unshown Letter -->  <span id="0" style="text-decoration: underline;">_&nbsp;</span>   <span class="whitespace">&nbsp;</span>
        //Shown Letter -->  <span id="0" style="text-decoration: none;">X</span>                <span class="whitespace">&nbsp;</span>
        //Word Separator --> <span class="word-separator" style="text-decoration: none;">&nbsp;</span>
        //Whitespace --> <span class="whitespace" style="text-decoration: none;"></span>

        var isWordSeparator = (position >= 0 && char === " ");
        var isCharAndShown = (isShown === true && !isWordSeparator);
        var isCharAndHidden = (isShown === false && !isWordSeparator);
        var isWhitespace = (position < 0);

        var spanElement = document.createElement("span");  
        var textElement;
        
        if (isWordSeparator) {
            textElement = document.createTextNode(String.fromCharCode(160));
        } else if (isCharAndShown) {
            textElement = document.createTextNode(char);
        } else if (isCharAndHidden) {
            textElement = document.createTextNode("_" + String.fromCharCode(160));
        } else if (isWhitespace) {
            textElement = document.createTextNode('');
        };

        if (char === " ") {
            if (position >= 0) {
                spanElement.setAttribute("class", "word-separator");
            } else {
                spanElement.setAttribute("class", "whitespace");
            }
            spanElement.setAttribute("style", "text-decoration: none;");
        } else {
            spanElement.setAttribute("id", position );
            spanElement.setAttribute("class", char);
    
            if (isShown) {
                spanElement.setAttribute("style", "text-decoration: none;");
            } else {
                //if (getStylePropertyValue("word-to-guess", "font-family") == "\"Segoe UI\", sans-serif") {
                if (getStylePropertyValue("word-to-guess", "font-family").includes("\"Segoe UI\""))  {
                    spanElement.setAttribute("style", "text-decoration: underline;");
                }
            }
        }
    
        spanElement.appendChild(textElement);  
        document.getElementById("word-to-guess").appendChild(spanElement); 
    
        console.log("html: " + document.getElementById("word-to-guess").innerHTML);
    };

    this.decrementGuesses = function() { this.guessesRemaining--; };


    this.replaceLetter = function (char, position, isShown) {
        //<span id="0" style="text-decoration: none;">X</span><span>&nbsp;</span>
        var spanElement = window.document.getElementById(position);

        spanElement.setAttribute("style", "text-decoration: none;");
        spanElement.innerText = char;
    };

    this.revealLetters = function(char) {
        // get all the characters
        var charArray = window.document.getElementsByClassName(char);

        for (let i=0; i < charArray.length; i++) {
            this.replaceLetter(char, charArray[i].id, true);         // need to draw it in the right place
        }
    };

    // for each occurence of the guessed letter, reveal it
    this.guessedLetter = function(letter) {
        // only evaluate characters we care about
        if (/[a-zA-Z]/.test(letter) && letter.length === 1) {

            // if letter is in the word to guess
            if (this.wordToGuess.indexOf(letter) !== -1) {
               console.log("found it");
               this.revealLetters(letter);
            } else {

                // if the guessed letter has not been entered before, add it to the guesses.  Otherwise, ignore and do not decrease guesses
                if (this.guessedLetters.indexOf(letter) === -1) {

                    this.guessedLetters.push(letter);
                    window.document.querySelector("#guessed-letters").innerHTML = this.guessedLetters.join(', ');

                    this.guessesRemaining--;
                    window.document.querySelector("#guesses-remaining").innerHTML = this.guessesRemaining;
                }

                // if no more guesses left, game is over
                if (this.guessesRemaining === 0 ) {
                    return true;                            //TODO fix this
                }

            }
        }
    };
};

//*******************/
//***  EVENTS     ***/
//*******************/
window.onload = function() {
    myGame.start();                                 // start the game

    //pseudo
    //while loop to play games
        // initialize gamen as empty
        // game start -- listen to key events
        // while not end of game
            //game guess letter
            //update guessed letters and remaining guesses
        // end of game (solved or no guesses remain)
        // update game win, loss
        // if win, give message
        // else if lose, play sound
        // cleanup object
    // next game

};

document.onkeyup = function(event) {
    var key = event.key;

    console.log("Key pressed is: " + key);
    console.log(key);

    key = key.toUpperCase();

    var gameOver = myGame.guessedLetter(key);

    if (gameOver)
    {
        totalGamesPlayed++;
        window.document.querySelector("#total-games-played").innerHTML = totalGamesPlayed;

        // if (gameLoss)
        // {
            totalLosses++;
            window.document.querySelector("#total-losses").innerHTML = totalLosses;
        // } else {                // game won        
        //     totalWins++;
        //     window.document.querySelector("#total-wins").innerHTML = totalWins;
        // }
    }

    //gameReset();              TODO: Clean up object and reset game
};

//*********************/
//***  FUNCTIONS    ***/
//*********************/
function getStylePropertyValue(elemId, prop) {
    var elem = document.getElementById(elemId);
    return window.getComputedStyle(elem).getPropertyValue(prop);
};

function getRenderedFont(elemID) {
    console.log(getStylePropertyValue(elemID, "font-family")); //'Times New Roman'
};

