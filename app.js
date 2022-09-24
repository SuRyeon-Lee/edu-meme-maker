const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;

ctx.fillRect(210,200,15,100);
ctx.fillRect(360,200,15,100);
ctx.fillRect(260,200,60,200);

ctx.arc(290, 130, 50, 0, 2 * Math.PI); //원중심점 기준 (x위치,y위치,반지름,시작각,끝각)
ctx.fill();

ctx.beginPath();
ctx.fillStyle = 'white';
ctx.arc(280, 120, 5, Math.PI, 2 * Math.PI);
ctx.arc(300, 120, 5, Math.PI, 2 * Math.PI);
ctx.fill();

ctx.beginPath();
ctx.lineWidth = 4
ctx.strokeStyle = 'pink';
ctx.arc(290, 130, 20, 0, 1 * Math.PI);
ctx.stroke();
