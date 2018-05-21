//word bank
var wordBank = ["United Kingdom","Windsor Castle","Duke of Sussex","Prince Harry","St. George Cathedral","Meghan Markle","Duchess of Sussex",
    "Carriage","black-tie","Frogmore House","Jaguar","Queen","Celebreties","Sir Elton John","Ascot Landau","Commonwealth","E190518","Blues and Royals",
    "frockcoat","Veil","page boys","tiara","Duke of Cambridge","best man","Archbishop of Canterbury","St. George's Chapel","Duchess of Cambridge",
    "Prince George","Princess Charlotte","St. George's Hall","Bishop Michael Curry","Doria Ragland","Prince of Wales","Nottingham Cottage","American",
    "Suits","Princess of Wales","fireworks","cocktail ring","Princess Diana","The Royal Navy","British Army","Royal Air Force","parade","Captain Wales",
    "George Clooney","Amal Clooney", "Serena Williams","David Beckham","fashion","modern","diversity"
];

//array with word

//array of guessed letters

//functions:
// -> showGameStats
// -> logGameStats
// -> revealLetter

// objects:
// -> var game = {... }

document.onkeyup = function(event) {
    var key = event.key;

    console.log("Key pressed is: " + key);
    //if key pushed is in the word, then show that letter in the word to guess
        //func: call method to show letter
    //else add the letter to the previous guesses letters 
        //if it hasn't already been added, add it

        //otherwise, do nothing


  }