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
    let totalTypedCharacters = 0;
    let totalErrors = 0;
    let sentenceCount = 0;
    let startTime = null;
    let inputLocked = false;

    function setNewSentence() {
        if (sentenceCount >= 5) {
            showFinalResults();
            return;
        }

        inputLocked = false;
        currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
        textContainer.innerHTML = "";
        currentSentence.split("").forEach(char => {
            const span = document.createElement("span");
            span.innerText = char;
            textContainer.appendChild(span);
        });

        inputBox.value = "";
        inputBox.focus();
    }

    function updateStats() {
        const elapsedTime = startTime ? (Date.now() - startTime) / 1000 : 0;
        const wpm = elapsedTime > 0 ? Math.round((totalTypedCharacters / 5) / (elapsedTime / 60)) : 0;
        const accuracy = totalTypedCharacters > 0 ? Math.max(0, Math.round(((totalTypedCharacters - totalErrors) / totalTypedCharacters) * 100)) : 100;

        timerDisplay.innerText = `Time: ${Math.floor(elapsedTime)}s`;
        speedDisplay.innerText = `Speed: ${wpm} WPM`;
        accuracyDisplay.innerText = `Accuracy: ${accuracy}%`;
    }

    function showFinalResults() {
        const totalTime = (Date.now() - startTime) / 1000;
        const finalWPM = Math.round((totalTypedCharacters / 5) / (totalTime / 60));
        const finalAcc = totalTypedCharacters > 0 ? Math.max(0, Math.round(((totalTypedCharacters - totalErrors) / totalTypedCharacters) * 100)) : 100;
        
        resultSection.style.display = "block";
        finalSpeed.innerText = `Final Speed: ${finalWPM} WPM`;
        finalAccuracy.innerText = `Final Accuracy: ${finalAcc}%`;
    }

    inputBox.addEventListener("input", function () {
        if (!startTime) startTime = Date.now();
        if (inputLocked) return;

        const inputValue = inputBox.value;
        const spans = textContainer.querySelectorAll("span");
        let errors = 0;

        for (let i = 0; i < spans.length; i++) {
            if (i < inputValue.length) {
                if (inputValue[i] === currentSentence[i]) {
                    spans[i].style.color = "limegreen";
                } else {
                    spans[i].style.color = "red";
                    errors++;
                }
            } else {
                spans[i].style.color = "#fff";
            }
        }

        totalTypedCharacters += 1;
        totalErrors += errors;
        updateStats();

        if (inputValue.length >= currentSentence.length) {
            inputLocked = true;
            sentenceCount++;
            setTimeout(setNewSentence, 500);
        }
    });

    restartBtn.addEventListener("click", function () {
        totalTypedCharacters = 0;
        totalErrors = 0;
        sentenceCount = 0;
        startTime = null;
        inputLocked = false;
        timerDisplay.innerText = "Time: 0s";
        speedDisplay.innerText = "Speed: 0 WPM";
        accuracyDisplay.innerText = "Accuracy: 0%";
        resultSection.style.display = "none";
        setNewSentence();
    });

    setNewSentence();
});
