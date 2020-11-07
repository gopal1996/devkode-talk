// navigation
const navItem = document.querySelector('.navigation')
navItem.addEventListener('click', activeNav)

function activeNav(event) {
    const { path } = event;
    document.querySelector('.active').classList.remove("active")
    path[1].classList.add("active")
}

let delay = Promise.resolve();

const classes = {
    [Event.AT_TARGET]: 'target-indicator',
    [Event.BUBBLING_PHASE]: 'bubble-indicator',
    [Event.CAPTURING_PHASE]: 'capture-indicator',
};

function eventHandler(event) {
    const {currentTarget, eventPhase} = event;
    delay = delay.then(() => new Promise((resolve) => {
        currentTarget.classList.add(classes[eventPhase]);
        setTimeout(() => currentTarget.classList.remove(classes[eventPhase]), 600);
        setTimeout(resolve, 900);
    }));
}


// Event Bubbling
const bubbling = document.querySelectorAll('.bubble')

bubbling.forEach(element => {
    element.removeEventListener('click', eventHandler)
    element.addEventListener('click', eventHandler)
})

// Event Capturing
const capturing = document.querySelectorAll('.capture')

capturing.forEach(element => {
    element.removeEventListener('click', eventHandler, true)
    element.addEventListener('click', eventHandler, true)
})

// Both Event Bubbling and Capturing
const mix = document.querySelectorAll('.mix');

mix.forEach(element => {
    element.removeEventListener('click', eventHandler)
    element.addEventListener('click', eventHandler)
    element.removeEventListener('click', eventHandler, true)
    element.addEventListener('click', eventHandler, true)
})


// Stop Propogate
let isModalOpen = false;
const modalButton = document.querySelector('#open-modal')
const modal = document.querySelector('.modal')

modal.addEventListener('click', function(event) {
    event.stopPropagation()
})

modalButton.addEventListener('click', function(event) {
    event.stopPropagation()
    isModalOpen = !isModalOpen;
    console.log("running")
    toggleModal(isModalOpen)
})

document.querySelector('body').addEventListener('click', function(e) {
    if(isModalOpen){
        isModalOpen = !isModalOpen;
        toggleModal(isModalOpen)
    }
})

function toggleModal(isModalOpen) {
    if(isModalOpen) {
        modal.classList.add('modal-open')
    } else {
        modal.classList.remove('modal-open')
    }
}