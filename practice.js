document.addEventListener("DOMContentLoaded", function () {
    const textContainer = document.getElementById("sentence");
    const inputBox = document.getElementById("input-box");
    const timerDisplay = document.getElementById("timer");
    const accuracyDisplay = document.getElementById("accuracy");
    const speedDisplay = document.getElementById("speed");
    const resultSection = document.getElementById("result");
    const finalSpeed = document.getElementById("final-speed");
    const finalAccuracy = document.getElementById("final-accuracy");
    const restartBtn = document.getElementById("restart");

    const sentences = [
        "Typing fast is a useful skill.",
        "The quick brown fox jumps over the lazy dog.",
        "Practice makes a person perfect in typing.",
        "JavaScript is a powerful programming language.",
        "Accuracy is more important than speed.",
        "Coding requires patience and consistency."
    ];

    let currentSentence = "";
    let typedCharacters = 0;
    let errors = 0;
    let startTime = null;
    let inputLocked = false; // Prevents multiple changes

    function setNewSentence() {
        inputLocked = false; // Unlock input for the next sentence
        currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
        textContainer.innerHTML = "";
        currentSentence.split("").forEach(char => {
            const span = document.createElement("span");
            span.innerText = char;
            textContainer.appendChild(span);
        });
        inputBox.value = "";
        inputBox.focus();
        typedCharacters = 0;
        errors = 0;
        startTime = null;
        updateStats();
    }

    function updateStats() {
        const elapsedTime = startTime ? (Date.now() - startTime) / 1000 : 0;
        const wpm = elapsedTime > 0 ? Math.round((typedCharacters / 5) / (elapsedTime / 60)) : 0;
        const accuracy = typedCharacters > 0 ? Math.max(0, Math.round(((typedCharacters - errors) / typedCharacters) * 100)) : 100;
        
        timerDisplay.innerText = `Time: ${Math.floor(elapsedTime)}s`;
        speedDisplay.innerText = `Speed: ${wpm} WPM`;
        accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;
    }

    inputBox.addEventListener("input", function () {
        if (!startTime) startTime = Date.now();
        if (inputLocked) return; // Prevents multiple sentence changes

        const inputValue = inputBox.value;
        const spans = textContainer.querySelectorAll("span");

        typedCharacters = inputValue.length;
        errors = 0;

        for (let i = 0; i < spans.length; i++) {
            if (i < inputValue.length) {
                if (inputValue[i] === currentSentence[i]) {
                    spans[i].style.color = "limegreen";
                    spans[i].style.fontWeight = "bold";
                } else {
                    spans[i].style.color = "red";
                    spans[i].style.fontWeight = "bold";
                    errors++;
                }
            } else {
                spans[i].style.color = "#fff";
                spans[i].style.fontWeight = "normal";
            }
        }
        updateStats();

        if (inputValue.length >= currentSentence.length) {
            inputLocked = true; // Prevents re-triggering
            setTimeout(setNewSentence, 1000);
        }
    });

    inputBox.addEventListener("keydown", function (event) {
        if (event.key === "Backspace") {
            typedCharacters = Math.max(0, typedCharacters - 1);
        }
    });

    restartBtn.addEventListener("click", function () {
        setNewSentence();
    });

    setNewSentence();
});
