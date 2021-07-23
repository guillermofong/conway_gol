var cellSize = 20
var rowSize = 800/cellSize
var colSize = 800/cellSize


// Initiate array
function createArray() {
    conwayArray = []
    for (var i=0; i < rowSize; i++) {
        row = []
        for (var j=0; j<colSize; j++) {
            row.push(0)
        }
        conwayArray.push(row)
    }
    return conwayArray
}

function createNextArray() {
    nextConwayArray = []
    for (var i=0; i < rowSize; i++) {
        row = []
        for (var j=0; j<colSize; j++) {
            row.push(0)
        }
        nextConwayArray.push(row)
    }
    return nextConwayArray
}

function zeros() {
    zeroArray = []
    for (var i=0; i < rowSize; i++) {
        row = []
        for (var j=0; j<colSize; j++) {
            row.push(0)
        }
        zeroArray.push(row)
    }
    return zeroArray
}
var conwayArray = createArray()
//--------------Array initiaded -------------

var canvas = document.getElementById("myCanvas")
var ctx = canvas.getContext("2d")
canvas.addEventListener('click', clickEvent)

function axisY() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray'
    for (var col=0; col<colSize; col++){
        ctx.moveTo(col*cellSize,0)
        ctx.lineTo(col*cellSize, colSize*cellSize)
        ctx.stroke()
    }
}

function axisX() {
    ctx.lineWidth = 1
    ctx.strokeStyle = 'gray'
    for (var row=0; row<rowSize; row++){
        ctx.moveTo(0,row*cellSize)
        ctx.lineTo(rowSize*cellSize, row*cellSize)
        ctx.stroke()
    }
}


// function drawGrid() {
//     ctx.lineWidth = 1
//     ctx.strokeStyle = 'black'
//     for (var row=0; row < rowSize; row++) {
//         for (var column=0; column < colSize; column++) {
//             var x = row*cellSize
//             var y = column*cellSize
//             if (conwayArray[row][column] == 0) {
//                 ctx.fillStyle = "white"
//             }
//             else {
//                 ctx.fillStyle = "black"
//             }
//             ctx.fillRect(x+2.5,y+2.5, cellSize-5, cellSize-5)
//             ctx.rect(x,y,cellSize, cellSize)
//             ctx.stroke()
//         } 
//     }
// }

function drawGrid(array) {
    ctx.lineWidth = 1
    // ctx.strokeStyle = 'black'
    for (var row=0; row < rowSize; row++) {
        for (var column=0; column < colSize; column++) {
            var y = row*cellSize
            var x = column*cellSize
            if (array[row][column] == 0) {
                ctx.fillStyle = "white"
            }
            else {
                ctx.fillStyle = "crimson"
            }
            ctx.fillRect(x+2.5,y+2.5, cellSize-5, cellSize-5)
            // ctx.rect(x,y,cellSize, cellSize)
            ctx.stroke()
        } 
    }
}

function clickEvent(event) {
    ctx.fillStyle = "black"
    var x = Math.floor(event.offsetX/cellSize)*cellSize
    var y = Math.floor(event.offsetY/cellSize)*cellSize
    console.log(x/cellSize)
    console.log(y/cellSize)
    //paintBox(conwayArray,row/cellSize,column/cellSize)

    if (conwayArray[y/cellSize][x/cellSize] == 0) {
        conwayArray[y/cellSize][x/cellSize] = 1
        ctx.fillStyle = "crimson"
    }
    else {
        conwayArray[y/cellSize][x/cellSize] = 0
        ctx.fillStyle = "white"
    }
    ctx.fillRect(x+2.5, y+2.5, cellSize-5, cellSize-5)
}

// function paintBox(array, row, column) {
//     if (array[row][column] == 0) {
//         array[row][column] = 1
//         ctx.fillStyle = "black"
//     }
//     else {
//         array[row][column] = 0
//         ctx.fillStyle = "white"
//     }
//     ctx.fillRect(row*cellSize+2.5, column*cellSize+2.5, cellSize-5, cellSize-5)
// }

// conwayArray[5][4] = 1
// conwayArray[5][5] = 1
// conwayArray[5][3] = 1
var nextConwayArray = createNextArray()
var zeroArray = zeros()
// function conway() {
    // Need to set up new array to receive updated states
    //var nextConwayArray = createArray()

//     for (var row=1; row < rowSize-1; row++) {
//         for (var column=1; column < colSize-1; column++) { //NOTE. start from 1 and end at -1 to avoid edge problems
//             var neighbors = calculateNeighbors(conwayArray, row, column)
//             // console.log(neighbors)
//             if (conwayArray[row][column] == 1){
//                 if (neighbors==2 || neighbors==3)
//                     conwayArray[row][column] = 1
//                 else 
//                     conwayArray[row][column] = 0
//             }
//             else if (conwayArray[row][column] == 0) {
//                 if (neighbors==3) 
//                     conwayArray[row][column] = 1
//                 else
//                     conwayArray[row][column] = 0
//             }   
//         }
//     }
    
