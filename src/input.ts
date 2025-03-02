import * as readline from 'readline';
import { Direction } from './types';
import { Game } from './game';

/**
 * Input handler class to manage keyboard input
 */
export class InputHandler {
  private direction: Direction = Direction.RIGHT;
  private isRunning: boolean = true;
  private readline: readline.Interface;
  private game: Game | null = null;

  /**
   * Initialize the input handler
   */
  constructor() {
    // Configure terminal for raw input mode
    readline.emitKeypressEvents(process.stdin);
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(true);
    }

    // Create readline interface
    this.readline = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Set up keypress event listener
    this.setupKeyHandlers();
  }

  /**
   * Set up keyboard event handlers
   */
  private setupKeyHandlers(): void {
    process.stdin.on('keypress', (str, key) => {
      // Handle exit (ctrl+c)
      if (key.ctrl && key.name === 'c') {
        this.isRunning = false;
        this.cleanup();
        process.exit();
      }

      // Handle direction keys
      switch (key.name) {
        case 'up':
          this.direction = Direction.UP;
          break;
        case 'down':
          this.direction = Direction.DOWN;
          break;
        case 'left':
          this.direction = Direction.LEFT;
          break;
        case 'right':
          this.direction = Direction.RIGHT;
          break;
      }
      // Handle pause (p key)
      if (key.name === 'p') {
        this.togglePause();
      }
    });
  }

  /**
   * Get the current direction
   */
  getDirection(): Direction {
    return this.direction;
  }

  /**
   * Check if the game is still running
   */
  getIsRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Set the game running state
   */
  setIsRunning(isRunning: boolean): void {
    this.isRunning = isRunning;
  }

  /**
   * Clean up resources when the game ends
   */
  cleanup(): void {
    this.readline.close();
    if (process.stdin.isTTY) {
      process.stdin.setRawMode(false);
    }
  }

  resetGame(): void {
    this.direction = Direction.RIGHT;
    this.isRunning = true;
  }

  setGame(game: Game): void {
    this.game = game;
  }

  togglePause(): void {
    if (this.game) {
      this.game.isPaused = !this.game.isPaused;
    }
  }
}