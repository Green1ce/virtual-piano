const keys = document.querySelectorAll('.piano-key');
const notes = document.querySelector('#notes_btn');
const letters = document.querySelector('#letters_btn');

notes.onclick = function () {
    notes.classList.add('btn-active');
    letters.classList.remove('btn-active');
    keys.forEach(el => {
        el.classList.remove('letter');
    })
};

letters.onclick = function () {
    notes.classList.remove('btn-active');
    letters.classList.add('btn-active');
    keys.forEach(el => {
        el.classList.add('letter');
    })
};

function playPiano(e){
    if (!e.repeat) {
        const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        key.classList.add('piano-key-active');
    }
}

function stopPiano(e){
    const key = document.querySelector(`.piano-key[data-key="${e.keyCode}"]`);
    if (!key) return;
    key.classList.remove('piano-key-active');
}

keys.forEach(el => el.onmousedown = function () {
    const key = this.dataset.key;
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
    this.classList.add('piano-key-active');
    keys.forEach(el => el.onmouseover = function (){
        const key = this.dataset.key;
        const audio = document.querySelector(`audio[data-key="${key}"]`);
        if (!audio) return;
        audio.currentTime = 0;
        audio.play();
        this.classList.add('piano-key-active');
    })
    keys.forEach(el => el.onmouseout = function(){
        const key = this.dataset.key;
        this.classList.remove('piano-key-active');
    })
    keys.forEach(el => el.onmouseup = function () {
        this.classList.remove('piano-key-active');
        keys.forEach(elem => elem.onmouseover = function () {})
    })
});

document.querySelector('.fullscreen').addEventListener('click', function() {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.querySelector('#fullscreen-element').requestFullscreen();
});

window.addEventListener('keydown', playPiano);
window.addEventListener('keyup', stopPiano);