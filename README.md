# Asleveldevil

Asleveldevil is a small browser-based platformer that intentionally **misleads the player**.
It looks like a normal level, but hidden rules and one-time traps are designed to punish assumptions.

## Table of Contents
- [Project Overview](#project-overview)
- [Gameplay Highlights](#gameplay-highlights)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Controls](#controls)
- [Project Structure](#project-structure)
- [Design Notes](#design-notes)
- [Roadmap](#roadmap)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project is a lightweight 2D platformer built with plain HTML, CSS, and JavaScript.
The core idea is psychological: players are encouraged to trust what they see, then the game breaks that trust.

Despite its small size, the project demonstrates key game-dev fundamentals:
- game loops (`update` + `draw`)
- keyboard input handling
- collision detection (AABB)
- state reset and level re-initialization

## Gameplay Highlights
- **Deceptive platform layout** with disappearing (fake) platforms
- **Betrayal mechanic** where the door defeats the player once before allowing victory
- **Fast restart loop** to support trial-and-error gameplay
- **No frameworks** and no external dependencies

## Tech Stack
- **HTML5** for structure and canvas hosting
- **CSS3** for styling
- **Vanilla JavaScript** for game logic and rendering

## Getting Started
### 1) Clone the repository
```bash
git clone https://github.com/chetx27/asleveldevil.git
cd asleveldevil
```

### 2) Run the game
Choose one of the following:
- Open `index.html` directly in your browser, or
- Use a local static server (recommended), for example:

```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Controls
- **Left Arrow**: Move left
- **Right Arrow**: Move right
- **Up Arrow**: Jump (only when grounded)

## Project Structure
```text
.
├── index.html   # Canvas host page
├── style.css    # Basic UI styling
├── game.js      # Core game logic and rendering
└── README.md
```

## Design Notes
The game intentionally favors surprise over fairness.
It is built as a compact experiment in expectation management and playful frustration.

## Roadmap
Potential improvements:
- Additional levels with unique trick mechanics
- Basic sound effects and feedback cues
- Restart button and pause support
- Mobile input support
- Lightweight score/time tracking

## Contributing
Contributions are welcome. If you want to improve gameplay, readability, or polish:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Open a pull request with a clear summary

## License
This repository is currently provided for learning and experimentation.
If you plan to reuse or redistribute it, add a formal license file first.
