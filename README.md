# Memory Match Game 🃏

A fun and interactive memory match game built using React with dynamic grid sizing, themes, and animations. The game challenges players to match pairs of cards with the least number of moves and in the shortest time. 

## Features ✨
- **Dynamic Grid Sizes:** Choose from different grid sizes (e.g., 4x4, 6x6, 8x8).
- **Themes:** Switch between different card themes, such as food and animals.
- **Animations:** Smooth card flip animations using `react-spring`.
- **Score Tracking:**
  - **Moves Counter**: Tracks the number of moves.
  - **Timer**: Tracks the elapsed time.
  - **Best Score**: Persists the best score for each grid size using `localStorage`.
- **Responsive Design:** The game adjusts to fit any screen size.

## Technologies Used 🛠️
- **React**: Component-based UI development.
- **react-spring**: For card flip animations.
- **Confetti**: Celebratory animation upon winning.
- **CSS**: For responsive styling and layout.

## Installation 🚀

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/memory-match-game.git
   cd memory-match-game
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the game in your browser:
   ```
   http://localhost:3000
   ```

## How to Play 🎮

1. Select a grid size and theme from the controls.
2. Click on the cards to reveal their content.
3. Match pairs of cards until all cards are found.
4. Check your time, moves, and score. Try to beat your best score!

## Folder Structure 📁

```
memory-match-game/
├── src/
│   ├── App.js         # Main game logic
│   ├── Card.js        # Card component with animations
│   ├── App.css        # Styling for the app
│   └── index.js       # React entry point
├── public/
│   └── index.html     # Main HTML file
├── README.md          # This file
├── package.json       # Project metadata and dependencies
```

## Customization ⚙️

- **Add New Themes:** Add new emoji sets in `App.js` under `foodImg` or `animalImg`, or create a new theme.
- **Change Grid Sizes:** Adjust the grid size logic in the `changeGridSize` function.


## License 📜

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute this project.

---

Enjoy the game! 🎉
