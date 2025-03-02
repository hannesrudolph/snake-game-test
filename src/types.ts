/**
 * Direction enum for snake movement
 */
export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT
}

/**
 * Position interface to represent coordinates on the game board
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Cell type for the game board
 */
export enum CellType {
  EMPTY,
  SNAKE,
  FOOD,
  WALL
}

/**
 * Game configuration interface
 */
export interface GameConfig {
  width: number;
  height: number;
  initialSpeed: number;
  speedIncrement: number;
}

/**
 * Default game configuration
 */
export const DEFAULT_CONFIG: GameConfig = {
  width: 20,
  height: 10,
  initialSpeed: 200, // milliseconds between moves
  speedIncrement: 10, // milliseconds to decrease per food eaten
  // initialSpeed and speedIncrement are in milliseconds
};