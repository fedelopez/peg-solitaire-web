import * as R from "ramda";

export function pegBetween(originCol, originRow, targetCol, targetRow) {
    let peg;
    if (originCol === targetCol) {
        if (originRow + 2 === targetRow) {
            peg = {column: originCol, row: originRow + 1};
        } else if (originRow - 2 === targetRow) {
            peg = {column: originCol, row: originRow - 1};
        }
    } else if (originRow === targetRow) {
        if (originCol + 2 === targetCol) {
            peg = {column: originCol + 1, row: originRow};
        } else if (originCol - 2 === targetCol) {
            peg = {column: originCol - 1, row: originRow};
        }
    }
    return peg;
}

function hasOnePegLeft(flattenedBoard) {
    const emptySlotCount = R.reduce((acc, val) => val === "peg" ? acc + 1 : acc, 0, flattenedBoard);
    return emptySlotCount === 1;
}

export function solve(board = createBoard()) {
    let frontier = [[board]];
    let visitedBoards = [];
    let visitedCount = 0;
    let deadEnds = 0;
    while (frontier.length > 0) {
        if (visitedCount % 10000 === 0) {
            console.log(`Visited boards: ${visitedCount}, dead ends: ${deadEnds}.`);
        }
        const currentPath = R.head(frontier);
        const board = R.last(currentPath);
        const flattenedBoard = R.flatten(board);
        if (hasOnePegLeft(flattenedBoard)) {
            return currentPath;
        } else {
            if (visitedBoards.indexOf(flattenedBoard) < 0) {
                const neighbors = nextStates(board);
                if (neighbors.length === 0) {
                    deadEnds++
                }
                const newPaths = neighbors.map(neighbor => R.append(neighbor, currentPath));
                const tail = R.tail(frontier);
                frontier = R.concat(newPaths, tail);
                visitedBoards = R.prepend(flattenedBoard, visitedBoards);
                visitedCount++;
            } else {
                frontier = R.tail(frontier);
            }
        }
    }
}

export function nextStates(board) {
    const states = [];
    const rows = board.length;
    for (let row = 0; row < rows; row++) {
        const columns = board[row].length;
        for (let column = 0; column < columns; column++) {
            if (board[row][column] === 'peg') {
                if (column < columns - 2 && board[row][column + 1] === 'peg' && board[row][column + 2] === 'empty') {
                    const newState = board.map(row => row.slice());
                    newState[row][column] = 'empty';
                    newState[row][column + 1] = 'empty';
                    newState[row][column + 2] = 'peg';
                    states.push(newState);
                }
                if (column > 1 && board[row][column - 1] === 'peg' && board[row][column - 2] === 'empty') {
                    const newState = board.map(row => row.slice());
                    newState[row][column] = 'empty';
                    newState[row][column - 1] = 'empty';
                    newState[row][column - 2] = 'peg';
                    states.push(newState);
                }
                if (row < rows - 2 && board[row + 1][column] === 'peg' && board[row + 2][column] === 'empty') {
                    const newState = board.map(row => row.slice());
                    newState[row][column] = 'empty';
                    newState[row + 1][column] = 'empty';
                    newState[row + 2][column] = 'peg';
                    states.push(newState);
                }
                if (row > 2 && board[row - 1][column] === 'peg' && board[row - 2][column] === 'empty') {
                    const newState = board.map(row => row.slice());
                    newState[row][column] = 'empty';
                    newState[row - 1][column] = 'empty';
                    newState[row - 2][column] = 'peg';
                    states.push(newState);
                }
            }
        }
    }
    return states;
}

export function createBoard() {
    return [
        [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
        [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
        ['peg', 'peg', 'peg', 'peg', 'peg', 'peg', 'peg'],
        ['peg', 'peg', 'peg', 'empty', 'peg', 'peg', 'peg'],
        ['peg', 'peg', 'peg', 'peg', 'peg', 'peg', 'peg'],
        [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
        [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
    ];
}

export function partiallySolvedBoard() {
    return [
        [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
        [undefined, undefined, 'empty', 'peg', 'peg', undefined, undefined],
        ['peg', 'peg', 'peg', 'peg', 'empty', 'peg', 'peg'],
        ['peg', 'peg', 'empty', 'peg', 'peg', 'peg', 'peg'],
        ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
        [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
        [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
    ];
}