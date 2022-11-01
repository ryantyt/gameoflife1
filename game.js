/* eslint-disable */ 

// Initialising Variables
let grid;
let cols;
let rows;
let resolution = 10;

// Create Grid
function createGrid(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

// Setup
function setup() {
    createCanvas(600, 400);
    // What is width and height they aren't referenced anywhere else
    cols = width / resolution;
    rows = height / resolution;

    grid = createGrid(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = floor(random(2));
        }
    }
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;

            if (grid[i][j] == 1) {
                fill(255);
                stroke(0);
                rect(x, y, resolution - 1, resolution - 2);
            }
        }
    }

    let next = createGrid(cols, rows);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let neighbours = count(grid, i, j);
            let state = grid[i][j];

            if (state == 0 && neighbours == 3) {
                next[i][j] = 1;
            } else if (state == 1  && (neighbours < 2 || neighbours > 3)){
                next[i][j] = 0;
            } else {
                next[i][j] = state;
            }
        }
    }
    grid = next;
}

function count(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;

            sum += grid[col][row];
        }
    }
    sum -=  grid[x][y];
    return sum;
}

// p5js