import { Direction, Position } from './types';

/**
 * Snake class to manage snake's position, movement, and growth
 */
export class Snake {
  private body: Position[] = [];
  private direction: Direction = Direction.RIGHT;
  private growthPending: number = 0;
  private canMove: boolean = true;

  /**
   * Initialize the snake with a starting position
   * @param startX Starting X coordinate
   * @param startY Starting Y coordinate
   * @param initialLength Initial length of the snake
   */
  constructor(startX: number, startY: number, initialLength: number = 3) {
    // Create the initial snake body
    for (let i = 0; i < initialLength; i++) {
      this.body.push({ x: startX - i, y: startY });
    }
  }

  /**
   * Get the current snake body segments
   */
  getBody(): Position[] {
    return [...this.body];
  }

  /**
   * Get the snake's head position
   */
  getHead(): Position {
    return { ...this.body[0] };
  }

  /**
   * Set the snake's direction
   * @param newDirection The new direction
   */
  setDirection(newDirection: Direction): void {
    // Prevent 180-degree turns (can't go directly opposite)
    if (
      (this.direction === Direction.UP && newDirection === Direction.DOWN) ||
      (this.direction === Direction.DOWN && newDirection === Direction.UP) ||
      (this.direction === Direction.LEFT && newDirection === Direction.RIGHT) ||
      (this.direction === Direction.RIGHT && newDirection === Direction.LEFT)
    ) {
      return;
    }
    
    this.direction = newDirection;
  }

  /**
   * Get the current direction
   */
  getDirection(): Direction {
    return this.direction;
  }

  /**
   * Move the snake in its current direction
   */
  move(): void {
    if (!this.canMove) {
      this.canMove = true;
      return;
    }
    this.canMove = false;
    const head = this.getHead();
    let newHead: Position;
    console.log("Snake head position:", head);

    // Calculate new head position based on direction
    switch (this.direction) {
      case Direction.UP:
        newHead = { x: head.x, y: head.y - 1 };
        break;
      case Direction.DOWN:
        newHead = { x: head.x, y: head.y + 1 };
        break;
      case Direction.LEFT:
        newHead = { x: head.x - 1, y: head.y };
        break;
      case Direction.RIGHT:
        newHead = { x: head.x + 1, y: head.y };
        break;
    }

    // Add new head to the beginning of the body
    this.body.unshift(newHead);

    // Remove the tail unless growth is pending
    if (this.growthPending > 0) {
      this.growthPending--;
    } else {
      this.body.pop();
    }
  }

  /**
   * Grow the snake by a specified amount
   * @param amount Number of segments to grow
   */
  grow(amount: number = 1): void {
    this.growthPending += amount;
  }

  /**
   * Check if the snake is colliding with itself
   */
  isCollidingWithSelf(): boolean {
    const head = this.getHead();
    
    // Check if head position matches any body segment (excluding the head)
    return this.body.slice(1).some(segment => 
      segment.x === head.x && segment.y === head.y
    );
  }

  /**
   * Check if the snake is at a specific position
   * @param position The position to check
   */
  isAtPosition(position: Position): boolean {
    return this.body.some(segment => 
      segment.x === position.x && segment.y === position.y
    );
  }

  /**
   * Get the length of the snake
   */
  getLength(): number {
    return this.body.length;
  }
}