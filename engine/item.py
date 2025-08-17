"""
Core item classes for the adventure game engine.
"""

class Item:
    """
    Represents an item that can be carried or found in the game.

    Attributes:
        name (str): The name of the item.
        description (str): A description of the item.
    """
    def __init__(self, name, description):
        self.name = name
        self.description = description

    def __str__(self):
        return self.name
