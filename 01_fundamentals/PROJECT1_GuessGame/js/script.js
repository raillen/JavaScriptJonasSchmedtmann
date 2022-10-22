'use strict';
//---------------- FUNÇÕES
let editClasses = function(el){
    return{
        element: document.querySelector(el),
        changeClass(...classes){
            for (const c of this.element.classList)
            this.element.classList.remove(c)
            for(const c of classes)
            this.element.classList.add(c)
        }
    }
}

let guessWhatNum = (randNum, tryNum)=>{
    if(tryNum > randNum) return 'higher'
    if(tryNum < randNum) return 'lower'
    else return 'correct'
}

let message ={
        guess: `🤔 Guess...`,
        correct: `🥳 Congratulations, Correct Number!`,
        higher: `🔺 Too High Number`,
        lower: `🔻 Too Low Number`,
        loose: `👎 Sorry, attempts are over!`,
}
//---------------- Elements ---------------||
//btns
let againBtn = document.querySelector('.header .btn')
let checkBtn = document.querySelector('.main_left-btn')
//inputs
let numberImput = document.querySelector('#main_left-input')
//boxes
let main = document.querySelector('.main')
let secretNumBox = document.querySelector('.header_secret_num')
let guessBox = document.querySelector('.main_right_guessing')
let scoreBox = document.querySelector('.main_right_score div')
let highscoreBox = document.querySelector('.main_right_highscore div')
//handles
let randNum = Math.trunc(Math.random() * 20 + 1)
let score = 20
let highScore = null
let body = editClasses('body')

//---------------- EXECUÇÃO
scoreBox.textContent = score

checkBtn.addEventListener('click', ()=>{
    let guessNum = guessWhatNum(randNum, numberImput.value)


    if(score > 0) {
        switch(guessNum){
            case 'correct':
                body.changeClass('bg-win')
                guessBox.innerHTML = message.correct
                guessBox.style.fontSize = '1.5rem'
                secretNumBox.textContent = randNum
                highscoreBox.textContent = score
                break;
            case 'higher':
                guessBox.innerHTML = message.higher
                guessBox.style.fontSize = '1.5rem'
                scoreBox.textContent = --score
                break;
            case 'lower':
                guessBox.innerHTML = message.lower
                guessBox.style.fontSize = '1.5rem'
                scoreBox.textContent = --score
                break;
            default:
                guessBox.innerHTML = message.guess
                guessBox.style.fontSize = '1.5rem'
        }
    }
})

// reset game
againBtn.addEventListener('click', ()=>{
    guessBox.innerHTML = message.guess
    scoreBox.textContent = 20
    randNum = Math.trunc(Math.random() * 20 + 1)
    secretNumBox.textContent = '?'
    body.changeClass('bg-neutral')
})