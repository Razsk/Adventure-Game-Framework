"""
Story elements for the Beowulf game.
"""

from engine.goal import Goal

# Goal definitions
defeat_grendel = Goal(
    title="Defeat Grendel",
    description="Hrothgar, King of the Danes, has asked you to defeat the monster Grendel, "
                "who has been terrorizing the mead hall of Heorot."
)

# A dictionary to hold all goals
goals = {
    "main_quest": defeat_grendel
}
