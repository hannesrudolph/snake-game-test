# TypeScript Snake Game

A classic Snake game implemented in TypeScript that runs in the terminal. Control a snake, eat food, grow longer, and try to achieve the highest score without hitting the walls or yourself!

![Snake Game](https://via.placeholder.com/800x400?text=Snake+Game+Screenshot)

## Features

- Snake movement in four directions (up, down, left, right)
- Food generation at random positions
- Score tracking
- Game over detection (when snake hits the wall or itself)
- Increasing difficulty as the score increases
- Colorful terminal output using chalk

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v12 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

You can check your current versions with:
```bash
node --version
npm --version
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/snake-game-test.git
   cd snake-game-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Game

### Development Mode

Run the game directly with ts-node (faster for development):

```bash
npm run dev
```

### Production Mode

Build the TypeScript code and then run the compiled JavaScript:

```bash
npm run build
npm start
```

## How to Play

- Use the arrow keys to control the snake:
  - ↑ (Up Arrow): Move up
  - ↓ (Down Arrow): Move down
  - ← (Left Arrow): Move left
  - → (Right Arrow): Move right
- Eat food (displayed as red dots) to grow the snake and increase your score
- Avoid hitting the walls or the snake's own body
- The game speed increases as your score goes up, making it progressively more challenging
- Press `Ctrl+C` to exit the game at any time

## Game Controls

| Key       | Action                |
|-----------|----------------------|
| ↑         | Move Up              |
| ↓         | Move Down            |
| ←         | Move Left            |
| →         | Move Right           |
| Ctrl+C    | Exit Game            |

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

## Technical Implementation

The game is built using several key components:

- **Game Class**: Manages the game state, initializes the board, handles the game loop, tracks score, and detects collisions
- **Snake Class**: Represents the snake entity, tracks position and segments, handles movement, and grows when food is eaten
- **Food Class**: Represents food items and generates random positions
- **Renderer**: Clears the terminal, renders the game board, and displays the snake, food, and score
- **Input Handler**: Captures keyboard input and maps keys to directions

## Troubleshooting

### Game doesn't start
- Ensure all dependencies are installed with `npm install`
- Check that you have the correct Node.js version (v12+)
- Try running in development mode with `npm run dev`

### Terminal display issues
- Make sure your terminal supports ANSI colors
- Try resizing your terminal window to ensure the game board fits
- If you see strange characters, check that your terminal supports UTF-8

### Input not working
- Ensure your terminal window is in focus
- Check that your keyboard layout supports arrow keys
- Try running the game in a different terminal emulator

## Future Enhancements

- Game settings (speed, board size)
- High score tracking
- Multiple food types
- Obstacles
- Game pause functionality

## Development

Here are some ideas for future development or refactoring:

- **Refactor input handling:**  The current input handling could be made more robust and potentially separated into its own module.
- **Add game states:** Introduce different game states (e.g., menu, playing, paused, game over) to improve the game's structure.
- **Improve collision detection:**  The collision detection could be optimized for performance.
- **Configuration file:** Allow game settings (board size, speed) to be loaded from a configuration file.

## Contributing

We welcome contributions from the community! If you'd like to contribute to this project, please follow these guidelines:

1.  **Fork the Repository:** Start by forking the repository to your own GitHub account.
2.  **Create a Branch:** Create a new branch for your feature or bug fix. Use a descriptive name, such as `feature/add-high-scores` or `bugfix/fix-collision-detection`.
3.  **Make Changes:** Implement your changes, ensuring they are well-documented and follow the project's coding style.
4.  **Write Tests:** If applicable, write unit tests to cover your changes.
5.  **Commit Changes:** Commit your changes with clear and concise commit messages.
6.  **Push to Your Fork:** Push your branch to your forked repository.
7.  **Submit a Pull Request:** Create a pull request from your branch to the main branch of the original repository. Provide a detailed description of your changes and why they are necessary.

Please be respectful of other contributors and adhere to the project's code of conduct (if one exists).

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the classic Snake game
- Built with TypeScript and Node.js
- Terminal rendering powered by ANSI escape codes and chalk