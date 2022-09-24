const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
ctx.lineWidth = 2;

const colors = [
    '#55efc4',
    '#81ecec',
    '#74b9ff',
    '#a29bfe',
    '#00b894',
    '#00cec9',
    '#0984e3',
    '#6c5ce7',
    '#ffeaa7',
    '#fab1a0',
    '#ff7675',
    '#fd79a8'
]

const onClick = (e) => {
    ctx.beginPath()
    ctx.moveTo(0,0);
    const color = colors[Math.floor(Math.random() * colors.length)];
    ctx.strokeStyle = color;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
};

canvas.addEventListener('mousemove',onClick);
