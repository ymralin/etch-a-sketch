const sketchBoard = document.querySelector('.sketchBoard');
for (i=0; i<256; i++) {
    const div = document.createElement('div');
    div.className = 'divCell';
    sketchBoard.appendChild(div);
        div.addEventListener('mouseover', paintingAction);
}

function paintingAction(e){
    console.log(this)
    if(painting==true){
        this.classList.add('painted');
    } else{
        this.classList.remove('painted');
    }
};

function paint(e) {
    this.classList.add('painted');

};

function erase(e) {
    this.classList.remove('painted');
};

let painting=true;

const buttonContainer = document.querySelector('.buttonContainer');


for (i=0; i<2; i++){
    const btn = document.createElement('div');
    btn.classList.add('btn');
    btn.id='btn' +(i+1);
    buttonContainer.appendChild(btn);
    btn.addEventListener('click', clicked);
    btn.addEventListener('transitionend', removeTransition);
};

function clicked(e) {
    this.classList.add('clicked');
    console.log(this);
}

function removeTransition(e){
    this.classList.remove('clicked')
}

const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
btn1.textContent = 'Eraser'
btn2.textContent = 'Reset sketch'
btn1.addEventListener('click', togglePainting);
btn2.addEventListener('click', resetSketch);

function togglePainting(){
    if(painting==true){
        painting=false;
        btn1.classList.add('toggled');
    } else{
        painting=true;
        btn1.classList.remove('toggled');

    }
};

function resetSketch() {
    const cells=document.querySelectorAll('.divCell');
    cells.forEach(cell => cell.classList.remove('painted'))
};