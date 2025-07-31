## TYPESCRIPT CODING CHALLENGE README

This is a browser based project built using Typescript, HTML, and CSS, and compiled by Vite.

This project allow users to spawn balls with random speed and sizes. The balls are able to change colours upon colliding with the wall/different balls.

Developed with: 
- Node.js v22.17.0
- TypeScript Version 5.8.3

## Feature and Approach

- Created a few core classes
	- BallBehavior - Main class that controls ball logic (collision, gravity, speed, radius, etc.)
	- BallAnimation - Main calling class, controls all balls, animation etc.
	- EventHandler - Handles all events (mouse click, buttons) for HTML 
	- SoundManager - Handles all audio related logic (pause, play)

- Used RequestAnimationFrame for tick updates.

## Challenges Faced

- Time Restrictions
	- This project had limited time to complete due to the time constraints from personal matters.
- Audio Pathing Issues
	- Encountered NotSupportedError from audio file paths.

## Future Improvements

- Panels to control gravity amount, ball speed.
- Improve overall physics logic.
- Visual and Audio indicators for collision.
- Performance optimization for handling higher ball count.

## Quick Start

1. **Install Dependencies - FROM TERMINAL**
- 1. With Terminal Opened, change directory to the project file.
- 2. Run: npm install
```bash
npm install

2. **Start The Application**
```bash
npm run dev

3. **Open Browser**
- http://localhost:5173/
