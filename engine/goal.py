"""
Core goal/quest classes for the adventure game engine.
"""

class Goal:
    """
    Represents a player goal or quest.

    Attributes:
        title (str): The title of the goal.
        description (str): A description of the goal.
        status (str): The current status of the goal (e.g., 'active', 'completed').
    """
    def __init__(self, title, description):
        self.title = title
        self.description = description
        self.status = 'active'

    def complete(self):
        """Marks the goal as completed."""
        self.status = 'completed'

    def __str__(self):
        return f"{self.title} ({self.status})"
