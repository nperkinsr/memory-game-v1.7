
function superSecret() {
  // What are you doing looking at my code ???! 
  // It's fine... I'm not angry, just disappointed... 
  // I always kinda knew YOU specifically were going to see this
  //It is not a surprise, but still... such a disappointment

}

// ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
// ⭐ GLOBAL VARIABLES ⭐
// ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥

var relaxMode = false;
var movements = 0;
var timer;

var array1 = ["Card01.png", "Card02.png", "Card03.png"];
var array2 = ["Card04.png", "Card05.png", "Card06.png"];
var array3 = ["Card07.png", "Card08.png", "Card09.png"];
var array4 = ["Card10.png", "Card11.png", "Card12.png"];
var array5 = ["Card13.png", "Card14.png", "Card15.png"];

var totalCards = [array1, array2, array3, array4, array5];

var currentLevel = 0;

var levels = [
  {
    cards: totalCards[0],

    maxMovements: 6,
    duration: 30
  },
  {
    cards: totalCards[0].concat(
      totalCards[1]
   ),
    maxMovements: 12,
    duration: 45
  },
  {
    cards: totalCards[0].concat(
      totalCards[1],
      totalCards[2]
   ),
    maxMovements: 20,
    duration: 60
  },
  {
    cards: totalCards[0].concat(
      totalCards[1],
      totalCards[2],
      totalCards[3]
    ),
    maxMovements: 30,
    duration: 80
  },
  {
    cards: totalCards[0].concat(
      totalCards[1],
      totalCards[2],
      totalCards[3],
      totalCards[4]
    ),
    maxMovements: 36,
    duration: 100
  }
];

// ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
// ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
// ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥

// SHUFFLE THE CARDS
function shuffleCards(theCards) {
  var outcome;  
  var totalCards = theCards.concat(theCards.slice());
  outcome = totalCards.sort(function() { 
    return 0.5 - Math.random();  
  });
  return outcome; 
}

// DISTRIBUTES THE CARDS ON THE TABLE
function dealCards(theCards) { 
  var table = document.querySelector("#table"); 
  table.innerHTML = ""; 
  var shuffledCards = shuffleCards(theCards);  
  shuffledCards.forEach(function (e) {  
    var card = document.createElement("div"); 
    card.classList.add("card");
    card.innerHTML = 
      "<div class='contentCard'>" +
      "<img src='css/cards/" + e + "' />" +
      "</div>";
    table.appendChild(card); 
  });

  document.querySelectorAll(".card").forEach(function (card) {
    card.addEventListener("click", revealCard);
  });
}

// REVEALS THE CARDS ON CLICK
function revealCard() {
  var revealed;  
  var pendingCards;
  var totalUncovered = document.querySelectorAll(".uncoverCard:not(.correct"); 

  if (totalUncovered.length > 1) { 
    return;  
  }

  this.classList.add("uncoverCard"); 
  playCardRevealSound(); 

  revealed = document.querySelectorAll(".uncoverCard:not(.correct"); 
  if (revealed.length < 2) { 
    return; 
  }

compareCards(revealed);
updateCounter();

pendingCards = document.querySelectorAll(".card:not(.correct");
if (pendingCards.length === 0) {
  setTimeout(finish, 1500);
}
}

// COMPARES THE TWO REVEALED CARDS TO CHECK IF THEY MATCH
function compareCards(cardsToCompare) { 
  var imageSource1 = cardsToCompare[0].querySelector(".card img").src; 
  var imageSource2 = cardsToCompare[1].querySelector(".card img").src; 

  if (imageSource1 === imageSource2) {  
    correct(cardsToCompare); 
  } else {
    incorrect(cardsToCompare); 
  }
}

// IF THE CARDS MATCH
function correct (theCards) {
  theCards.forEach(function(e) { 
    e.classList.add("correct"); 
  });
  if (movements < levels[currentLevel].maxMovements){
  setTimeout(function () { 
    playCorrectSound();
  }, 500);
}
}

// IF THE CARDS DON'T MATCH
function incorrect(theCards) {    
  theCards.forEach(function (e) {
    setTimeout(function () {
      e.classList.remove("uncoverCard");
      e.classList.add("incorrect");

      setTimeout(function () {
        e.classList.remove("incorrect");
      }, 200); 

    }, 800); 
  });
  if (movements < levels[currentLevel].maxMovements){
  setTimeout(function () {
    playIncorrectSound();
  }, 1000);
}
}

// TIMER
function startTimer(duration) {
  var seconds = duration;
  var minutes = 0;
  var secondsText;
  var minutesText;

  function updateTimer() {
    seconds = seconds - 1;
    if (seconds < 0) {
      seconds = 59;
      minutes = minutes - 1;
    }
    if (minutes < 0) {
      seconds = 0;
      minutes = 0;
      clearInterval(timer);
      timeOver();
    }
    secondsText = seconds;
    minutesText = minutes;
    if (seconds < 10) {
      secondsText = "0" + seconds;
    }
    if (minutes < 10) {
      minutesText = "0" + minutes;
    }
    document.querySelector('#minutes').innerText = minutesText;
    document.querySelector('#seconds').innerText = secondsText;
  }
  
  // Clear the previous timer, if any
  clearInterval(timer);
  // Start the new timer
  timer = setInterval(updateTimer, 1000);
}

