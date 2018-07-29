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
        this.foundLetters = [];
        this.numLettersMatched = 0;
        this.gameIsOver = false;

        console.log(this.wordToGuess);

        // count the number of special characters as total letters matched
        const nonLetterChars = (str) => {
            const re = /[.']/g
            return ((str || '').match(re) || []).length
        }
        this.numLettersMatched += nonLetterChars(this.wordToGuess);
        
        // count the number of spaces and add to total letters matched
        this.numLettersMatched += this.wordToGuess.split(" ").length-1;

        return this.wordToGuess;
    },

    // helpers
    anyGuessesLeft: function() { return (this.guessesRemaining > 0) ? true : false; },
    isGameSolved: function() { return (this.numLettersMatched === this.wordToGuess.length) ? true : false; },
    gameOver: function() { return (!this.anyGuessesLeft() || this.isGameSolved()) ? true : false; },

    // main actions
    guessLetter: function(letter) {
        console.log("Total letters matched so far: " + this.numLettersMatched);

        // if letter was found previously, don't add it again, just return

        var foundLetter = (this.wordToGuess.indexOf(letter) === -1) ? false : true;
        
        if (foundLetter) {
            var re = new RegExp(letter, 'g');
            var count = (this.wordToGuess.match(re) || []).length;       // get number of letters in word
        }

        // if the guessed letter has not been entered before, handle it.  Otherwise, ignore and do not update anything
        if (this.guessedLetters.indexOf(letter) === -1) {
            // if found letter and this letter is not previously found
            if (foundLetter && this.foundLetters.indexOf(letter) === -1) {
                this.numLettersMatched += count;
                console.log("Counts of this letter: " + count);
                console.log("Number of letters matched: " + this.numLettersMatched);
                console.log("Number of letters in word: " + this.wordToGuess.length);
                this.foundLetters.push(letter);
            } else if (!foundLetter) {
                this.guessedLetters.push(letter);
            }
        }

        return foundLetter;
    },

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
    var isWhitespace = (position < 0 && char === " ");
    var isCharAndShown = (isShown === true && !isWordSeparator && !isWhitespace);
    var isCharAndHidden = (isShown === false && !isWordSeparator && !isWhitespace);
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
        textElement = document.createTextNode(String.fromCharCode(160));
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

    console.log("html: " + wordtoguessElem.innerHTML);
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
        document.onkeyup = playGame;
        //showSolvedWord(word);

        startFireworks();
        loop();
}

function playGame (event) {
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
        var feedbk = window.document.querySelector("#press-any-key");

        document.onkeyup = null;

        // hide the stats
        var x = document.getElementById("guess-stats");
        x.setAttribute("hidden", true);
        var y = document.getElementById("game-stats");
        y.setAttribute("hidden", true);

        if (myGame.isGameSolved()) {
            feedbk.innerHTML = "You Win!";
            //feedbk.setAttribute("style","font-size: 3rem");

            totalWins++;
            window.document.querySelector("#total-wins").innerHTML = totalWins;
        } else {
            feedbk.innerHTML = "Awwww... Try Again!<br>The answer was " + myGame.wordToGuess;
            //feedbk.setAttribute("style","font-size: 3rem");
            
            totalLosses++;
            window.document.querySelector("#total-losses").innerHTML = totalLosses;
        }

        totalGamesPlayed++;
        window.document.querySelector("#total-games-played").innerHTML = totalGamesPlayed;

        // show results for 3 seconds and then reset game
        setTimeout(function() {
            // Change the text here
            feedbk.innerHTML = "Press any key to get started!";

            // show stats again
            var x = document.getElementById("guess-stats");
            x.removeAttribute("hidden");
            var y = document.getElementById("game-stats");
            y.removeAttribute("hidden");

            /////////////////////
            // Reset Game
            var node = document.getElementById("word-to-guess");
            node.innerHTML = '';
            myGame.length = 0;

            //feedbk.setAttribute("style","font-size: 1.25rem");

            newWord = myGame.start(RoyalWeddingCategories);
            //feedbk.innerHTML = "Press any key to get started!";
            showStartWord(newWord);
            document.onkeyup = playGame;

            window.document.querySelector("#guessed-letters").innerHTML = myGame.guessedLetters.join(', ');
            window.document.querySelector("#guesses-remaining").innerHTML = myGame.guessesRemaining;

        }, 3000);
    }

};

////////////////////////////////////////////
// Experiment with creating fireworks
////////////////////////////////////////////
var bgFirework;

function startFireworks () {
    var canvasTest = document.getElementById("overlay");

    //jc add to show the canvas
    canvasTest.setAttribute("style", "display: block; opacity: .5;");

    // var ctx = canvasTest.getContext("2d");
  
    //testing background display            TODO remove next 4 lines of testing
    // ctx.fillStyle = "rgb(200,0,0)";
    // ctx.fillRect (10, 10, 55, 50);
  
    // ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
    // ctx.fillRect (30, 30, 55, 50);

    bgFirework = "url(" + canvasTest.toDataURL() + ")";
};