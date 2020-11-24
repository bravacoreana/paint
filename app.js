const canvas = document.getElementById("js-canvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("js-color");
const range = document.getElementById("js-range");
const mode = document.getElementById("js-mode");
const saveBtn = document.getElementById("js-save");

const INITIAL_COLOR = "#2d3436";
const CANVAS_WIDTH_SIZE = 680;
const CANVAS_HEIGHT_SIZE = 680;

canvas.width = CANVAS_WIDTH_SIZE;
canvas.height = CANVAS_HEIGHT_SIZE;

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, CANVAS_WIDTH_SIZE, CANVAS_HEIGHT_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function startPainting() {
	painting = true;
}

function stopPainting() {
	painting = false;
}

function onMouseMove(event) {
	const x = event.offsetX;
	const y = event.offsetY;
	if (!painting) {
		ctx.beginPath();
		ctx.moveTo(x, y);
	} else {
		ctx.lineTo(x, y);
		ctx.stroke();
	}
}

function handleColorClick(event) {
	const color = event.target.style.backgroundColor;
	ctx.strokeStyle = color;
	ctx.fillStyle = color;
}

function handleRangeChange(event) {
	const strokeSize = event.target.value;
	ctx.lineWidth = strokeSize;
}

function handleModeClick(event) {
	if (filling === true) {
		filling = false;
		mode.innerText = "FILL";
	} else {
		filling = true;
		mode.innerText = "PAINT";
	}
}

function handleCanvasClick() {
	if (filling) {
		ctx.fillRect(0, 0, CANVAS_WIDTH_SIZE, CANVAS_HEIGHT_SIZE);
	}
}

function handleContextMenu(event) {
	event.preventDefault();
}

function handleSaveClick(event) {
	const image = canvas.toDataURL();
	const link = document.createElement("a");
	link.href = image;
	link.download = "noname";
	link.click();
}

if (canvas) {
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleContextMenu);
}

Array.from(colors).forEach((color) => color.addEventListener("click", handleColorClick));

if (range) {
	range.addEventListener("input", handleRangeChange);
}

if (mode) {
	mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
	saveBtn.addEventListener("click", handleSaveClick);
}
