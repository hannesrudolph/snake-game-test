# TypeScript Snake Game

A classic Snake game implemented in TypeScript for the terminal.

## Features

- Snake movement in four directions (up, down, left, right)
- Food generation at random positions
- Score tracking
- Game over detection (when snake hits the wall or itself)
- Increasing difficulty as the score increases

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd snake-game-test
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Running the Game

### Development Mode

Run the game directly with ts-node:

```
npm run dev
```

### Production Mode

Build the TypeScript code and then run the compiled JavaScript:

```
npm run build
npm start
```

## How to Play

- Use the arrow keys (↑, ↓, ←, →) to control the snake's direction
- Eat food (red dots) to grow the snake and increase your score
- Avoid hitting the walls or the snake's own body
- The game speed increases as your score goes up
- Press Ctrl+C to exit the game at any time

## Project Structure

```
snake-game-test/
├── src/                  # TypeScript source files
│   ├── index.ts          # Entry point
│   ├── game.ts           # Game logic
│   ├── snake.ts          # Snake class
│   ├── food.ts           # Food class
│   ├── renderer.ts       # Terminal rendering
│   ├── input.ts          # Keyboard input handling
│   └── types.ts          # Type definitions
├── dist/                 # Compiled JavaScript files
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

## Future Enhancements

- Game settings (speed, board size)
- High score tracking
- Multiple food types
- Obstacles
- Game pause functionality