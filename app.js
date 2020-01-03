const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 500;

//canvas 의 실질적인 사이즈는 여기서 부여함. CSS 에서 700px는 보여지는 것 뿐..
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

//canvas load 시 배경 색 white로 초기화
ctx.fillStyle = "white";
ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);

//우리가 그릴 선들이 모두 이색을 가짐.
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR
//선의 너비
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick(){
    if(filling){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling == true){
        ctx.fillRect(0,0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleCM(event){
    //우클릭 방지
    event.preventDefault();
}

function handleSaveClick(evnet){
    //기본은 png이고 내가 jpeg로 설정하였음.
    const image = canvas.toDataURL("image/jpeg")
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJs";

    link.click()
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove)
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

if(colors){
    Array.from(colors).forEach(color =>
        color.addEventListener("click", handleColorClick)
    );
}
if(range){
    range.addEventListener("input", handleRangeChange);
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}