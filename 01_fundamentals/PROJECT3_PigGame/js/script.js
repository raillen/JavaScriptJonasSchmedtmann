'use strict'

const btnNewGame = document.querySelectorAll('.btn_new-game')
const btnDice = document.querySelector('.btn_dice img')
const btnRollDice = document.querySelector('.btn_row-dice')
const btnHold = document.querySelector('.btn_hold')
const modal = document.querySelector('.modal')

// player 1
const player1 = document.querySelector('#first')
// player 2
const player2 = document.querySelector('#second')

let activePlayer = 0
let points = 0

btnDice.style.display = 'none'
modal.style.display = 'none'

// ------------------------------------------------------------------ \\
class Player {
    constructor(_player) {
        this.score = _player.querySelector('.player-score')
        this.current = _player.querySelector('.player-current p')
    }

    currentPoints(_points){
        this.current.textContent = _points
    }
    scorePoints(_points){
        this.score.textContent = _points
    }
    holdPoints(){
        return parseInt(this.score.textContent)
    }
}

function whoWin(winner){
    let w = winner.toLowerCase()
    modal.style.display = 'flex'
    document.querySelector('.buttons').style.display = 'none'
    document.querySelector('.board').style.display = 'none'

    if(w == 'draw'){
        modal.querySelector('span').innerHTML = '❌'
        modal.querySelector('h1').textContent = 'Draw'
    }
    else if(w == 'p1'){
        modal.querySelector('span').innerHTML = '🏆'
        modal.querySelector('h1').textContent = 'Player 1'
    }
    else{
        modal.querySelector('span').innerHTML = '🏆'
        modal.querySelector('h1').textContent = 'Player 2'
    }

}
function whoPlaying(){
    player1.classList.replace('activated', 'deactivated')
    player2.classList.replace('deactivated', 'activated')
}

const p1 = new Player(player1)
const p2 = new Player(player2)


btnRollDice.addEventListener('click', ()=>{
    let random = Math.ceil(Math.random() * 6)

    btnDice.style.display = 'block'
    btnDice.src = `../assets/dice-${random}.svg`

    if(activePlayer === 0){
        if(random <= 1){
            activePlayer = 1
            points = 0
            p1.currentPoints(points)
            whoPlaying()
        }
        else{
            points += random
            p1.currentPoints(points)
        }
    }
    else if(activePlayer === 1){
        if(random <= 1){
            activePlayer = 1
            points = 0
            p2.currentPoints(points)
            if(p1.holdPoints() == 0) whoWin("draw")
        }
        else{
            points += random
            p2.currentPoints(points)
        }
    }

})

btnHold.addEventListener('click', ()=>{
    if(activePlayer === 0){
        p1.scorePoints(points)
        points = 0
        activePlayer = 1
        whoPlaying()
    }
    else if(activePlayer === 1){
        p2.scorePoints(points)

        if(p1.holdPoints() > p2.holdPoints()){
            whoWin("p1")
        }
        else if(p1.holdPoints() < p2.holdPoints()){
            whoWin("p2")
        }
        else{
            whoWin("draw")
        }
    }
})

btnNewGame.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        location.reload()
    })
})
