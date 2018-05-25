//*******************/
//***  VARIABLES  ***/
//*******************/
const MAXGUESSES = 5;

var totalWins = 0;
var totalLosses = 0;
var totalGamesPlayed = 0;

//*******************/
//***  OBJECTS    ***/
//*******************/

// array of objects (category objects with name and wordlist)
var RoyalWeddingCategories = [
    { "name": "All",
      "wordlist": ["United Kingdom","Windsor Castle","Duke of Sussex","Prince Harry","St. George Cathedral","Meghan Markle","Duchess of Sussex",
            "Carriage","black-tie","Frogmore House","Jaguar","Queen Elizabeth II","Celebreties","Ascot Landau","Commonwealth","Blues and Royals",
            "frockcoat","Veil","page boys","tiara","Duke of Cambridge","best man","Archbishop of Canterbury","St. George's Chapel","Duchess of Cambridge",
            "Prince George","Princess Charlotte","St. George's Hall","Bishop Michael Curry","Doria Ragland","Prince of Wales","Nottingham Cottage","American",
            "Suits","Princess of Wales","fireworks","cocktail ring","Princess Diana","The Royal Navy","British Army","Royal Air Force","parade","Captain Wales","fashion","modern","diversity","Prince William","Kensington Palace","Nott Cott","Prince Charles",
            "George Clooney","Amal Clooney", "Serena Williams","David Beckham","Oprah Winfrey","Sir Elton John"] },
    { "name": "Celebrity Attendees",
      "wordlist": ["George Clooney","Amal Clooney", "Serena Williams","David Beckham","Oprah Winfrey","Sir Elton John"] },
    { "name": "Locations",
      "wordlist": ["United Kingdom","Windsor Castle","St. George Cathedral","Frogmore House","St. George's Chapel","St. George's Hall","Nottingham Cottage" ,
            "Kensington Palace","Nott Cott"] },
    { "name": "Royalty",
      "wordlist": ["Prince Harry","Queen Elizabeth II","Prince George","Princess Charlotte","Princess Diana","Prince William","Prince Charles"] }
];

// let's play a game
var myGame = {
    // properties
    selectedCategory: {},
    wordBank: '',
    wordToGuess: '',
    guessesRemaining: 0,
    guessedLetters: [],
    numLettersMatched: 0,
    gameIsOver: false,
    
    ////////////////////
    // methods
    ////////////////////
    start: function (categories) {
        this.selectedCategory = categories[Math.floor(Math.random() * categories.length)];                          // randomly select a category
        this.wordBank = this.selectedCategory.wordlist;   
        this.wordToGuess = this.wordBank[Math.floor(Math.random() * this.wordBank.length)].toUpperCase();           // randomly choose a word from the word bank
        this.guessesRemaining = MAXGUESSES;

        this.guessedLetters = [];
        this.numLettersMatched = 0;
        this.gameIsOver = false;

        console.log(this.wordToGuess);

        // add special characters and word breaks to the number of letters matched
        var nonLetterChars = 0;


        this.numLettersMatched += nonLetterChars;
        
        //**********************************************************************TODO somewhere need to count the spaces in the word and the special characters******************
        // if (/[.']/.test(word[j]) || (position >= 0 && word[j] === " ")) { myGame.numLettersMatched++; };
        // var reg = new RegExp(/[.']/, 'g');
        // var count = (this.wordToGuess.match(reg) || []).length;       // get number of letters in word


        return this.wordToGuess;
    },

    // helpers
    anyGuessesLeft: function() { return (this.guessesRemaining > 0) ? true : false; },
    isGameSolved: function() { return (this.numLettersMatched === this.wordToGuess.length) ? true : false; },
    gameOver: function() { return (!this.anyGuessesLeft() || this.isGameSolved()) ? true : false; },

    // main actions
    guessLetter: function(letter) {
        var foundLetter = (this.wordToGuess.indexOf(letter) === -1) ? false : true;
        if (foundLetter) {
            var re = new RegExp(letter, 'g');
            var count = (this.wordToGuess.match(re) || []).length;       // get number of letters in word
        }
        
        if (foundLetter) {
            this.numLettersMatched += count;
            console.log("Counts of this letter: " + count);
            console.log("Number of letters matched: " + this.numLettersMatched);
            console.log("Number of letters in word: " + this.wordToGuess.length);
        } else {
            // if the guessed letter has not been entered before, add it to the guesses.  Otherwise, ignore and do not decrease guesses
            if (this.guessedLetters.indexOf(letter) === -1) {
                this.guessedLetters.push(letter);
            }
        }

        return foundLetter;
    }
};

