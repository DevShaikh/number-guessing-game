// Game Values
let min = 1,
    max = 10,
    winNum = getRandomWinNum(min, max),
    guessLeft = 3;

// UI Elements
const game = document.querySelector('#game'),
      gameCard = document.querySelector('#card'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('#msg');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again
gameCard.addEventListener('mousedown', (e) => {
  if(e.target.className.includes('play-again')) {
    window.location.reload();
  }
})

// Listen for guess
game.addEventListener('submit', (e) => {
  let guess = parseInt(guessInput.value);

  // Validate
  if(isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter number between ${min} and ${max}`, 'red')
  } else {
    // Check if Won
    if(guess === winNum) {
      // Game Over - Won
      gameOver(true, `${winNum} is correct, You Win!`)
    } else {
      guessLeft -= 1;
  
      if(guessLeft === 0) {
        // Game Over - Lost
        gameOver(false, `You Lost!, Correct number was ${winNum}`)
      } else {
        // Game Continues - Try Again
        // Set Message
        setMessage(`${guess} is wrong, ${guessLeft} guesses left`, 'red');
        // Clear Input
        guessInput.value = '';
      }
    }
  }
  

  e.preventDefault()
})
// Game Over
function gameOver(won, msg) {
  let color;
  won === true ? color = 'green' : color = 'red'

  // Change text color
  message.style.color = color
  // Change border color
  guessInput.style.borderColor = color;
  // Change box shadow
  guessInput.style.boxShadow = '0px 0px 4px ' + color;
  // Disable Input
  guessInput.disabled = true;
  // Reset Input
  guessInput.value = '';

  setMessage(msg)

  // Play Again
  guessBtn.value = 'Play Again'
  guessBtn.className += ' play-again'
}

// Get Random Winning Number
function getRandomWinNum(min, max) {
  return Math.floor(Math.random()*(max - min + 1) + min)
}

// Set Message
function setMessage(msg, color) {
  message.textContent = msg;
  message.style.color = color
  guessInput.style.borderColor = color;
  guessInput.style.boxShadow = '0px 0px 4px ' + color;
}