// MOVEMENT COUNTER
function updateCounter () {
var movementsText;
movements++;  
movementsText = movements;

if (movements > levels[currentLevel].maxMovements && !relaxMode) {
  gameOver();
  return;
}

if (movements < 10) {
  movementsText = "0" + movements;
}
document.querySelector("#mov").innerText = movementsText;
}

function counterMax() {
  var maxMovementsText = levels[currentLevel].maxMovements;
  if (maxMovementsText < 10) {
    maxMovementsText = "0" + maxMovementsText;
  }
document.querySelector("#total-movements").innerText = maxMovementsText;
}

// LEVELING UP
function levelUp() {
currentLevel++;
}

function updateLevel() {
var levelText = currentLevel + 1;
if (levelText < 10) {
  levelText = "0" + levelText;
}
document.querySelector("#level").innerText = levelText;
}

function loadNextLevel() {
levelUp();
updateLevel();
start();
}

// START
function start() {
  var levelDuration = levels[currentLevel].duration;
  movements = 0; // It was not working when it was 'var movements'
  dealCards(levels[currentLevel].cards); 
  document.querySelector("#mov").innerText = "00";
  counterMax();

  // Reset the timer display
  var minutesText = Math.floor(levelDuration / 60);
  var secondsText = levelDuration % 60;
  if (secondsText < 10) {
    secondsText = "0" + secondsText;
  }
  document.querySelector("#minutes").innerText = minutesText < 10 ? "0" + minutesText : minutesText;
  document.querySelector("#seconds").innerText = secondsText;

  document.querySelector(".select-level").classList.remove("visible");
  document.querySelector("#levelUp").classList.remove("visible");
  document.querySelector("#gameFinished").classList.remove("visible");
  document.querySelector("#gameOver").classList.remove("visible");
  document.querySelector("#timeOver").classList.remove("visible");

  document.querySelectorAll(".card").forEach(function (e) {
    e.addEventListener("click", revealCard);
  });

  if (relaxMode === false) {
    startTimer(levelDuration);
  } else {
    document.querySelector("#timer").classList.add("hidden-timer");
  }
}

function restart() {
  currentLevel = 0;
  updateLevel();
  start();
}

function startNormalGame() {
  relaxMode = false;
  document.querySelector("#welcome").classList.remove("visible");
  start();
  document.querySelector(".select-level").classList.add("hidden-control");
  document.querySelector("#level-control").classList.add("hidden-control");
}

function startRelaxGame() {
  relaxMode = true;
  document.querySelector("#welcome").classList.remove("visible");
  start();
  document.querySelector(".select-level").classList.remove("hidden-control");
  document.querySelector("#level-control").classList.remove("hidden-control");
}

// FINISH 
function finish() {
    if (currentLevel < levels.length - 1) {
      if (movements <= levels[currentLevel].maxMovements) {
        document.querySelector("#levelUp").classList.add("visible");
        playWowSound();
      }
    } else {
      document.querySelector("#gameFinished").classList.add("visible");
      playGoodJobSound();
    }
}

// GAME OVER
function gameOver() {
  clearInterval(timer);
  document.querySelector("#gameOver").classList.add("visible");
  playGameOverSound();
}

// TIME OVER
function timeOver() {
  // Show timeOver modal only if not in Relax Mode
  if (!relaxMode) {
    document.querySelector("#timeOver").classList.add("visible");
    playGameOverSound();
  }
}

// LEVELS MENU
function writeLevels() {
  var levelsMenu = document.querySelector(".select-level ul");
  levels.forEach(function (element, index) {
    var levelControl = document.createElement("li");
    levelControl.innerHTML =
      "<button class='level' data-level='" + index + "'>Level " + (index + 1) + "</button>";
    levelControl.addEventListener("click", changeLevel);
    levelsMenu.appendChild(levelControl);
  });
}

function toggleLevelsMenu() {
  document.querySelector(".select-level").classList.toggle("visible", relaxMode);
}

function changeLevel() {
  var level = parseInt(this.getAttribute("data-level"), 10); 
  if (isNaN(level)) {
    console.error("Invalid level:", this.getAttribute("data-level"));
    return;
  }

  currentLevel = level;
  updateLevel();
  start();
  hideLevelsMenu();
}

function showLevelsMenu(event) {
  event.stopPropagation();
  toggleLevelsMenu(); 
}

function hideLevelsMenu() {
  document.querySelector(".select-level").classList.remove("visible", relaxMode); 
}

function clickOutOfMenu(event) {
  if (event.target.closest(".select-level")) {
    return;
  }
  document.querySelector(".select-level").classList.remove("visible");
}

function escKeyCloseMenu(event) {
  if (event.key === "Escape") {
    hideLevelsMenu();
  }
}


start();

writeLevels();


document.querySelectorAll(".restart").forEach(function(e) {
  e.addEventListener("click", restart);
});

document
  .querySelector("#normal-game")
  .addEventListener("click", startNormalGame);
document
  .querySelector("#relaxed-game")
  .addEventListener("click", startRelaxGame);

  document
  .querySelector("#level-control")
  .addEventListener("click", showLevelsMenu);
document
  .querySelector("#close-levels")
  .addEventListener("click", hideLevelsMenu);

document.querySelectorAll(".level").forEach(function(e) {
  e.addEventListener("click", changeLevel);
});

document.querySelector("#up").addEventListener("click", loadNextLevel);

document.querySelector("body").addEventListener("click", clickOutOfMenu);

document.addEventListener("keydown", escKeyCloseMenu);


document.querySelector("#welcome").classList.add("visible");