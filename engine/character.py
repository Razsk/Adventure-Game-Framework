"""
Core character classes for the adventure game engine.
"""

class Character:
    """
    Represents a character in the game.

    Attributes:
        name (str): The character's name.
        attributes (dict): A dictionary of character attributes (e.g., {'strength': 50, 'wit': 50}).
        inventory (list): A list of items the character is carrying.
        faction (str): The faction the character belongs to.
    """
    def __init__(self, name, attributes=None, inventory=None, faction=None):
        self.name = name
        self.attributes = attributes if attributes is not None else {}
        self.inventory = inventory if inventory is not None else []
        self.faction = faction

    def __str__(self):
        return self.name
