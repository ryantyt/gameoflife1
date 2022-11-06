/* eslint-disable */

// Trying to make this responsive
var win_width = window.innerWidth;
var win_height = window.innerHeight;

// const screen_width = 800;
// const screen_height = 500;

// Resolution of game
const scale = 10;
const screen_width = Math.ceil(win_width / scale) * scale;
const screen_height = Math.ceil(win_height / scale) * scale;


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

function createCell(a_grid, mouse_x, mouse_y) {
    // Pass coords of mouse click to grid
    // change correspondingly
    let mouse_col = floor(mouse_x/scale);
    let mouse_row = floor(mouse_y/scale);

    if (a_grid[mouse_col][mouse_row] == 0) {
        a_grid[mouse_col][mouse_row] = 1;
    } else if (a_grid[mouse_col][mouse_row] == 1) {
        a_grid[mouse_col][mouse_row] = 0;
    }

    return a_grid;
}

function createCell2(a_grid, mouse_x, mouse_y) {
    // Pass coords of mouse click to grid
    // change correspondingly
    let mouse_col = floor(mouse_x/scale);
    let mouse_row = floor(mouse_y/scale);
    a_grid[mouse_col][mouse_row] = 1;
    return a_grid;
}

function createRandomGrid(grid) {
    for (let x = 0; x < num_cols; x++) {
        for (let y = 0; y < num_rows; y++) {
            grid[x][y] = floor(random(2));
        }
    }
    return grid;
}

let grid = createGrid(num_cols, num_rows);
let setting_up = true;

function mouseClicked() {
    grid = createCell(grid, pmouseX, pmouseY);
}

function mouseDragged() {
    grid = createCell2(grid, pmouseX, pmouseY);
}

function clearGrid(a_grid) {
    for (let x = 0; x < num_cols; x++) {
        for (let y = 0; y < num_rows; y++) {
            // random value between 1 or 2 as state of cell
            a_grid[x][y] = 0;
        }
    }
    return a_grid
}

function keyPressed() {
    if (keyCode === ENTER) {
        setting_up = !setting_up;        
    } else if (keyCode == BACKSPACE) {
        clearGrid(grid);
        setting_up = true;
    } else if (keyCode === UP_ARROW) {
        createRandomGrid(grid);
    }
}

function setup() {
    createCanvas(screen_width, screen_height);
    frameRate(23);

    // Initialise with custom scenario

    // Clear grid
    grid = clearGrid(grid);
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

            } else {
                // Dead
                noFill();
            }
            // Iterate each scale const to give space between cells
            rect(x * scale, y * scale, scale, scale);
        }
    }

    if(!setting_up) {
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
}

function neighbours(a_grid, x_pos, y_pos) {
    let total = 0;
    // state of cells surrounding a cell
    for (let x_del = -1; x_del < 2; x_del ++) {
        for (let y_del = -1; y_del < 2; y_del ++) {
            // Warp borders 
            col = (x_pos + x_del + num_cols) % num_cols;
            row = (y_pos + y_del + num_rows) % num_rows;

            // if (x_pos == 0 || y_pos == 0 || x_pos == num_cols - 1 || y_pos == num_rows - 1) {
            //     break;
            // }
            total += a_grid[col][row];
        }
    }
    total -= a_grid[x_pos][y_pos];
    return total;
}