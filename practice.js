// JS FILE: practice.js
const letterSets = [
    ["E", "N", "I", "R", "A", "L"],
    ["T", "O", "P", "C", "M", "S"],
    ["G", "H", "D", "B", "U", "V"],
    ["K", "J", "X", "Z", "Q", "Y"]
];

const words = {
    "ENIRAL": [
        "The feline reclined gracefully on the woven mat, basking in the golden sunlight.",
        "The bat deftly navigated through the dense foliage and comprehended its surroundings with echolocation.",
        "The inquisitive rodent swiftly consumed the cleverly concealed lure, unaware of the impending consequence.",
        "The enigmatic alien observed Earth’s intricate societies, pondering their complex behaviors.",
        "Linear progression in learning is crucial for developing critical analytical skills and innovation."
    ],
    "TOPCMS": [
        "The vigilant canine trotted confidently through the dense mist, sensing unseen movements around it.",
        "The sturdy timber, once a towering tree, lay partially submerged in the vast and treacherous marshland.",
        "The amphibian perched delicately on the decaying timber, blending seamlessly into the mossy surroundings.",
        "The expert scout stomped on the freshly decomposed compost, ensuring proper aeration for microbial activity.",
        "Optics and computation intertwine in the world of artificial intelligence, driving innovation in visual processing."
    ],
    "GHDBUV": [
        "The diligent insect meticulously burrowed into the thick carpet fibers, creating an elaborate network of tunnels.",
        "The porcelain cup was delicately placed on the intricately designed pitcher, balancing with remarkable precision.",
        "The heartfelt embrace was warm and reassuring, a silent promise of unwavering support and companionship.",
        "The tiny bug dug a secure hub within the damp soil, carefully crafting its subterranean refuge.",
        "Biodiversity thrives in ecosystems where environmental balance is meticulously maintained, preserving nature’s vivid beauty."
    ],
    "KJXZQY": [
        "The cunning vulpine, hidden within the reinforced container, waited patiently for the perfect moment to escape.",
        "The bovine, adorned with vibrantly patterned hosiery, paraded through the barnyard with an air of elegance.",
        "The magnificent salmon, battling relentless currents, navigated its way back to the very container it once inhabited.",
        "The mischievous jay and the restless yak conspired to jinx the ambitious scholar’s ultimate quiz performance.",
        "Juxtapose the glittering jackpot with the mercurial quicksilver, and you reveal the fleeting nature of fortune."
    ]
};

let currentSetIndex = 0;
let currentWords = [];
let wordIndex = 0;
let letterIndex = 0;
let correctCount = 0;
let totalCount = 0;

const wordDisplay = document.getElementById("word-display");
const inputBox = document.getElementById("input-box");
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
                correctCount++;
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
});

restartButton.addEventListener("click", function () {
    currentSetIndex = 0;
    correctCount = 0;
    totalCount = 0;
    loadNewSet();
    inputBox.value = "";
});

loadNewSet();