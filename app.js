const saveBtn = document.getElementById('save')
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
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
ctx.lineCap = "round"; //선 끝 둥글게

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
function onFileChange(event){
    //인풋에 파일을 넣으면 브라우저가 해당 이미지에 대한 정보를 갖게된다.
    const file = event.target.files[0]; 
    //브라우저가 갖고있는 이미지 정보를 url로 가져온다.
    //이 url은 인터넷에 존재하는 url이 아니고,
    //브라우저가 자신의 메모리에 있는 파일을 드러내는 방식이다.
    //따라서 시크릿모드나, 다른 브라우저론 접근 못한다.
    const url = URL.createObjectURL(file); 
    const image = new Image();
    image.src = url;
    //이벤트 리스너로 로드된 이후로 안걸어주면 이미지가 보이지 않는다.
    image.onload = function(){
        ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value = ''
    }
}
function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save(); //현재의 상채, 색상, 두께 등을 기억하기
        ctx.lineWidth = 1;
        ctx.font = "68px serif";
        ctx.fillText(text, event.offsetX, event.offsetY);
        ctx.restore(); //기억해좠던 상태로 돌아가기
    }
}
function onSaveClick(){
    const url = canvas.toDataURL() //base64 텍스트로 이미지를 나타냄
    const a = document.createElement("a");
    //<a href="파일경로" download="다운로드 받을 파일명"> 태그를 만들고 누르는 것과 같은 효과주기
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick)
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
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);