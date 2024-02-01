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

let randomWord 
let tries = 0

const wordContainer = document.querySelector(".word-container")
const btnRandom = document.getElementById("btn-random")
const btnReset = document.getElementById("btn-reset")

const wordSscramble = document.querySelector(".word-scramble")

btnRandom.addEventListener("click", changeRandomWord)

function changeRandomWord() {
    getRandomWord()
    wordSscramble.innerHTML = scrambleWord(getRandomWord())
    generateWordInputs(wordSscramble.innerHTML.length)
}

function checkLetter(letter, pos) {
    const letterWord = randomWord.charAt(pos)
    let gameWon = false
    if (letter == "") {
        return
    } 

    if(letter == letterWord) {
        console.log("SAMEE")
        //go to the next box
        //check if the game is won
        gameWon = checkWonGame()
        if (!gameWon) {
            const nextEl = document.querySelectorAll(".letter-word")[pos + 1]
            nextEl.focus()
        }
    } else {
        //añadir a la lista de letras erroneas
        addMistake(letter)
        //bajar una vida
        loseOneTry()
    }
}

function checkWonGame() {

    const wordLetters = document.querySelectorAll(".letter-word")
    let worldPut = ""
    for (let i = 0; i <wordLetters.length;i++) {
        worldPut +=  wordLetters[i].value
    }
    if (randomWord === worldPut) {
        window.alert("You Won!")
        return true
    }
    return false
}

const tagTries = document.querySelector(".tag")

function loseOneTry() {
    loseLife(tries)
    tries+= 1
    changeTagTries()
    if (tries == 5) {
        window.alert('You lose!')
        reset()
    }
}

function addMistake(letter) {
    letterMistake.innerHTML.trim() == "" ? 
        letterMistake.innerHTML += '<div class="letter">' + letter + '</div>' :
        letterMistake.innerHTML += '<div class="letter">, ' + letter + '</div>'
}

function getRandomWord() {
    randomWord = RANDOM_WORDS[Math.floor((Math.random() * RANDOM_WORDS.length))]
    return randomWord
}
function generateWordInputs(lengthWord) {
    wordContainer.innerHTML = ""
    for(let i = 0; i < lengthWord; i++) {
        wordContainer.innerHTML += 
        `<input type='text' class='letter-word' maxlength='1' oninput='checkLetter(this.value,` + i + ` )'>`
    }
}

function scrambleWord(word) {
        const arrayWord = word.split("")
        let arrayWordCopy = []
        let i = 0

        arrayWord.map( el => {
            arrayWordCopy.push(i)
            i++
        })

        let scrambleWord = ""
        let index = 0
        let index2 = 0
        for(let j = 0; j < arrayWord.length; j++) {

            index = Math.floor((Math.random() * arrayWordCopy.length))
            index2 = arrayWordCopy[index]
            arrayWordCopy.splice(index, 1)
            scrambleWord += arrayWord[index2]
        }
        return scrambleWord;
}
function init() {
    changeRandomWord()
    changeTagTries()
}

const lifes = document.querySelector(".list-circles")

function loseLife(tries) {
    const idLife = "life_" + tries
    const life = document.getElementById(idLife)
    life.style.backgroundColor = '#4A5567'
}

function changeTagTries() {
    tagTries.innerHTML = "Tries ("+ tries + "/5):"
}

init()

btnReset.addEventListener("click", reset)
const letterMistake = document.querySelector(".letters-mistake")

function changeStyleLifes() {
    const lifes = document.querySelectorAll(".try-circle")
    for (let i = 0; i <lifes.length;i++) {
        lifes[i].style.backgroundColor = '#7429C6'
    }
}
function reset() {
    const lengthWord = wordSscramble.innerHTML.length
    generateWordInputs(lengthWord)
    letterMistake.innerHTML = ""
    tries = 0
    changeTagTries()
    changeStyleLifes()
}