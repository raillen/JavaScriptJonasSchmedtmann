'use strict'
const modal = document.querySelector('.modal')
const overlay = document.querySelector('.overlay')
const btnsShowModal = document.querySelectorAll('.show-modal')
const btnCloseModal = document.querySelector('.close-modal')

const hideUnhideElement = (action, elements=[])=>{
    for(const el of elements){
        action.toLowerCase() === 'unhide' ?
        document.querySelector(el).classList.remove('hidden') :
        document.querySelector(el).classList.add('hidden')
    }
    
}

for(let btn of btnsShowModal){
    btn.addEventListener('click',()=>{
        hideUnhideElement('unhide', ['.modal', '.overlay'])
    })
}

btnCloseModal.addEventListener('click', ()=>{
    hideUnhideElement('hide', ['.modal', '.overlay'])
})

overlay.addEventListener('click', ()=>{
    hideUnhideElement('hide', ['.modal', '.overlay'])
})

document.addEventListener('keydown',(e)=>{
    if(e.key === "Esc" || e.key === "Escape")
    hideUnhideElement('hide', ['.modal', '.overlay'])
})