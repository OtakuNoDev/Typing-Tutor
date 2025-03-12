const letterSets = [
    ["E", "N", "I", "R", "A", "L"],
    ["T", "O", "P", "C", "M", "S"],
    ["G", "H", "D", "B", "U", "V"],
    ["K", "J", "X", "Z", "Q", "Y"]
];

const words = {
    "ENIRAL": [
        "ear air ran lean line rail near real alien linear earlier",
        "reliant reliance alliance learning linear realism realism"
    ],
    "TOPCMS": [
        "top opt stop post cost spot comp scout stomp optics",
        "composite compost complicate computation compromise completion"
    ],
    "GHDBUV": [
        "bud hug bug hub dug duo bivouac vivid debug buildup",
        "background biodiversity biodegradable unbelievable uninhabitable"
    ],
    "KJXZQY": [
        "jay yak zip jinx quiz quay zany quixy kayak jazzy",
        "jackpot juxtapose jeopardize quicksilver oxygenize quizzical"
    ]
};

let currentSetIndex = 0;
let currentWords = [];
let wordIndex = 0;
let letterIndex = 0;
let correctCount = 0;
let totalCount = 0;
let startTime = Date.now();

const wordDisplay = document.getElementById("word-display");
const inputBox = document.getElementById("input-box");
const speedDisplay = document.getElementById("speed");
const accuracyDisplay = document.getElementById("accuracy");
const restartButton = document.getElementById("restart");

function loadNewSet() {
    let letters = letterSets[currentSetIndex];
    currentWords = words[letters.join("")] || [];
    wordIndex = 0;
    letterIndex = 0;
    displayNextWord();
}

function displayNextWord() {
    if (wordIndex < currentWords.length) {
        highlightText(currentWords[wordIndex], 0);
    } else {
        currentSetIndex = (currentSetIndex + 1) % letterSets.length;
        loadNewSet();
    }
}

function highlightText(word, index) {
    let highlighted = "";

    for (let i = 0; i < word.length; i++) {
        if (i < index) {
            highlighted += `<span class="correct">${word[i]}</span>`;
        } else if (i === index) {
            highlighted += `<span class="current">${word[i]}</span>`;
        } else {
            highlighted += `<span>${word[i]}</span>`;
        }
    }

    wordDisplay.innerHTML = highlighted;
}

inputBox.addEventListener("input", function () {
    let typed = inputBox.value;
    let target = currentWords[wordIndex];

    if (typed === target) {
        correctCount += target.length;
        totalCount += target.length;
        wordIndex++;
        letterIndex = 0;
        inputBox.value = "";
        displayNextWord();
        return;
    }

    totalCount++;

    let highlighted = "";
    for (let i = 0; i < target.length; i++) {
        if (i < typed.length) {
            if (typed[i] === target[i]) {
                highlighted += `<span class="correct">${target[i]}</span>`;
            } else {
                highlighted += `<span class="wrong">${target[i]}</span>`;
            }
        } else if (i === typed.length) {
            highlighted += `<span class="current">${target[i]}</span>`;
        } else {
            highlighted += `<span>${target[i]}</span>`;
        }
    }

    wordDisplay.innerHTML = highlighted;

    let elapsedTime = (Date.now() - startTime) / 60000;
    let speed = Math.round((correctCount / elapsedTime) || 0);
    let accuracy = totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;

    speedDisplay.textContent = `${speed} WPM`;
    accuracyDisplay.textContent = `${accuracy}%`;
});

restartButton.addEventListener("click", function () {
    currentSetIndex = 0;
    correctCount = 0;
    totalCount = 0;
    startTime = Date.now();
    loadNewSet();
    inputBox.value = "";
});

loadNewSet();
