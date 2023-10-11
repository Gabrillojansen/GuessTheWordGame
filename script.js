const words = [
    {
        hint: "Dala mo’t sunong, ikaw rin ang baon.",
        word: "Kuto"
    },
    {
        hint: "Kung manahi ‘y nagbabaging at sa gitna’y tumitigil.",
        word: "Gagamba"
    },
    {
        hint: "May ulo’y walang buhok, may tiyan walang pusod.",
        word: "Palaka"
    },
    {
        hint: "Alalay kong bilugan, puro tubig ang tiyan.",
        word: "Batya"
    },
    {
        hint: "Panakip sa nakabotelya, yari lata.",
        word: "Tansan"
    },
];

const boxes = document.querySelector(".boxes");
const hint = document.getElementById("hint");
const guess = document.querySelector(".guess");
const resetWordBtn = document.getElementById("reset-word-btn");
const userInput = document.querySelector(".user-input");
const displayUserInput = document.querySelector(".display-user-input");

let selectedRandomWord = "";
let selectedRandomWordHint = "";
let remainingGuess = 5;
let wrongLetters = [];

function generateRandomWord() {
    remainingGuess = 5;
    wrongLetters = [];

    const randomWord = words[Math.floor(Math.random() * words.length)];
    selectedRandomWord = randomWord.word.toUpperCase();
    selectedRandomWordHint = randomWord.hint;
    console.log(selectedRandomWord);

    let html = "";
    for (let i = 0; i < selectedRandomWord.length; i++) {
        html += '<input type="text" disabled>';
    }
    boxes.innerHTML = html;

    guess.innerHTML = `
    <p>Hint:</p> ${selectedRandomWordHint} <br>
    <p>Remaining Guess:</p> ${remainingGuess} <br>
    <p>Wrong Letters:</p> ${wrongLetters}
    `;
    displayUserInput.innerHTML = "";
}
generateRandomWord();

function initGame(event) {
    let key = event.target.value.toUpperCase();
    displayUserInput.innerHTML = `"${userInput.value.toUpperCase()}"`;
    userInput.value = "";

    if (remainingGuess > 0 ) {
        if (selectedRandomWord.includes(key)) {
              for (let i = 0; i < selectedRandomWord.length; i++) {
                if (selectedRandomWord[i] === key) {
                  boxes.querySelectorAll("input")[i].value = key;
                }
              }
        } else {
            remainingGuess -= 1;
            wrongLetters.push(key);
        }
    } else {
        alert("Game Over! You dont have remaining guess.");
        for (let i = 0; i < selectedRandomWord.length; i++) {
            boxes.querySelectorAll("input")[i].value = selectedRandomWord[i];
        }
        displayUserInput.innerHTML = "";
    }

      guess.innerHTML = `
    <p>Hint:</p> ${selectedRandomWordHint} <br>
    <p>Remaining Guess:</p> ${remainingGuess} <br>
    <p>Wrong Letters:</p> ${wrongLetters.join(" ")}
    `;
}

resetWordBtn.addEventListener("click", () => generateRandomWord());
document.addEventListener("keypress", () => userInput.focus());
userInput.addEventListener("input", initGame);
 