// Game logic will go here
console.log("Game script loaded.");

class Character {
    constructor(name, attributes, faction, inventory) {
        this.name = name;
        this.attributes = attributes;
        this.faction = faction;
        this.inventory = inventory;
    }
}

class Item {
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
}

class Location {
    constructor(name, description, connections, characters, items) {
        this.name = name;
        this.description = description;
        this.connections = connections;
        this.characters = characters;
        this.items = items;
    }
}

class Goal {
    constructor(title, description, status) {
        this.title = title;
        this.description = description;
        this.status = status;
    }
}

class Game {
    constructor() {
        this.locations = {};
        this.characters = {};
        this.items = {};
        this.goals = {};
        this.player = null;
        this.currentLocation = null;
        this.visitedLocations = new Set();

        // UI Element References
        this.ui = {
            logPanel: document.getElementById('log-panel'),
            playerPanel: document.getElementById('player-panel'),
            exitsPanel: document.getElementById('exits-panel'),
            interactPanel: document.getElementById('interact-panel'),
            inventoryPanel: document.getElementById('inventory-panel'),
            goalsPanel: document.getElementById('goals-panel'),
            mapPanel: document.getElementById('map-panel'),
        };
    }

    logMessage(message, type = 'normal') {
        const logEntry = document.createElement('p');
        logEntry.innerHTML = message; // Use innerHTML to allow for simple formatting
        logEntry.className = `log-entry log-${type}`;
        this.ui.logPanel.appendChild(logEntry);
        this.ui.logPanel.scrollTop = this.ui.logPanel.scrollHeight; // Auto-scroll to bottom
    }

    async renderMap() {
        this.ui.mapPanel.innerHTML = ''; // Clear previous map
        let mapDefinition = 'graph TD\n';

        this.visitedLocations.forEach(locationName => {
            const location = this.locations[locationName];
            if (location) {
                for (const direction in location.connections) {
                    const connectedLocationName = location.connections[direction];
                    // Only draw connections between locations that have both been visited
                    if (this.visitedLocations.has(connectedLocationName)) {
                        mapDefinition += `    ${location.name} --> ${connectedLocationName}\n`;
                    }
                }
            }
        });

        // Style the current location
        mapDefinition += `\n    style ${this.currentLocation.name} fill:#f9f,stroke:#333,stroke-width:4px`;

        const pre = document.createElement('pre');
        pre.className = 'mermaid';
        pre.textContent = mapDefinition;
        this.ui.mapPanel.appendChild(pre);

        await mermaid.run({
            nodes: [pre],
        });
    }

    updateUI() {
        // Clear all panels
        this.ui.playerPanel.innerHTML = '';
        this.ui.exitsPanel.innerHTML = '';
        this.ui.interactPanel.innerHTML = '';
        this.ui.inventoryPanel.innerHTML = '';
        this.ui.goalsPanel.innerHTML = '';

        // Render Player Panel
        this.ui.playerPanel.innerHTML = `
            <h5>${this.player.name}</h5>
            <p><strong>Faction:</strong> ${this.player.faction}</p>
            <p><strong>Attributes:</strong></p>
            <ul>
                ${Object.entries(this.player.attributes).map(([key, value]) => `<li>${key}: ${value}</li>`).join('')}
            </ul>
        `;

        // Render Exits Panel
        const exits = this.currentLocation.connections;
        for (const direction in exits) {
            const locationName = exits[direction];
            const button = document.createElement('button');
            button.className = 'btn btn-outline-primary w-100 mb-2';
            button.textContent = `${direction.charAt(0).toUpperCase() + direction.slice(1)}: ${locationName}`;
            button.onclick = () => this.moveTo(locationName);
            this.ui.exitsPanel.appendChild(button);
        }

        // Render Interactibles Panel (Characters and Items in Location)
        this.currentLocation.characters.forEach(charKey => {
            const character = this.characters[charKey];
            if (character !== this.player) {
                this.ui.interactPanel.innerHTML += `<p>${character.name}</p>`;
            }
        });
        this.currentLocation.items.forEach(itemKey => {
            const item = this.items[itemKey];
            this.ui.interactPanel.innerHTML += `<p>${item.name}</p>`;
        });
        if (this.ui.interactPanel.innerHTML === '') {
            this.ui.interactPanel.innerHTML = '<p class="text-muted">Nothing to interact with.</p>';
        }

        // Render Inventory Panel
        if (this.player.inventory.length > 0) {
            this.player.inventory.forEach(item => {
                this.ui.inventoryPanel.innerHTML += `<p>${item.name}</p>`;
            });
        } else {
            this.ui.inventoryPanel.innerHTML = '<p class="text-muted">Your inventory is empty.</p>';
        }

        // Render Goals Panel
        for (const key in this.goals) {
            const goal = this.goals[key];
            let goalHtml = `
                <div class="mb-2">
                    <p class="mb-1"><strong>${goal.title}</strong> (${goal.status})</p>
                    <small>${goal.description}</small>
            `;
            if (goal.status === 'active') {
                // Future logic would check if requirements are met to enable this button
                goalHtml += `<br><button class="btn btn-sm btn-success mt-1" disabled>Complete Goal</button>`;
            }
            goalHtml += `</div>`;
            this.ui.goalsPanel.innerHTML += goalHtml;
        }

        // Render Map
        this.renderMap();
    }

