class Cell {
    constructor(previousCellArray = [], cellCoords) {
        this.cellCoords = cellCoords
        this.cellHistory = [...previousCellArray, this.cellCoords]
        this.possibleMoves = []
    }
    findAllPossibleNextCells() {
        const allPoss = []
        const invalidCells = this.cellHistory
        const cellXaxis = this.cellCoords[0]
        const cellYaxis = this.cellCoords[1]
        if (isCellInBoard([cellXaxis - 2, cellYaxis - 1], invalidCells)) {
            allPoss.push([cellXaxis - 2, cellYaxis - 1])
        }
        if (isCellInBoard([cellXaxis - 2, cellYaxis + 1], invalidCells)) {
            allPoss.push([cellXaxis - 2, cellYaxis + 1])
        }
        if (isCellInBoard([cellXaxis - 1, cellYaxis - 2], invalidCells)) {
            allPoss.push([cellXaxis - 1, cellYaxis - 2])
        }
        if (isCellInBoard([cellXaxis - 1, cellYaxis + 2], invalidCells)) {
            allPoss.push([cellXaxis - 1, cellYaxis + 2])
        }
        if (isCellInBoard([cellXaxis + 1, cellYaxis - 2], invalidCells)) {
            allPoss.push([cellXaxis + 1, cellYaxis - 2])
        }
        if (isCellInBoard([cellXaxis + 1, cellYaxis + 2], invalidCells)) {
            allPoss.push([cellXaxis + 1, cellYaxis + 2])
        }
        if (isCellInBoard([cellXaxis + 2, cellYaxis - 1], invalidCells)) {
            allPoss.push([cellXaxis + 2, cellYaxis - 1])
        }
        if (isCellInBoard([cellXaxis + 2, cellYaxis + 1], invalidCells)) {
            allPoss.push([cellXaxis + 2, cellYaxis + 1])
        }
        return allPoss
    }
    get history() {
        return this.cellHistory
    }
    get coords() {
        return this.cellCoords
    }
}
function findShortestPath(startCell, endCell) {
    const startingPosition = new Cell([], startCell)
    let shortestPath = [] 

    // checks if start and end are at the same place
    if (JSON.stringify(startCell) != JSON.stringify(endCell)) {
        findShortestPathRecursion(startingPosition)
    }
    shortestPath.push(endCell) // add the end cell at the end because recursion doesn't add it
    
    let returnedString = `You made it in ${shortestPath.length - 1} moves! Here's your path:\n`
    for (let i = 0; i < shortestPath.length; i++) {
        returnedString += `[${shortestPath[i]}]`
        if (i != shortestPath.length - 1) {
            returnedString += "\n"
        }
    }
    return returnedString
    
    function findShortestPathRecursion(cell) {
        let possibleCells = cell.findAllPossibleNextCells()
        if (possibleCells.length === 0) { // if no possible cells to move to then stop
            return
        }
        if (cell.history.length >= 7) { // if 7 moves are used up then stop (7 because that is the maximum a knight needs to move to any square)
            return
        }
        // if possible cell contains the end cell, then it is a valid path
        for (let i = 0; i < possibleCells.length; i++) {
            if (JSON.stringify(possibleCells[i]) === JSON.stringify(endCell)) {
                if (cell.history.length < shortestPath || shortestPath.length === 0) {
                    shortestPath = cell.history
                }
                return
            }
        }
        // recursively call this function while creating a new cell with it's path history
        for (let i = 0; i < possibleCells.length; i++) {
            findShortestPathRecursion(new Cell([...cell.history], possibleCells[i]))
        }
    }
}
function isCellInBoard(cell, invalidCells) {
    // if outside board then is invalid
    if (cell[0] > 7 || cell[0] < 0 || cell[1] > 7 || cell[1] < 0) {
        return false
    }
    // if cell has already been used, then it is invalid
    let found = false
    for (let i = 0; i < invalidCells.length; i++) {
        if (JSON.stringify(invalidCells[i]) === JSON.stringify(cell)) {
            found = true
            break
        }
    }
    if (found === true) {
        return false
    }
    return true
}

function randomCoords() {
    return [Math.floor(Math.random() * 7), Math.floor(Math.random() * 7)]
}
console.log(findShortestPath([7,7], [0,0]))