import { Game } from './game';

/**
 * Main entry point for the Snake game
 */
console.log('Starting Snake Game...');
console.log('Use arrow keys to control the snake. Press Ctrl+C to exit.');
console.log('Game will start in 3 seconds...');

// Give the user a moment to read the instructions before starting
setTimeout(() => {
  // Create and start the game
  const game = new Game();
  game.start();

  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\nGame terminated by user');
    game.end();
    process.exit();
  });

  // Handle game restart
  process.stdin.on('data', (chunk) => {
    const input = chunk.toString().trim().toLowerCase();
    if (input === 'r' && game.getIsGameOver()) {
      console.log('Restarting game...');
      game.end();
      const newGame = new Game();
      newGame.start();
    }
  });
}, 3000);