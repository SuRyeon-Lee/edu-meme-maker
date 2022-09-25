const modeBtn = document.getElementById("mode-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
//그냥 아래와 같이 받아오면 colorOptions는 배열이 아니고, 
// 배열같은(arrayLike) 객체다. 
//따라서 forEach같은 배열 메소드 사용 못한다.
// const colorOptions = document.getElementsByClassName('color-option');
// 따라서 아래와 같이 처리해준다.
const colorOptions = Array.from(
    document.getElementsByClassName('color-option')
)

const lineWidth = document.getElementById("line-width");
const color = document.getElementById("color");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;

//moveTo는 그림을 그리지 않고 그리기 시작할 위치만 예약한다.
//따라서 마우스가 움직일 때마다 moveTo로 초점을 따라가면 그리기 시작할때 그 위치부터 그릴 수 있다.
let isPainting = false;
let isFilling = false;
function onMove(event){
    if(isPainting){
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.moveTo(event.offsetX,event.offsetY); //초점 따라다니다가
}
function onMouseDown(event){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}
function onLineWidthChange(event){
    ctx.lineWidth = event.target.value
}
function onColorChange(event){
    let colorValue;
    if(event.target.dataset.color){
        colorValue = event.target.dataset.color;
        color.value = colorValue;
    }else{
        colorValue = event.target.value;
    }
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
}
function onModeClick(){
    if(isFilling){
        isFilling = false
        modeBtn.innerText = "Fill"
    } else {
        isFilling = true
        modeBtn.innerText = "Draw"
    }
}
function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}
function onDestroyClick(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.strokeStyle = color.value
}
function onEraserClick(){
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);

//캔버스를 떠나서 마우스 떼도 돌아오면 드로잉 상태인 것을 해결하기 위해
//1. document에 이벤트를 걸어주거나
// document.addEventListener("mouseup", cancelPainting);
//2. 아님 아래와 같이 mouseleave이벤트를 걸어줄 수 있음
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick)
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);
colorOptions.forEach(color => color.addEventListener("click", onColorChange))
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);