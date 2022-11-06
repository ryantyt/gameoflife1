/* eslint-disable */

const screen_width = 2400;
const screen_height = 1800;

// Resolution of game
const scale = 4;

// Evenly spaced columns and rows
let num_cols = screen_width / scale;
let num_rows = screen_height / scale;

function createGrid(cols, rows) {
    let colArray = new Array(cols);
    for (let x = 0; x < colArray.length; x++) {
        colArray[x] = Array(rows);
    }

    return colArray;
}

// Grid
let grid = createGrid(num_cols, num_rows);

function setup() {
    createCanvas(screen_width, screen_height);
    frameRate(23);

    for (let x = 0; x < num_cols; x++) {
        for (let y = 0; y < num_rows; y++) {
            // random value between 1 or 2 as state of cell
            grid[x][y] = floor(random(0, 2));
        }
    }
}

function draw() {
    background(25);
    // Fills in cell if alive else doesn't
    for (let x = 0; x < num_cols; x++) {
        for (let y = 0; y < num_rows; y++) {
            // random value between 1 or 2 as state of cell
            if (grid[x][y] == 1) {
                // Alive
                fill(255);
                noStroke();
            } else {
                // Dead
                noFill();
            }
            // Iterate each scale const to give space between cells
            rect(x * scale, y * scale, scale, scale);
        }
    }

    let new_grid = createGrid(num_cols, num_rows);

    // Calculate new state
    for (let x = 0; x < num_cols; x++) {
        for (let y = 0; y < num_rows; y++) {
            let cells_alive = neighbours(grid, x, y);
            let cell_state = grid[x][y];

            if (cell_state == 0 && cells_alive == 3){
                new_grid[x][y] = 1;
            } else if (cell_state == 1 && (cells_alive < 2 || cells_alive > 3)) {
                new_grid[x][y] = 0;
            } else {
                new_grid[x][y] = cell_state;
            }
        }
    }
    grid = new_grid;
}

function neighbours(a_grid, x_pos, y_pos) {
    let total = 0;
    // state of cells surrounding a cell
    for (let x_del = -1; x_del < 2; x_del ++) {
        for (let y_del = -1; y_del < 2; y_del ++) {
            if (x_pos == 0 || y_pos == 0 || x_pos == num_cols - 1 || y_pos == num_rows - 1) {
                break;
            } 
            total += a_grid[x_pos + x_del][y_pos + y_del];
        }
    }
    total -= a_grid[x_pos][y_pos];
    return total;
}