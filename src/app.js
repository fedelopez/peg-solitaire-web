import * as d3 from 'd3';
import * as board from './board';

d3.select('svg').html(renderBoard(board.boardWith20MovementsLeft()));

d3.selectAll('circle').each(function () {
    d3.select(this).on('click', function () {
        const peg = getPeg(this);
        console.log(`Peg ${peg.className} column=${peg.column}, row=${peg.row} clicked`);
        if (peg.className === 'peg') {
            setPegClass('circle[class="selected"]', 'peg');
            setPegClass(this, 'selected');
        } else if (peg.className === 'empty') {
            const originPeg = getPeg('circle[class="selected"]');
            const pegBetween = board.pegBetween(originPeg.column, originPeg.row, peg.column, peg.row);
            if (pegBetween) {
                pegBetween.className = getPegClass(`circle[row="${pegBetween.row}"][column="${pegBetween.column}"]`);
                if (originPeg.className === 'selected' && pegBetween.className === 'peg') {
                    setPegClass(`circle[class="selected"]`, 'empty');
                    setPegClass(`circle[column="${pegBetween.column}"][row="${pegBetween.row}"]`, 'empty');
                    setPegClass(this, 'peg');
                }
            }
        }
    })
});

d3.select('a.button').on('click', function () {
    const newBoard = board.boardWith20MovementsLeft();
    d3.selectAll('circle')
        .each(function () {
            console.log('Peg', getPeg(this));
            const peg = getPeg(this);
            newBoard[peg.row][peg.column] = peg.className;
        });
    console.log('newBoard', newBoard);
    const solution = board.solve(newBoard);
    if (solution.length > 1) {
        d3.select('svg').html(renderBoard(solution[1]));
        console.log('End!', solution);
    }
});

function renderBoard(board) {
    return board.reduce((acc, values, row) => {
        return acc + values.reduce((acc2, value, column) => {
            if (!value) return acc2;
            else {
                return acc2 + `<circle column=${column} row="${row}" cx="${25 + 50 * column}" cy="${25 + 50 * row}" class=${value}></circle>`
            }
        }, '')
    }, '');
}

function getPeg(selector) {
    const className = d3.select(selector).attr('class');
    const column = Number(d3.select(selector).attr('column'));
    const row = Number(d3.select(selector).attr('row'));
    return {column, row, className};
}

function setPegClass(selector, hole) {
    d3.select(selector).attr('class', hole);
}

function getPegClass(selector) {
    return d3.select(selector).attr('class');
}





