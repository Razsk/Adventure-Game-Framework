# Web-Based Adventure Game Engine

This repository contains a general-purpose engine for creating text-based adventure games that run in a web browser. The engine is designed to be data-driven, with all game content defined in a single JSON file.

## Features

*   **Dynamic Storytelling:** The game supports goals and sub-goals, allowing for a branching narrative.
*   **Character Attributes:** Player and non-player characters have attributes that can influence gameplay.
*   **Inventory System:** Players can manage a limited inventory of items.
*   **Factions and Reputation:** The game includes a system for tracking player reputation with different factions.
*   **Save/Load Progress:** Game progress is automatically saved to the browser's local storage.
*   **Interactive Map:** The game generates an interactive map of visited locations.

## Project Structure

The project is organized as follows:

-   `web/`: This directory contains all the files for the web-based game:
    -   `index.html`: The main HTML file for the game.
    -   `style.css`: The stylesheet for the game.
    -   `game.js`: The core game logic.
    -   `game-data.json`: A JSON file containing all game data, such as locations, characters, items, and goals.

## How to Run the Game

To play the game, simply open the `web/index.html` file in your web browser. There is no need to run a server or install any dependencies.
