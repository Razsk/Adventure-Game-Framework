"""
Character definitions for the Beowulf game.
"""

from engine.character import Character

# Player character
beowulf = Character(
    name="Beowulf",
    attributes={'strength': 80, 'wit': 60},
    faction="Geats"
)

# NPCs
hrothgar = Character(
    name="Hrothgar",
    attributes={'strength': 30, 'wit': 70},
    faction="Danes"
)

grendel = Character(
    name="Grendel",
    attributes={'strength': 95, 'wit': 40},
    faction="Monsters"
)
