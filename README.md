# General Adventure Game Engine

This repository contains a general-purpose engine for creating text-based adventure games, along with a sample game based on the story of Beowulf.

## Project Structure

The project is organized into two main directories:

- `engine/`: This directory contains the core framework for the game. It includes generic classes for characters, locations, items, and the main game loop. It is designed to be game-agnostic.

- `games/`: This directory holds the specific implementations of games built with the engine. Each game has its own subdirectory.

### Beowulf MVP

The first game implemented is a simple MVP based on Beowulf, located in `games/beowulf/`.

## How to Run the Game

To play the Beowulf game, run the `main` module from the project's root directory:

```bash
python -m games.beowulf.main
```
