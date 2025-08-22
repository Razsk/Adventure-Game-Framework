const gameData = {
    gameTitle: "Saga of Beowulf",
    playerCharacter: "Beowulf",
    startingLocation: "HygelacsHall",
    initialReputation: { "Danes": 40, "Geats": 70, "Monsters": 0 },
    locations: {
        "HygelacsHall": {
            name: "Hygelac's Hall",
            description: "The great hall of your king, Hygelac. Here you hear tales of far-off lands and monsters.",
            connections: { "go to the coast": "GeatishCoast" },
            characters: ["Hygelac", "Wiglaf"],
            items: []
        },
        "GeatishCoast": {
            name: "Geatish Coast",
            description: "The shores of your homeland. From here, you can set sail for adventure.",
            connections: { "sail east": "DanishCoast", "return to the hall": "HygelacsHall", "travel to the barrow": "DragonsBarrow" },
            characters: [],
            items: []
        },
        "DanishCoast": {
            name: "Danish Coast",
            description: "You've landed on the shores of Daneland. The great hall of Heorot lies inland.",
            connections: { "go inland": "Heorot", "sail west": "GeatishCoast" },
            characters: [],
            items: []
        },
        "Heorot": {
            name: "Heorot",
            description: "The great mead hall of King Hrothgar, currently plagued by a nightly terror.",
            connections: { "go to coast": "DanishCoast", "descend to the mere": "TheHauntedMere" },
            characters: ["Hrothgar", "Wealhtheow", "Unferth"],
            items: []
        },
        "TheHauntedMere": {
            name: "The Haunted Mere",
            description: "A dark, misty swamp. They say a monster lurks in its depths.",
            connections: { "return to Heorot": "Heorot", "dive into the water": "UnderwaterLair" },
            characters: ["GrendelsMother"],
            items: []
        },
        "UnderwaterLair": {
            name: "Underwater Lair",
            description: "A foul cavern hidden from the sun, filled with ancient treasures and a palpable evil.",
            connections: { "surface": "TheHauntedMere" },
            characters: [],
            items: ["giants_sword"]
        },
        "DragonsBarrow": {
            name: "Dragon's Barrow",
            description: "An ancient burial mound, now home to a treasure-hoarding dragon.",
            connections: { "leave": "GeatishCoast" },
            characters: ["Dragon"],
            items: ["treasure_hoard"]
        }
    },
    characters: {
        "Beowulf": {
            name: "Beowulf",
            attributes: { "strength": 80, "wit": 60, "valor": 70 },
            skills: { "unarmed": 30, "boasting": 20, "swords": 10 },
            faction: "Geats",
            inventory: [],
            equipment: { "mainHand": null, "offHand": null, "armor": null }
        },
        "Hrothgar": {
            name: "Hrothgar",
            attributes: { "strength": 30, "wit": 70 },
            faction: "Danes",
            inventory: [],
            dialogue: {
                "default": "Welcome to Heorot, warrior. A darkness has fallen on my great hall. If you have the strength, I would hear your boast.",
                "main_1": "Your legend is sealed in the rafters of this hall, Beowulf. You have my deepest thanks. But I fear this is not the end of our troubles."
            }
        },
        "Wealhtheow": { name: "Wealhtheow", attributes: { "strength": 20, "wit": 80 }, faction: "Danes", inventory: [] },
        "Unferth": {
            name: "Unferth",
            attributes: { "strength": 60, "wit": 50 },
            faction: "Danes",
            inventory: ["hrunting"],
            dialogue: {
                "default": "So, another would-be hero arrives from across the sea. I am Unferth, the king's advisor. Let's see if your deeds match your ambition.",
                "side_1": "Hmph. A sharp tongue. Perhaps you are not entirely worthless after all. We shall see.",
                "unferth_convinced": "You have proven your worth, Beowulf. Forgive my sharp words. The sword Hrunting is yours to keep, if you will have it."
            },
            interactions: {
                "gives": {
                    "grendels_arm": {
                        "response": "You show the grisly arm to Unferth. He stares, speechless, for a long moment. 'By the gods... you actually did it.'",
                        "adds_flag": "unferth_convinced",
                        "removes_item": true,
                        "rewards": {
                            "items": ["hrunting"],
                            "reputation": { "Danes": 15 }
                        },
                        "completes_goal": "side_2"
                    }
                }
            }
        },
        "Hygelac": {
            name: "Hygelac",
            attributes: { "strength": 70, "wit": 60 },
            faction: "Geats",
            inventory: [],
            dialogue: {
                "default": "Beowulf, my kinsman! Welcome. What news do you bring?"
            }
        },
        "Wiglaf": { name: "Wiglaf", attributes: { "strength": 70, "wit": 60 }, faction: "Geats", inventory: [] },
        "Grendel": { name: "Grendel", attributes: { "strength": 95, "wit": 40 }, faction: "Monsters", inventory: [] },
        "GrendelsMother": { name: "Grendel's Mother", attributes: { "strength": 85, "wit": 65 }, faction: "Monsters", inventory: [] },
        "Dragon": { name: "The Dragon", attributes: { "strength": 100, "wit": 80 }, faction: "Monsters", inventory: [] }
    },
    items: {
        "hrunting": { name: "Hrunting", description: "A fine sword loaned by Unferth. Said to have never failed in battle.", type: "weapon", slot: "mainHand", effects: { "swords": 20 } },
        "giants_sword": { name: "Giant's Sword", description: "An enormous blade forged by giants, found in the mere.", type: "weapon", slot: "mainHand", effects: { "strength": 30 } },
        "grendels_arm": { name: "Grendel's Arm", description: "The monstrous arm of Grendel, a grisly trophy.", type: "trophy", slot: null, effects: {} },
        "treasure_hoard": { name: "Dragon's Hoard", description: "A vast pile of gold and jewels.", type: "treasure", slot: null, effects: {} }
    },
    goals: {
        "main_1": {
            title: "Slay the Beast of Heorot",
            description: "Travel to Daneland and defeat the monster Grendel.",
            type: "main",
            status: "active",
            subgoals: ["sub_1_1", "sub_1_2", "sub_1_3"],
            unlocks: ["main_2"]
        },
        "sub_1_1": { title: "Travel to Heorot", description: "Sail to the land of the Danes and find the great hall.", type: "main", status: "active", conditions: { requiredLocation: "Heorot" } },
        "sub_1_2": { title: "Earn Hrothgar's Trust", description: "Prove your worth to the king through boasts or deeds.", type: "main", status: "locked", conditions: { requiredFlags: ["sub_1_1"] } },
        "sub_1_3": { title: "Defeat Grendel", description: "Confront the beast in single combat.", type: "main", status: "locked", conditions: { requiredFlags: ["sub_1_2"] }, rewards: { items: ["grendels_arm"] } },
        "main_2": {
            title: "A Mother's Revenge",
            description: "Grendel's mother attacks Heorot. Hunt her down in her lair.",
            type: "main",
            status: "locked",
            subgoals: ["sub_2_1", "sub_2_2"],
            unlocks: ["main_3"],
            conditions: { requiredFlags: ["main_1"] }
        },
        "sub_2_1": { title: "Find the Mere", description: "Journey to the haunted swamp.", type: "main", status: "locked", conditions: { requiredLocation: "The Haunted Mere" } },
        "sub_2_2": { title: "Slay Grendel's Mother", description: "Defeat the monster in her underwater cave.", type: "main", status: "locked", conditions: { requiredFlags: ["sub_2_1"] } },
        "main_3": {
            title: "The Final Battle",
            description: "After years of peace, a dragon threatens your kingdom.",
            type: "main",
            status: "locked",
            subgoals: ["sub_3_1"],
            unlocks: []
        },
        "sub_3_1": { title: "Slay the Dragon", description: "Protect your people, no matter the cost.", type: "main", status: "locked" },
        "side_1": {
            title: "The Boasting Contest",
            description: "Shut down Unferth's challenge in a battle of wits.",
            type: "side",
            status: "locked",
            conditions: {
                requiredCharacters: ["Unferth"],
                requiredLocation: "Heorot"
            }
        },
        "side_2": {
            title: "A Grisly Trophy",
            description: "Unferth seems skeptical of your victory. Perhaps showing him proof of Grendel's demise will convince him.",
            type: "side",
            status: "locked",
            unlocks: [],
            conditions: {
                requiredFlags: ["main_1"],
                requiredLocation: "Heorot"
            }
        }
    }
};
