const emojis = [

    // COMMON
    { emoji: "😀", name: "Grinning", rarity: "COMMON", chance: 60 },
    { emoji: "😃", name: "Happy", rarity: "COMMON", chance: 50 },
    { emoji: "😄", name: "Smile", rarity: "COMMON", chance: 45 },
    { emoji: "😁", name: "Beaming", rarity: "COMMON", chance: 40 },
    { emoji: "😂", name: "Joy", rarity: "COMMON", chance: 35 },
    { emoji: "😊", name: "Blush", rarity: "COMMON", chance: 30 },

    // UNCOMMON
    { emoji: "😎", name: "Cool", rarity: "UNCOMMON", chance: 20 },
    { emoji: "🤓", name: "Nerd", rarity: "UNCOMMON", chance: 18 },
    { emoji: "🥳", name: "Party", rarity: "UNCOMMON", chance: 16 },
    { emoji: "🤩", name: "Star Eyes", rarity: "UNCOMMON", chance: 14 },
    { emoji: "🤖", name: "Robot", rarity: "UNCOMMON", chance: 12 },

    // RARE
    { emoji: "👑", name: "Crown", rarity: "RARE", chance: 8 },
    { emoji: "💎", name: "Diamond", rarity: "RARE", chance: 7 },
    { emoji: "🔥", name: "Fire", rarity: "RARE", chance: 6 },
    { emoji: "⚡", name: "Lightning", rarity: "RARE", chance: 5 },
    { emoji: "🌈", name: "Rainbow", rarity: "RARE", chance: 4 },

    // EPIC
    { emoji: "🐉", name: "Dragon", rarity: "EPIC", chance: 2 },
    { emoji: "🦄", name: "Unicorn", rarity: "EPIC", chance: 1.8 },
    { emoji: "👾", name: "Alien", rarity: "EPIC", chance: 1.5 },
    { emoji: "👻", name: "Ghost", rarity: "EPIC", chance: 1.2 },
    { emoji: "💀", name: "Skull", rarity: "EPIC", chance: 1 },

    // LEGENDARY
    { emoji: "🌋", name: "Volcano", rarity: "LEGENDARY", chance: 0.5 },
    { emoji: "🌠", name: "Shooting Star", rarity: "LEGENDARY", chance: 0.4 },
    { emoji: "☄️", name: "Comet", rarity: "LEGENDARY", chance: 0.3 },

    // MYTHIC
    { emoji: "🐲", name: "Mythical Dragon", rarity: "MYTHIC", chance: 0.1 },
    { emoji: "🔱", name: "Trident", rarity: "MYTHIC", chance: 0.07 },
    { emoji: "♾️", name: "Infinity", rarity: "MYTHIC", chance: 0.05 },

    // SECRET
    { emoji: "🌀", name: "Reality Breaker", rarity: "SECRET", chance: 0.01 },
    { emoji: "🔮", name: "Forbidden Orb", rarity: "SECRET", chance: 0.005 },
    { emoji: "👁️", name: "The Observer", rarity: "SECRET", chance: 0.000999 },

    // DIVINE
    { emoji: "🖕", name: "Fuck Finger", rarity: "DIVINE SECRET", chance: 0.000001}
];


const rollButton = document.getElementById("roll");

const emojiDisplay = document.getElementById("emoji");
const nameDisplay = document.getElementById("name");
const rarityDisplay = document.getElementById("rarity");
const descriptionDisplay = document.getElementById("description");

const rollsDisplay = document.getElementById("rolls");
const collectedDisplay = document.getElementById("collected");

const historyDisplay = document.getElementById("history");
const collectionDisplay = document.getElementById("collection");


let rolls = 0;
let history = [];
let collected = new Set();


function getRandomEmoji() {

    let totalChance = 0;

    emojis.forEach(item => {
        totalChance += item.chance;
    });

    let randomNumber =
        Math.random() * totalChance;

    for (const item of emojis) {

        randomNumber -= item.chance;

        if (randomNumber <= 0) {
            return item;
        }
    }

    return emojis[0];
}


function rollEmoji() {

    rollButton.disabled = true;

    emojiDisplay.classList.add("rolling");

    rarityDisplay.textContent = "ROLLING...";
    nameDisplay.textContent = "???";
    descriptionDisplay.textContent = "Đang roll...";


    let counter = 0;


    const animation = setInterval(() => {

        const random =
            emojis[Math.floor(Math.random() * emojis.length)];

        emojiDisplay.textContent =
            random.emoji;

        counter++;

        if (counter >= 15) {

            clearInterval(animation);

            finishRoll();
        }

    }, 70);
}


function finishRoll() {

    const result = getRandomEmoji();

    emojiDisplay.classList.remove("rolling");

    emojiDisplay.textContent =
        result.emoji;

    nameDisplay.textContent =
        result.name;

    rarityDisplay.textContent =
        result.rarity;

    rarityDisplay.className =
        result.rarity.toLowerCase();

    descriptionDisplay.textContent =
        "Bạn đã roll được emoji này!";

    rolls++;

    rollsDisplay.textContent =
        rolls;


    const id =
        result.rarity + "_" +
        result.name;

    collected.add(id);

    collectedDisplay.textContent =
        collected.size + " / " + emojis.length;


    addHistory(result);

    renderCollection();

    rollButton.disabled = false;
}


function addHistory(result) {

    history.unshift(result);

    if (history.length > 30) {
        history.pop();
    }

    historyDisplay.innerHTML = "";

    history.forEach(item => {

        const div =
            document.createElement("div");

        div.className =
            "history-item";

        div.innerHTML = `
            <div class="history-emoji">
                ${item.emoji}
            </div>

            <div>
                <div class="history-name">
                    ${item.name}
                </div>

                <div class="history-rarity ${item.rarity.toLowerCase()}">
                    ${item.rarity}
                </div>
            </div>
        `;

        historyDisplay.appendChild(div);
    });
}


function renderCollection() {

    collectionDisplay.innerHTML = "";

    emojis.forEach(item => {

        const id =
            item.rarity + "_" +
            item.name;

        const unlocked =
            collected.has(id);

        const card =
            document.createElement("div");

        card.className =
            "card";

        if (!unlocked) {
            card.classList.add("locked");
        }

        card.innerHTML = `

            <div class="card-emoji">
                ${unlocked ? item.emoji : "❓"}
            </div>

            <div class="card-name">
                ${unlocked ? item.name : "???"}
            </div>

            <div class="card-rarity ${item.rarity.toLowerCase()}">
                ${item.rarity}
            </div>

        `;

        collectionDisplay.appendChild(card);
    });
}


/* QUAN TRỌNG: GÁN SỰ KIỆN CHO NÚT */

rollButton.addEventListener("click", rollEmoji);


/* Cho phép nhấn SPACE để roll */

document.addEventListener("keydown", function(event) {

    if (
        event.code === "Space" &&
        !rollButton.disabled
    ) {

        event.preventDefault();

        rollEmoji();
    }

});


renderCollection();