//*******************/
//***  FUNCTIONS  ***/
//*******************/
function drawLetter (char, position, isShown) {
    //Unshown Letter -->  <span id="0" style="text-decoration: underline;">_&nbsp;</span>   <span class="whitespace">&nbsp;</span>
    //Shown Letter -->  <span id="0" style="text-decoration: none;">X</span>                <span class="whitespace">&nbsp;</span>
    //Word Separator --> <span class="word-separator" style="text-decoration: none;">&nbsp;</span>
    //Whitespace --> <span class="whitespace" style="text-decoration: none;"></span>

    var wordtoguessElem = document.getElementById("word-to-guess");
    var isWordSeparator = (position >= 0 && char === " ");
    var isCharAndShown = (isShown === true && !isWordSeparator);
    var isCharAndHidden = (isShown === false && !isWordSeparator);
    var isWhitespace = (position < 0);
    var isSpecialChar = (/[.']/.test(char));

    var spanElement = document.createElement("span");  
    var textElement;
    
    if (isWordSeparator) { 
        textElement = document.createTextNode(String.fromCharCode(160));
    } else if (isCharAndShown || isSpecialChar) {
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

        if (isShown || isSpecialChar) {
            spanElement.setAttribute("style", "text-decoration: none;");
        } else {
            //if (getStylePropertyValue("word-to-guess", "font-family") == "\"Segoe UI\", sans-serif") {
            if (getStylePropertyValue(wordtoguessElem, "font-family").includes("\"Segoe UI\""))  {
                spanElement.setAttribute("style", "text-decoration: underline;");
            }
        }
    }

    spanElement.appendChild(textElement);  
    wordtoguessElem.appendChild(spanElement); 

    //console.log("html: " + wordtoguessElem.innerHTML);
};

function showSolvedWord(word) {
    // clear portion solved and redraw it.
    var node = document.getElementById("word-to-guess");
    node.innerHTML = '';

    // add leading space at front of word and trailing space after each letter
    for (let j = 0; j < word.length; j++) {
        if (j===0) { drawLetter(String.fromCharCode(160), -1, true); };
        drawLetter(word[j], j, true);
        drawLetter(String.fromCharCode(160), -1, true);
    }
};

function showStartWord(word) {
    // add leading space at front of word and trailing space after each letter
    for (let j = 0; j < word.length; j++) {
        if (j===0) { drawLetter(" ", -1, true); };
        drawLetter(word[j], j, false);
        drawLetter(" ", -1, true);
    }
};

function getStylePropertyValue(elemId, prop) {
    var elem = document.getElementById(elemId);
    return window.getComputedStyle(elemId).getPropertyValue(prop);
};

//*******************/
//***  EVENTS     ***/
//*******************/
window.onload = function() {
        // clear portion solved and redraw it.
        var node = document.getElementById("word-to-guess");
        console.log(getStylePropertyValue(node, "font-family"));
        node.innerHTML = '';

        var word = myGame.start(RoyalWeddingCategories);

        showStartWord(word);
        //showSolvedWord(word);
}

document.onkeyup = function(event) {
    var key = event.key;
    key = key.toUpperCase();

    console.log("Key pressed is: " + key);
    console.log(key);

    /////////////////////////////////////////////
    // only evaluate characters we care about
    /////////////////////////////////////////////
    if (/[a-zA-Z]/.test(key) && key.length === 1) {

        ////////////////////////
        // if letter is found
        ////////////////////////
        if (myGame.guessLetter(key)) {

            var charArray = window.document.getElementsByClassName(key);

            ////////////////////////////////////////
            // update html and guessed letters
            ////////////////////////////////////////
            for (let i=0; i < charArray.length; i++) {                                              // show letter
                //<span id="0" style="text-decoration: none;">X</span><span>&nbsp;</span>
                var spanElement = window.document.getElementById(charArray[i].id);

                spanElement.setAttribute("style", "text-decoration: none;");
                spanElement.innerText = key;
            }

        } else {                                    // letter not found

            myGame.guessesRemaining--;
            window.document.querySelector("#guesses-remaining").innerHTML = myGame.guessesRemaining;
            window.document.querySelector("#guessed-letters").innerHTML = myGame.guessedLetters.join(', ');

        }

    }

    ///////////////
    // Game Over
    ///////////////
    if (myGame.gameOver())
    {
        var newWord;

        if (myGame.isGameSolved()) {
            totalWins++;
            window.document.querySelector("#total-wins").innerHTML = totalWins;
        } else {
            totalLosses++;
            window.document.querySelector("#total-losses").innerHTML = totalLosses;
        }

        totalGamesPlayed++;
        window.document.querySelector("#total-games-played").innerHTML = totalGamesPlayed;

        /////////////////////
        // Reset Game
        var node = document.getElementById("word-to-guess");
        node.innerHTML = '';
        myGame.length = 0;

        newWord = myGame.start(RoyalWeddingCategories);
        showStartWord(newWord);

        window.document.querySelector("#guessed-letters").innerHTML = myGame.guessedLetters.join(', ');
        window.document.querySelector("#guesses-remaining").innerHTML = myGame.guessesRemaining;
    }

};

    //while loop to play games
        // initialize game as empty
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
