import R from "ramda";

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
    } else {
        throw Error(`Could not find peg`);
    }
    return peg;
}

function hasOnePegLeft(flattenedBoard) {
    const emptySlotCount = R.reduce((acc, val) => val === "peg" ? acc + 1 : acc, 0, flattenedBoard);
    return emptySlotCount === 1;
}

function doSolve(frontier, visitedBoards) {
    const currentPath = R.head(frontier);
    const board = R.last(currentPath);
    const flattenedBoard = R.flatten(board);
    if (hasOnePegLeft(flattenedBoard)) {
        return currentPath;
    } else {
        if (visitedBoards.indexOf(flattenedBoard) < 0) {
            const neighbors = nextStates(board);
            const newPaths = neighbors.map(neighbor => R.append(neighbor, currentPath));
            const tail = R.tail(frontier);
            return doSolve(R.concat(newPaths, tail), R.prepend(flattenedBoard, visitedBoards));
        } else {
            return doSolve(R.tail(frontier), visitedBoards);
        }
    }
}

export function solve(board = createBoard()) {
    return doSolve([[board]], []);
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