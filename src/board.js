import * as d3 from 'd3';

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
    peg.className = getPegClass(`circle[row="${peg.row}"][column="${peg.column}"]`);
    return peg;
}

export function getPeg(selector) {
    const className = d3.select(selector).attr('class');
    const column = Number(d3.select(selector).attr('column'));
    const row = Number(d3.select(selector).attr('row'));
    return {column, row, className};
}

export function setPegClass(selector, hole) {
    d3.select(selector).attr('class', hole);
}

export function renderBoard() {
    return createBoard().reduce((acc, values, row) => {
        return acc + values.reduce((acc2, value, column) => {
            if (!value) return acc2;
            else {
                return acc2 + `<circle column=${column} row="${row}" cx="${25 + 50 * column}" cy="${25 + 50 * row}" class=${value}></circle>`
            }
        }, '')
    }, '');
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

function getPegClass(selector) {
    return d3.select(selector).attr('class');
}