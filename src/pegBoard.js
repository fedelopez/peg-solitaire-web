export class PegBoard {
    constructor(data = createBoard()) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    nextStates() {
        const states = [];
        const rowSize = this._data.length;
        const columnSize = this._data[0].length;
        for (let row = 0; row < rowSize; row++) {
            for (let column = 0; column < columnSize; column++) {
                if (this._data[row][column] === 'peg') {
                    if (this.canCaptureLeftToRight(row, column, columnSize)) {
                        const newState = this._data.map(row => row.slice());
                        newState[row][column] = 'empty';
                        newState[row][column + 1] = 'empty';
                        newState[row][column + 2] = 'peg';
                        states.push(new PegBoard(newState));
                    }
                    if (this.canCaptureRightToLeft(row, column)) {
                        const newState = this._data.map(row => row.slice());
                        newState[row][column] = 'empty';
                        newState[row][column - 1] = 'empty';
                        newState[row][column - 2] = 'peg';
                        states.push(new PegBoard(newState));
                    }
                    if (this.canCaptureTopToBottom(row, column, rowSize)) {
                        const newState = this._data.map(row => row.slice());
                        newState[row][column] = 'empty';
                        newState[row + 1][column] = 'empty';
                        newState[row + 2][column] = 'peg';
                        states.push(new PegBoard(newState));
                    }
                    if (this.canCaptureBottomToTop(row, column)) {
                        const newState = this._data.map(row => row.slice());
                        newState[row][column] = 'empty';
                        newState[row - 1][column] = 'empty';
                        newState[row - 2][column] = 'peg';
                        states.push(new PegBoard(newState));
                    }
                }
            }
        }
        return states;
    }

    canCaptureLeftToRight(row, column, columnSize) {
        return column + 2 < columnSize && this._data[row][column + 1] === 'peg' && this._data[row][column + 2] === 'empty';
    }

    canCaptureRightToLeft(row, column) {
        return column > 1 && this._data[row][column - 1] === 'peg' && this._data[row][column - 2] === 'empty';
    }

    canCaptureTopToBottom(row, column, rowSize) {
        return row + 2 < rowSize && this._data[row + 1][column] === 'peg' && this._data[row + 2][column] === 'empty';
    }

    canCaptureBottomToTop(row, column) {
        return row > 1 && this._data[row - 1][column] === 'peg' && this._data[row - 2][column] === 'empty';
    }

    updatePeg(peg) {
        this._data[peg.row][peg.column] = peg.className;
    }

    isSolved() {
        let pegsLeft = 0;
        for (const row of this._data) {
            for (const column of row) {
                if (column === 'peg') {
                    pegsLeft++;
                    if (pegsLeft > 1) return false;
                }
            }
        }
        return pegsLeft === 1;
    }

    solve() {
        console.time('solve');
        const cache = new PegBoardCache();
        const frontier = [[this]];
        let deadEnds = 0;
        while (frontier.length > 0) {
            const currentPath = frontier.shift();
            const currentBoard = currentPath[currentPath.length - 1];
            cache.visit(currentBoard);
            if (currentBoard.isSolved()) {
                console.log(`Board solved. Dead-ends: ${deadEnds}, Visited boards: ${cache.size()}`);
                console.timeEnd('solve');
                return currentPath;
            } else {
                const nextBoardStates = currentBoard.nextStates();
                if (nextBoardStates.length === 0) {
                    deadEnds++;
                } else {
                    const neighbors = nextBoardStates.filter(state => !cache.hasVisited(state));
                    const newPaths = neighbors.map(neighbor => currentPath.concat(neighbor));
                    frontier.unshift(...newPaths);
                }
            }
        }
        console.log(`Board can't be solved. Dead-ends: ${deadEnds}, Visited boards: ${cache.size()}`);
        console.timeEnd('solve');
        return [];
    }

    toHTML() {
        return this._data.reduce((acc, values, row) => {
            return acc + values.reduce((acc2, value, column) => {
                if (!value) return acc2;
                else {
                    return acc2 + `<circle column=${column} row="${row}" cx="${25 + 50 * column}" cy="${25 + 50 * row}" r="20" class=${value}></circle>`
                }
            }, '')
        }, '');
    }

    static pegBetween(originCol, originRow, targetCol, targetRow) {
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
}

class PegBoardCache {
    visitedBoards = new Set();

    visit(pegBoard) {
        const encodedBoard = this.encode(pegBoard);
        this.visitedBoards.add(encodedBoard);
    }

    hasVisited(pegBoard) {
        return this.visitedBoards.has(this.encode(pegBoard));
    }

    encode(pegBoard) {
        let result = "";
        for (const row of pegBoard.data) {
            for (const column of row) {
                if (column === 'peg') result = result + '1';
                if (column === 'empty') result = result + '0';
            }
        }
        return parseInt(result, 2);
    }

    size() {
        return this.visitedBoards.size;
    }
}

function createBoard() {
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