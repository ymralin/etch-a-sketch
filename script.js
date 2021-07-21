function paintingAction(e){
    if(currentPaintMode=='black'){
        this.style.backgroundColor = 'rgb(0,0,0)';
        this.style.border = 'solid 1px rgb(0,0,0)'
    } else if (currentPaintMode=='red') {
        this.style.backgroundColor = 'red';
        this.style.border = 'solid 1px red'
    } else if (currentPaintMode=='erase') {
        this.style.backgroundColor = 'rgb(255,255,255)';
        this.style.border = 'solid 1px rgb(0,0,0)';
    } else if (currentPaintMode=='random') {
        let c1='rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')';
        this.style.backgroundColor = c1;
        this.style.border = 'solid 1px ' + c1;
    } else if (currentPaintMode=='shade') {
        let curRGB = this.style.backgroundColor.replace('rgb(', '').replace(')','').split(',');
        let R = curRGB[0];
        let G = curRGB[1];
        let B = curRGB[2];
        let c1='rgb(' + R*0.9 + ',' + G*0.9 + ',' + B*0.9 + ')';
        this.style.backgroundColor = c1;
        this.style.border = 'solid 1px ' + c1;
    }
    checkToggle();
};

const settingsContainer = document.querySelector('.setting')
const buttonContainer = document.querySelector('.buttonContainer');

for (i=0; i<5; i++){
    const btn = document.createElement('div');
    btn.classList.add('btn');
    btn.id='btn' +(i+1);
    buttonContainer.appendChild(btn);
    btn.addEventListener('click', clicked);
    btn.addEventListener('transitionend', removeTransition);
};

function clicked(e) {
    this.classList.add('clicked');
};

function removeTransition(e){
    this.classList.remove('clicked')
};

const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');
const btn4 = document.querySelector('#btn4');
const btn5 = document.querySelector('#btn5');

let paintModes=['black', 'red', 'erase', 'random', 'shade']; //red was made for testing and left here just in case...
let currentPaintMode = paintModes[0];

btn1.textContent = 'Black'
btn2.textContent = 'Random color'
btn3.textContent = 'Eraser'
btn4.textContent = 'Shade'
btn5.textContent = 'Reset sketch'

btn1.addEventListener('click', blackColor);
btn2.addEventListener('click', randomColor);
btn3.addEventListener('click', eraser);
btn4.addEventListener('click', shade);
btn5.addEventListener('click', resetSketch);

function blackColor() {
    currentPaintMode = paintModes[0];
    checkToggle();
};

function randomColor() {
    currentPaintMode = paintModes[3];
    checkToggle();
};

function eraser() {
    currentPaintMode = paintModes[2];
    checkToggle();
};

function shade() {
    currentPaintMode = paintModes[4];
    checkToggle();

};

function checkToggle() {
    if(currentPaintMode == paintModes[0]) {
        btn1.classList.add('toggled')
        btn2.classList.remove('toggled')
        btn3.classList.remove('toggled')
        btn4.classList.remove('toggled')
    } else if(currentPaintMode == paintModes[2]) {
        btn1.classList.remove('toggled')
        btn2.classList.remove('toggled')
        btn3.classList.add('toggled')
        btn4.classList.remove('toggled')
    } else if(currentPaintMode == paintModes[3]) {
        btn1.classList.remove('toggled')
        btn2.classList.add('toggled')
        btn3.classList.remove('toggled')
        btn4.classList.remove('toggled')
    } else if(currentPaintMode == paintModes[4]) {
        btn1.classList.remove('toggled')
        btn2.classList.remove('toggled')
        btn3.classList.remove('toggled')
        btn4.classList.add('toggled')
    }
}
function resetSketch() {
    const cells=document.querySelectorAll('.divCell');
    cells.forEach(cell => cell.style.backgroundColor = 'rgb(255,255,255)');
    cells.forEach(cell => cell.style.border = 'solid 1px black');
    currentPaintMode = paintModes[0];
    checkToggle();
};

const resizeBtn = document.querySelector('#resizeBtn')
resizeBtn.addEventListener('click', clicked);
resizeBtn.addEventListener('transitionend', removeTransition);
resizeBtn.textContent = 'Resize';
resizeBtn.addEventListener('click', resizeBoard);

function resizeBoard() {
    const colNumInput = document.querySelector('#colsNum');
    const rowNumInput = document.querySelector('#rowsNum');
    const colNum = Number(colNumInput.value);
    const rowNum = Number(rowNumInput.value);
    if ((!isNaN(colNum)) && (!isNaN(rowNum))) {
        if ((4<=colNum && colNum<=64) && (4<=rowNum && rowNum<=64)){
            if (colNum<=rowNum*1.5 && rowNum<=colNum*1.5) {
                drawBoard(colNum, rowNum)
                colNumInput.value = "";
                rowNumInput.value = "";
                painting=true;
            };
        };
    };
};

function drawBoard(cols, rows) {
    clearBoard();
    
    const sketchBoard = document.querySelector('.sketchBoard');
    sketchBoard.style.width = '480px'
    sketchBoard.style.height = rows/cols * 480 + 'px'
    for (i=0; i<cols; i++) {
        for (j=0; j<rows; j++) {
            const div = document.createElement('div');
            div.className = 'divCell';
            div.id = 'divCell' + i + "-" + j;
            sketchBoard.appendChild(div);
            div.addEventListener('mouseover', paintingAction);
            div.style.width = sketchBoard.style.width / cols
            div.style.height = sketchBoard.style.height / rows
            div.style.backgroundColor = 'rgb(255,255,255)'
        }
    }
    let cT
    cT = ""
    for (i=0; i<cols; i++) {
        cT = cT + "1fr "
    }
    sketchBoard.style.gridTemplateColumns = cT
}

function clearBoard() {
    document.querySelectorAll('.divCell').forEach(div => document.querySelector('.sketchBoard').removeChild(div))
}

drawBoard(16,16);

checkToggle();