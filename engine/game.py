"""
The main game engine loop and state management.
"""

class Game:
    """
    Manages the main game state and loop.

    Attributes:
        player (Character): The player character.
        locations (dict): A dictionary of all locations in the game, keyed by name.
        current_location (Location): The player's current location.
    """
    def __init__(self, player, locations):
        self.player = player
        self.locations = locations
        self.current_location = list(locations.values())[0] if locations else None
        self.is_running = False

    def run(self):
        """Starts the main game loop."""
        self.is_running = True
        while self.is_running:
            print("\n" + "="*20)
            print(self.current_location.describe())
            self._handle_input()

    def _handle_input(self):
        """Handles player input."""
        command = input("> ").strip().lower()
        if command == "quit":
            self.is_running = False
            print("Goodbye!")
        elif command.startswith("go "):
            direction = command.split(" ")[1]
            if direction in self.current_location.connections:
                location_name = self.current_location.connections[direction]
                if location_name in self.locations:
                    self.current_location = self.locations[location_name]
                else:
                    print(f"Error: Location '{location_name}' not found.")
            else:
                print("You can't go that way.")
        else:
            print("Unknown command.")
