const slider = document.querySelector("#slider");
const sliderLabel = document.querySelector("#slider-label");
const grid = document.querySelector("#grid");
const colorPalette = document.querySelector(".tools--color-palette");
const colorPicker = document.querySelector("#color-picker");
const multiSwatch = document.querySelector(".multi");
const eraser = document.querySelector("#eraser");
const trash = document.querySelector("#trash");
const modal = document.querySelector("#modal");
const btnGroup = document.querySelector("#btn-group");
let gridSize = slider.value;
let isDrawing = false;
let color = "#000000";

drawGrid(gridSize);

colorPalette.addEventListener("click", (e) => {
    let target = e.target;
    setActiveTool(target);

    if (target.classList.contains("swatch")) {
        color = getComputedStyle(target).backgroundColor;
    }
});

grid.addEventListener("mousedown", (e) => {
    isDrawing = true;
    let target = e.target;
    draw(target);
});

grid.addEventListener("touchstart", (e) => {
    e.preventDefault();
    isDrawing = true;
    let touch = e.touches[0];
    let target = document.elementFromPoint(touch.clientX, touch.clientY);
    draw(target);
});

grid.addEventListener("mousemove", (e) => {
    if (isDrawing) {
        let target = e.target;
        draw(target);
    }
});

grid.addEventListener("touchmove", (e) => {
    e.preventDefault();
    if (isDrawing) {
        let touch = e.touches[0];
        let target = document.elementFromPoint(touch.clientX, touch.clientY);
        draw(target);
    }
});

document.addEventListener("mouseup", () => {
    isDrawing = false;
});

function draw(target) {
    if (target.classList.contains("gridCell")) {
        target.style.backgroundColor = color;
    }
}

slider.addEventListener("change", () => {
    currentGridSize = gridSize
    gridSize = slider.value;
    sliderLabel.textContent = gridSize;

    confirmChange();
});

function confirmChange() {
    modal.style.display = "flex";
    btnGroup.addEventListener("click", (e) => {
        target = e.target;

        if (target.id === "okay-btn") {
            drawGrid(gridSize);
        }
        modal.style.display = "none";
        btnGroup.removeEventListener;
    });
}

colorPicker.addEventListener("change", () => {
    color = colorPicker.value;
    multiSwatch.style.background = color;
});

function drawGrid(gridSize) {
    grid.replaceChildren();

    for (let row = 0; row < gridSize; row++) {
        let gridRow = document.createElement("div");
        gridRow.className = "gridRow";

        for (let cell = 0; cell < gridSize; cell++) {
            let gridCell = document.createElement("div");
            gridCell.className = "gridCell";
            gridRow.appendChild(gridCell);
        }
        grid.appendChild(gridRow);
    }
}

eraser.addEventListener("click", (e) => {
    color = "white";
    setActiveTool(e.target);
});

trash.addEventListener("click", () => {
    const gridCells = document.querySelectorAll(".gridCell");
    gridCells.forEach((cell) => {
        cell.style.backgroundColor = "white";
    });
});

function setActiveTool(target) {
    const activeTool = document.querySelector(".active");
    if (target.classList.contains("swatch") || target.id === "eraser") {
        activeTool.classList.remove("active");
        target.classList.add("active");
    } else if (target.id === "color-picker") {
        activeTool.classList.remove("active");
        multiSwatch.classList.add("active");
    }
}
