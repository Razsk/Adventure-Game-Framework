"""
Location definitions for the Beowulf game.
"""

from engine.location import Location
from .characters import hrothgar

# Location definitions
geatland = Location(
    name="Geatland",
    description="The windswept homeland of the Geats. Your journey begins here.",
    connections={'east': "Daneland"}
)

daneland = Location(
    name="Daneland",
    description="The kingdom of the Danes, ruled by Hrothgar. The great hall of Heorot is here.",
    connections={'west': "Geatland"},
    characters=[hrothgar]
)

# A dictionary to hold all locations
locations = {
    "Geatland": geatland,
    "Daneland": daneland,
}
