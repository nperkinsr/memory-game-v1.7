// ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
// ⭐ THE SOUND EFFECTS ⭐
// ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥ ♥
function playCorrectSound() {
    var correctAudio = new Audio('sounds/success.wav');
    correctAudio.play();
  }
  
  function playIncorrectSound() {
    var incorrectAudio = new Audio('sounds/seedsShake.wav');
    incorrectAudio.play();
  }
  
  function playCardRevealSound() {
    var revealAudio = new Audio('sounds/cardFlip.wav'); 
    revealAudio.play();
  }
  
  function playGoodJobSound() {
    var revealAudio = new Audio('sounds/goodJob.wav'); 
    revealAudio.play();
  }
  
  function playWowSound() {
    var revealAudio = new Audio('sounds/wow.wav'); 
    revealAudio.play();
  }
  
  function playGameOverSound() {
    var revealAudio = new Audio('sounds/drumEffect.wav'); 
    revealAudio.play();
  }