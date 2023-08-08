import * as R from 'ramda';
import SortedSet from 'collections/sorted-set';

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

function pegsCount(flattenedBoard) {
    return R.reduce((acc, val) => val === "p" ? acc + 1 : acc, 0, flattenedBoard);
}

export function solve(board = createBoard()) {
    let frontier = [[board]];
    let visitedBoards = SortedSet();
    let deadEnds = 0;
    let totalPegs = pegsCount(flatten(board));
    while (frontier.length > 0) {
        const currentPath = frontier.shift();
        const currentBoard = currentPath[currentPath.length - 1];
        const flattenedBoard = flatten(currentBoard);
        visitedBoards.push(flattenedBoard);
        const pegsLeft = pegsCount(flattenedBoard);
        if (pegsLeft === 1) {
            return currentPath;
        } else {
            if (pegsLeft < totalPegs) {
                totalPegs = pegsLeft;
                console.log(`Pegs remaining: ${pegsLeft}`);
            }
            const nextBoardStates = nextStates(currentBoard);
            if (nextBoardStates.length === 0) {
                deadEnds++;
            } else {
                const neighbors = nextBoardStates.filter(state => !visitedBoards.has(flatten(state)));
                const newPaths = neighbors.map(neighbor => R.append(neighbor, currentPath));
                frontier.unshift(...newPaths);
            }
        }
    }
    console.log(`Board can't be solved. Dead ends: ${deadEnds}`);
    return [];
}

function flatten(board) {
    const res = board.flatMap(column => column.map(row => {
        if (row === 'peg') return 'p';
        if (row === 'empty') return 'e';
        else return 'u';
    }));
    return res.join('');
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