"""
Core location classes for the adventure game engine.
"""

class Location:
    """
    Represents a single location in the game world.

    Attributes:
        name (str): The name of the location.
        description (str): A description of the location.
        connections (dict): A dictionary of connections to other locations,
                            e.g., {'north': 'Heorot Hall', 'south': 'Swamp'}.
        characters (list): A list of characters currently at this location.
    """
    def __init__(self, name, description, connections=None, characters=None):
        self.name = name
        self.description = description
        self.connections = connections if connections is not None else {}
        self.characters = characters if characters is not None else []

    def __str__(self):
        return self.name

    def describe(self):
        """Returns a full description of the location."""
        description = f"You are at {self.name}.\n{self.description}"
        if self.characters:
            description += "\nYou see: " + ", ".join([str(c) for c in self.characters])
        if self.connections:
            description += "\nExits: " + ", ".join(self.connections.keys())
        return description
