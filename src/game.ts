import { GameConfig, DEFAULT_CONFIG, Direction, Position } from './types';
import { Snake } from './snake';
import { Food } from './food';
import { Renderer } from './renderer';
import { InputHandler } from './input';

/**
 * Game class to manage the game state and coordinate between components
 */
export class Game {
  private config: GameConfig;
  private snake: Snake;
  private food: Food;
  private renderer: Renderer;
  private inputHandler: InputHandler;
  private score: number = 0;
  private speed: number;
  private gameLoopInterval: NodeJS.Timeout | null = null;
  private isGameOver: boolean = false;
  private isPaused: boolean = false;

  public getIsPaused(): boolean {
    return this.isPaused;
  }

  public getIsGameOver(): boolean {
    return this.isGameOver;
  }

  /**
   * Initialize the game with optional custom configuration
   * @param config Optional custom game configuration
   */
  constructor(config: Partial<GameConfig> = {}) {
    // Merge default config with any provided custom config
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.speed = this.config.initialSpeed;

    // Initialize game components
    this.snake = new Snake(
      Math.floor(this.config.width / 2),
      Math.floor(this.config.height / 2)
    );
    this.food = new Food(this.config.width, this.config.height);
    this.renderer = new Renderer(this.config);
    this.inputHandler = new InputHandler();
    this.inputHandler.setGame(this);

    // Make sure food doesn't spawn on the snake initially
    this.food.generateNewPosition(this.snake);
  }

  /**
   * Start the game
   */
  start(): void {
    if (this.config.width <= 0 || this.config.height <= 0) {
      console.error('Invalid board dimensions. Game not started.');
      return;
    }
    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
    }

    // Set up the game loop
    this.gameLoopInterval = setInterval(() => {
      this.update();
      this.render();

      if (this.isGameOver) {
        this.end();
      }
    }, this.speed);
  }

  /**
   * Update the game state
   */
  private update(): void {
    if (this.isGameOver || !this.inputHandler.getIsRunning() || this.isPaused) {
      return;
    }

    // Update snake direction based on input
    this.snake.setDirection(this.inputHandler.getDirection());

    // Move the snake
    this.snake.move();
    console.log('Snake position:', this.snake.getHead());

    // Check for collisions with walls
    const head = this.snake.getHead();
    if (
      head.x <= 0 || 
      head.x >= this.config.width - 1 || 
      head.y <= 0 || 
      head.y >= this.config.height - 1
    ) {
      this.isGameOver = true;
      return;
    }

    // Check for collisions with self
    if (this.snake.isCollidingWithSelf()) {
      this.isGameOver = true;
      return;
    }

    // Check for food collision
    if (this.food.isAtPosition(head)) {
      // Grow the snake
      this.snake.grow();
      
      // Increase score
      this.score++;
      
      // Increase speed (decrease interval time)
      this.speed = Math.max(50, this.speed - this.config.speedIncrement);
      
      // Update the game loop interval with the new speed
      if (this.gameLoopInterval) {
        clearInterval(this.gameLoopInterval);
        this.gameLoopInterval = setInterval(() => {
          this.update();
          this.render();

          if (this.isGameOver) {
            this.end();
          }
        }, this.speed);
      }
      
      // Generate new food position
      this.food.generateNewPosition(this.snake);
    }
  }

  /**
   * Render the current game state
   */
  private render(): void {
    this.renderer.clearScreen();
    this.renderer.updateBoard(this.snake, this.food);
    this.renderer.render();
    this.renderer.displayInfo(this.score, this.speed);
    
    if (this.isGameOver) {
      this.renderer.displayGameOver(this.score);
    }
  }

  /**
   * End the game
   */
  end(): void {
    if (this.gameLoopInterval) {
      clearInterval(this.gameLoopInterval);
      this.gameLoopInterval = null;
    }
    
    this.inputHandler.setIsRunning(false);
    
    // Clean up resources
    setTimeout(() => {
      this.inputHandler.cleanup();
    }, 100);
  }
}