import * as R from 'ramda';
import Array from 'collections/shim-array';

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

export function solve(board = createBoard()) {
    console.time('solve');
    const frontier = [[board]];
    const visitedBoards = Array();
    let deadEnds = 0;
    let totalPegs = pegsCount(encode(board));
    while (frontier.length > 0) {
        const currentPath = frontier.shift();
        const currentBoard = currentPath[currentPath.length - 1];
        const encodedBoard = encode(currentBoard);
        visitedBoards[encodedBoard] = encodedBoard;
        const pegsLeft = pegsCount(encodedBoard);
        if (pegsLeft === 1) {
            console.timeEnd('solve');
            return currentPath;
        } else {
            if (pegsLeft < totalPegs) {
                totalPegs = pegsLeft;
            }
            const nextBoardStates = nextStates(currentBoard);
            if (nextBoardStates.length === 0) {
                deadEnds++;
            } else {
                const neighbors = nextBoardStates.filter(state => visitedBoards[encode(state)] === undefined);
                const newPaths = neighbors.map(neighbor => R.append(neighbor, currentPath));
                frontier.unshift(...newPaths);
            }
        }
    }
    console.log(`Board can't be solved. Dead-ends: ${deadEnds}`);
    console.timeEnd('solve');
    return [];
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

export function boardWith17MovementsLeft() {
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

export function boardWith20MovementsLeft() {
    return [
        [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
        [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
        ['peg', 'peg', 'peg', 'peg', 'empty', 'peg', 'peg'],
        ['peg', 'peg', 'empty', 'peg', 'peg', 'peg', 'peg'],
        ['peg', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
        [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
        [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
    ];
}

export function pegsCount(encodedBoard) {
    const str = encodedBoard.toString();
    return R.reduce((acc, val) => val === "1" ? acc + 1 : acc, 0, str);
}

function encode(board) {
    let result = "";
    for (const row of board) {
        for (const column of row) {
            if (column === 'peg') result = result + '1';
            if (column === 'empty') result = result + '0';
        }
    }
    return BigInt(result);
}
