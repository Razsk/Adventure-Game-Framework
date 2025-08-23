const gameData = {
    gameTitle: "Saga of Beowulf",
    playerCharacter: "Beowulf",
    startingLocation: "Geatland",
    initialReputation: { "Danes": 40, "Geats": 70, "Monsters": 0 },
    locations: {
        "Geatland": {
            name: "Geatland",
            description: "Your windswept homeland. The sea calls to you, promising adventure.",
            connections: { "sail east": "Danish Coast" },
            characters: [],
            items: []
        },
        "Danish Coast": {
            name: "Danish Coast",
            description: "You've landed on the shores of Daneland. The great hall of Heorot lies inland.",
            connections: { "go inland": "Heorot", "sail west": "Geatland" },
            characters: [],
            items: []
        },
        "Heorot": {
            name: "Heorot",
            description: "The great mead hall of King Hrothgar, currently plagued by a nightly terror.",
            connections: { "go to coast": "Danish Coast", "descend to the mere": "The Haunted Mere" },
            characters: ["Hrothgar", "Wealhtheow", "Unferth"],
            items: []
        },
        "The Haunted Mere": {
            name: "The Haunted Mere",
            description: "A dark, misty swamp. They say a monster lurks in its depths.",
            connections: { "return to Heorot": "Heorot", "dive into the water": "Underwater Lair" },
            characters: ["GrendelsMother"],
            items: []
        },
        "Underwater Lair": {
            name: "Underwater Lair",
            description: "A foul cavern hidden from the sun, filled with ancient treasures and a palpable evil.",
            connections: { "surface": "The Haunted Mere" },
            characters: [],
            items: ["giants_sword"]
        },
        "Dragons Barrow": {
            name: "Dragon's Barrow",
            description: "An ancient burial mound, now home to a treasure-hoarding dragon.",
            connections: { "leave": "Geatland" },
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
                start_node: "default",
                nodes: {
                    "default": {
                        text: "Welcome to Heorot, warrior. A darkness has fallen on my great hall. If you have the strength, I would hear your boast.",
                        choices: [
                            { text: "I will tell you of my deeds.", leads_to: "boast" },
                            { text: "I am ready to fight now.", leads_to: "ready_to_fight" }
                        ]
                    },
                    "boast": {
                        text: "Then speak. Let all the court hear of your prowess.",
                        actions: [{ add_flag: "player_boasted" }],
                        ends_dialogue: true
                    },
                    "ready_to_fight": {
                        text: "Eager, I see. Very well. May you be the hero we need.",
                        ends_dialogue: true
                    },
                    "main_1": {
                        text: "Your legend is sealed in the rafters of this hall, Beowulf. You have my deepest thanks. But I fear this is not the end of our troubles.",
                        ends_dialogue: true
                    }
                }
            }
        },
        "Wealhtheow": { name: "Wealhtheow", attributes: { "strength": 20, "wit": 80 }, faction: "Danes", inventory: [] },
        "Unferth": {
            name: "Unferth",
            attributes: { "strength": 60, "wit": 50 },
            faction: "Danes",
            inventory: ["hrunting"],
            dialogue: {
                "start_node": "default",
                "nodes": {
                    "default": {
                        "text": "So, another would-be hero arrives from across the sea. I am Unferth, the king's advisor. Let's see if your deeds match your ambition.",
                        "choices": [
                            { "text": "I am Beowulf of the Geats. I have come to kill your monster.", "leads_to": "boast_response" },
                            { "text": "And you are...?", "leads_to": "who_are_you" },
                            {
                                "text": "[Give Grendel's Arm] I believe this belongs to a friend of yours.",
                                "leads_to": "give_arm_dialogue",
                                "condition": { "has_item": "grendels_arm" }
                            }
                        ]
                    },
                    "boast_response": {
                        "text": "Hmph. Big words from a sea-rover. Let us hope you can back them up.",
                        "actions": [{ "add_flag": "unferth_challenged" }, {"change_reputation": { "faction": "Danes", "amount": -5}}],
                        "ends_dialogue": true
                    },
                    "who_are_you": {
                        "text": "I am Unferth, the king's thyle. You would do well to remember it.",
                        "ends_dialogue": true
                    },
                    "give_arm_dialogue": {
                        "text": "You show the grisly arm to Unferth. He stares, speechless, for a long moment. 'By the gods... you actually did it.'",
                        "actions": [
                            { "add_flag": "unferth_convinced" },
                            { "remove_item": "grendels_arm" },
                            { "add_item": "hrunting" },
                            { "change_reputation": { "faction": "Danes", "amount": 15 } },
                            { "complete_goal": "side_2" }
                        ],
                        "leads_to": "unferth_convinced"
                    },
                    "side_1": {
                        "text": "Hmph. A sharp tongue. Perhaps you are not entirely worthless after all. We shall see.",
                        "ends_dialogue": true
                    },
                    "unferth_convinced": {
                        "text": "You have proven your worth, Beowulf. Forgive my sharp words. The sword Hrunting is yours to keep, if you will have it.",
                        "ends_dialogue": true
                    }
                }
            },
            "interactions": {}
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
