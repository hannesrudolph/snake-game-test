import { Position, CellType, GameConfig } from './types';
import { Snake } from './snake';
import { Food } from './food';
import chalk from 'chalk';

/**
 * Renderer class to handle terminal rendering of the game
 */
export class Renderer {
  private width: number;
  private height: number;
  private board: CellType[][];

  /**
   * Initialize the renderer with game configuration
   * @param config Game configuration
   */
  constructor(config: GameConfig) {
    this.width = config.width;
    this.height = config.height;
    this.board = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(CellType.EMPTY)
    );
  }

  /**
   * Clear the terminal screen
   */
  clearScreen(): void {
    // Use ANSI escape codes to clear the screen and move cursor to top-left
    process.stdout.write('\x1Bc');
  }

  /**
   * Update the board state with current game entities
   * @param snake The snake object
   * @param food The food object
   */
  updateBoard(snake: Snake, food: Food): void {
    // Reset the board
    this.board = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(CellType.EMPTY)
    );

    // Add walls (border)
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (x === 0 || x === this.width - 1 || y === 0 || y === this.height - 1) {
          this.board[y][x] = CellType.WALL;
        }
      }
    }

    // Add food
    const foodPos = food.getPosition();
    if (foodPos.x >= 0 && foodPos.x < this.width && foodPos.y >= 0 && foodPos.y < this.height) {
      this.board[foodPos.y][foodPos.x] = CellType.FOOD;
    }

    // Add snake
    const snakeBody = snake.getBody();
    for (const segment of snakeBody) {
      if (segment.x >= 0 && segment.x < this.width && segment.y >= 0 && segment.y < this.height) {
        this.board[segment.y][segment.x] = CellType.SNAKE;
      }
    }
  }

  /**
   * Render the game board to the terminal
   */
  render(): void {
    let output = '';

    // Render each cell of the board
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        switch (this.board[y][x]) {
          case CellType.EMPTY:
            output += ' ';
            break;
          case CellType.SNAKE:
            output += chalk.green('█');
            break;
          case CellType.FOOD:
            output += chalk.red('●');
            break;
          case CellType.WALL:
            output += chalk.blue('█');
            break;
        }
      }
      output += '\n';
    }

    // Print the rendered board
    process.stdout.write(output);
  }

  /**
   * Display the score and other game information
   * @param score Current score
   * @param speed Current game speed
   */
  displayInfo(score: number, speed: number): void {
    console.log(`Score: ${chalk.yellow(score)} | Speed: ${chalk.yellow(speed)}ms`);
    console.log('Controls: Arrow Keys to move, Ctrl+C to exit');
  }

  /**
   * Display game over message
   * @param score Final score
   */
  displayGameOver(score: number): void {
    console.log(chalk.red('\nGAME OVER'));
    console.log(`Final Score: ${chalk.yellow(score)}`);
    console.log('Press Ctrl+C to exit');
  }
}