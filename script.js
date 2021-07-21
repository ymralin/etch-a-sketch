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

const settingsContainer = document.querySelector('.setting')
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
    // console.log(this);
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
                btn1.classList.remove('toggled');
            
            }
        }
    }

}

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

