const lineWidth = document.getElementById("line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = lineWidth.value;

//moveTo는 그림을 그리지 않고 그리기 시작할 위치만 예약한다.
//따라서 마우스가 움직일 때마다 moveTo로 초점을 따라가면 그리기 시작할때 그 위치부터 그릴 수 있다.
let isPainting;
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

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup", cancelPainting);

//캔버스를 떠나서 마우스 떼도 돌아오면 드로잉 상태인 것을 해결하기 위해
//1. document에 이벤트를 걸어주거나
// document.addEventListener("mouseup", cancelPainting);
//2. 아님 아래와 같이 mouseleave이벤트를 걸어줄 수 있음
canvas.addEventListener("mouseleave", cancelPainting);
lineWidth.addEventListener("change", onLineWidthChange)