    saveState() {
        const state = {
            currentLocation: this.currentLocation.name,
            visitedLocations: Array.from(this.visitedLocations) // Convert Set to Array for JSON
        };
        localStorage.setItem('adventureGameSave', JSON.stringify(state));
        console.log("Game state saved.");
    }

    loadState() {
        const savedState = localStorage.getItem('adventureGameSave');
        if (savedState) {
            const state = JSON.parse(savedState);
            if (this.locations[state.currentLocation]) {
                this.currentLocation = this.locations[state.currentLocation];
                this.visitedLocations = new Set(state.visitedLocations); // Convert Array back to Set
                console.log("Game state loaded.");
                this.logMessage("Welcome back! Your progress has been restored.", "game-event");
                return true; // Return true to indicate a load was successful
            }
        }
        return false; // No save state found or it was invalid
    }

    moveTo(locationName) {
        if (this.locations[locationName]) {
            this.currentLocation = this.locations[locationName];
            this.visitedLocations.add(locationName);
            this.logMessage(`You travel to <strong>${this.currentLocation.name}</strong>.`, 'location');
            this.logMessage(this.currentLocation.description);
            this.updateUI();
            this.saveState(); // Auto-save after moving
        } else {
            console.error(`Attempted to move to unknown location: ${locationName}`);
            this.logMessage(`Error: Could not find location "${locationName}".`, 'error');
        }
    }

    async startGame(path) {
        const response = await fetch(path);
        const data = await response.json();

        // Load items
        for (const key in data.items) {
            const itemData = data.items[key];
            this.items[key] = new Item(itemData.name, itemData.description);
        }

        // Load characters
        for (const key in data.characters) {
            const charData = data.characters[key];
            const inventory = charData.inventory.map(itemKey => this.items[itemKey]);
            this.characters[key] = new Character(charData.name, charData.attributes, charData.faction, inventory);
        }

        // Load locations
        for (const key in data.locations) {
            const locData = data.locations[key];
            this.locations[key] = new Location(locData.name, locData.description, locData.connections, locData.characters, locData.items);
        }

        // Load goals
        for (const key in data.goals) {
            const goalData = data.goals[key];
            this.goals[key] = new Goal(goalData.title, goalData.description, goalData.status);
        }

        this.player = this.characters[data.playerCharacter];
        this.currentLocation = this.locations[data.startingLocation];

        console.log("Game data loaded:", this);

        // Try to load saved state. If not present, initialize for a new game.
        const loaded = this.loadState();
        if (!loaded) {
            this.visitedLocations.add(this.currentLocation.name);
            this.logMessage(`Welcome to ${data.gameTitle}!`, 'game-event');
            this.logMessage(`You are at <strong>${this.currentLocation.name}</strong>.`);
        }

        this.logMessage(this.currentLocation.description);
        this.updateUI();
    }
}

// Initialize and load the game
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.startGame('game-data.json');
});