// }

function conway(array_start, array_next) {
    // Need to set up new array to receive updated states
    //var nextConwayArray = createArray()

    for (var row=0; row < rowSize; row++) {
        for (var column=0; column < colSize; column++) { //NOTE. start from 1 and end at -1 to avoid edge problems
            var neighbors = calculateNeighbors(array_start, row, column)
            // console.log(neighbors)
            if (array_start[row][column] == 1){
                if (neighbors==2 || neighbors==3)
                    array_next[row][column] = 1
                else 
                    array_next[row][column] = 0
            }
            else if (array_start[row][column] == 0) {
                if (neighbors==3) 
                    array_next[row][column] = 1
                else
                    array_next[row][column] = 0
            }   
        }
    }
}

function renderConway() {
    conway(conwayArray,nextConwayArray)
    conwayArray = nextConwayArray
    nextConwayArray = zeros()
}

function calculateNeighbors(array, row, column){
    var neighbors=0
    if ((row >= 1 && row < rowSize-1) && (column >= 1 && column < colSize-1)) {
        neighbors = array[row-1][column-1] + array[row-1][column] + array[row-1][column+1] +
                        array[row][column-1]                         + array[row][column+1] + 
                        array[row+1][column-1] + array[row+1][column] + array[row+1][column+1]
        }
    else if (row==0 && (column >= 1 && column < colSize-1)) {
        neighbors = array[rowSize-1][column-1] + array[rowSize-1][column] + array[rowSize-1][column+1] +
                        array[row][column-1]                         + array[row][column+1] + 
                        array[row+1][column-1] + array[row+1][column] + array[row+1][column+1]
    }
    else if (row==(rowSize-1) && (column >= 1 && column < colSize-1)) {
        neighbors = array[row-1][column-1] + array[row-1][column] + array[row-1][column+1] +
                        array[row][column-1]                         + array[row][column+1] + 
                        array[0][column-1] + array[0][column] + array[0][column+1]
    }
    else if ((row >= 1 && row < rowSize-1) && (column==0)) {
        neighbors = array[row-1][colSize-1] + array[row-1][column] + array[row-1][column+1] +
                    array[row][colSize-1]                         + array[row][column+1] + 
                    array[row+1][colSize-1] + array[row+1][column] + array[row+1][column+1]
    }
    else if ((row >= 1 && row < rowSize-1) && (column==colSize-1)) {
        neighbors = array[row-1][column-1] + array[row-1][column] + array[row-1][0] +
                    array[row][column-1]                         + array[row][0] + 
                    array[row+1][column-1] + array[row+1][column] + array[row+1][0]
    }
    else if (row==0 && column==0) {
        neighbors = array[rowSize-1][colSize-1] + array[rowSize-1][column] + array[rowSize-1][column+1] +
                    array[row][colSize-1]                         + array[row][column+1] + 
                    array[row+1][colSize-1] + array[row+1][column] + array[row+1][column+1]
    }
    else if (row==rowSize-1 && column==colSize-1) {
        neighbors = array[row-1][column-1] + array[row-1][column] + array[row-1][0] +
                    array[row][column-1]                         + array[row][0] + 
                    array[0][column-1] + array[0][column] + array[0][0]
    }
    else if (row==rowSize-1 && column==0) {
        neighbors = array[row-1][colSize-1] + array[row-1][column] + array[row-1][column+1] +
                    array[row][colSize-1]                         + array[row][column+1] + 
                    array[0][colSize-1] + array[0][0] + array[0][column+1]
    }
    else if (row==0 && column==colSize-1) {
        neighbors = array[rowSize-1][column-1] + array[rowSize-1][column] + array[rowSize-1][0] +
                    array[row][column-1]                         + array[0][0] + 
                    array[row+1][column-1] + array[row+1][column] + array[row+1][0]
    }
    return neighbors
}


function run() {
    setInterval(function() {
        renderConway()
        drawGrid(conwayArray)
    }, 100)
    
}

drawGrid(conwayArray)
axisY()
axisX()
// setInterval(function() {
//     renderConway()
//     drawGrid(conwayArray)
// }, 1000)


function flatten(myArray) {
    returnArray = []
    for (var i=0; i < myArray.length; i++) {
        for (var j=0; j < myArray[i].length; j++) {
            returnArray.push(myArray[i][j])
        }
    }
    return returnArray
}

function compact(myArray) {
    returnArray = []
    for (var i=0; i<myArray.length; i++) {
        if (myArray[i]) returnArray.push(myArray[i])
    }
    return returnArray
}

function loop(start, test, update, body) {
    if (test(start)) {
        body(start)
        start = update(start)
        loop(start, test, update, body)
    }
}

var test = function(n) {return n>0}

var update = function(n) {return n-1}