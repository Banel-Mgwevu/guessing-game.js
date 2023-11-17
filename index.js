const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function startGame(min, max, maxAttempts, hints) {
  const secretNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let attempts = 0;

  function askQuestion() {
    rl.question(`Guess the number (between ${min} and ${max}). You have ${hints} hints left. Attempts left: ${maxAttempts - attempts}. Enter your guess: `, (userInput) => {
      const userNumber = parseInt(userInput);

      if (isNaN(userNumber)) {
        console.log('Please enter a valid number.');
        askQuestion();
        return;
      }

      attempts++;

      if (userNumber === secretNumber) {
        console.log(`Congratulations! You've guessed the number ${secretNumber} in ${attempts} attempts.`);
        rl.close();
        return;
      } else if (attempts === maxAttempts) {
        console.log(`Sorry, you've run out of attempts. The secret number was ${secretNumber}. Better luck next time!`);
        rl.close();
        return;
      } else if (userNumber < secretNumber) {
        console.log('Too low!');
      } else {
        console.log('Too high!');
      }

      if (hints > 0) {
        if (hints === 1) {
          console.log(`Hint: The secret number ends with ${secretNumber % 10}`);
        } else {
          console.log(`Hint: ${hints} hints left.`);
        }
      }

      askQuestion();
    });
  }

  console.log(`Welcome to the Number Guessing Game (Range: ${min}-${max}, Attempts: ${maxAttempts}, Hints: ${hints})`);
  askQuestion();
}

function selectDifficulty() {
  rl.question('Select the difficulty level (easy, medium, hard): ', (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy':
        startGame(1, 50, 8, 2);
        break;
      case 'medium':
        startGame(1, 100, 6, 1);
        break;
      case 'hard':
        startGame(1, 200, 4, 0);
        break;
      default:
        console.log('Invalid difficulty level. Please choose from easy, medium, or hard.');
        selectDifficulty();
        break;
    }
  });
}

console.log('Welcome to the Number Guessing Game!');
console.log('Choose the difficulty level: easy, medium, or hard.');

selectDifficulty();
