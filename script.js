const RANDOM_WORDS = [
    'flower',
    'citizen',
    'company',
    'culture',
    'different',
    'employee',
    'family',
    'generation',
    'image',
    'machine'
]

const wordContainer = document.querySelector(".word-container")
const btnRandom = document.getElementById("btn-random")
const btnReset = document.getElementById("btn-reset")

const wordSscramble = document.querySelector(".word-scramble")

btnRandom.addEventListener("click", changeRandomWord)

function changeRandomWord() {
    wordSscramble.innerHTML = getRandomWord()
    generateWordInputs(wordSscramble.innerHTML.length)
}
function getRandomWord() {
    const randomWord = RANDOM_WORDS[Math.floor((Math.random() * RANDOM_WORDS.length))]
    console.log(randomWord)
    return randomWord
}
function generateWordInputs(lengthWord) {
    wordContainer.innerHTML = ""
    for(let i = 0; i < lengthWord; i++) {
        wordContainer.innerHTML += 
        `<input type='text' class='letter-word' maxlength='1'>`
    }
}

changeRandomWord()

btnReset.addEventListener("click", reset)
const letterMistake = document.querySelector(".letters-mistake")
const 

function reset() {
    const lengthWord = wordSscramble.innerHTML.length
    generateWordInputs(lengthWord)
    letterMistake.innerHTML = ""
}