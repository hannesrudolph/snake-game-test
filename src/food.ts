import { Position } from './types';
import { Snake } from './snake';

/**
 * Food class to manage food generation and positioning
 */
export class Food {
  private position: Position;
  private boardWidth: number;
  private boardHeight: number;

  /**
   * Initialize the food with board dimensions
   * @param boardWidth Width of the game board
   * @param boardHeight Height of the game board
   */
  constructor(boardWidth: number, boardHeight: number) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.position = { x: 0, y: 0 };
    
    // Generate initial position
    this.generateNewPosition();
  }

  /**
   * Get the current food position
   */
  getPosition(): Position {
    return { ...this.position };
  }

  /**
   * Generates a new random position for the food.
   * Ensures the new position is not on the snake's body if a snake object is provided.
   * @param snake Optional. The snake object. Used to avoid placing food on the snake.
   */
  generateNewPosition(snake?: Snake): void {
    let newPosition: Position;
    let isValidPosition = false;

    // Keep generating positions until we find a valid one
    while (!isValidPosition) {
      newPosition = {
        x: Math.floor(Math.random() * this.boardWidth),
        y: Math.floor(Math.random() * this.boardHeight)
      };

      // If snake is provided, make sure food doesn't spawn on the snake
      // Check if the new position is valid (not on the snake)
      isValidPosition = !snake || !snake.isAtPosition(newPosition);
      
      // If position is valid, update the food position
      if (isValidPosition) {
        this.position = newPosition;
      }
    }
  }

  /**
   * Check if the food is at a specific position
   * @param position The position to check
   */
  isAtPosition(position: Position): boolean {
    const { x, y } = position;
    return this.position.x === x && this.position.y === y;
  }
}