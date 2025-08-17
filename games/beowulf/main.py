"""
The main entry point for the Beowulf game.
"""
from engine.game import Game
from .characters import beowulf
from .locations import locations

def main():
    """Sets up and runs the game."""
    print("Starting Beowulf...")

    # Create the game instance
    game = Game(player=beowulf, locations=locations)

    # Set the starting location
    game.current_location = locations["Geatland"]

    # Run the game
    game.run()

if __name__ == "__main__":
    main()
