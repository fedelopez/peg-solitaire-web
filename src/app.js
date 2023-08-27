import * as Board from './board';
import $ from 'jquery';

function init(board) {
    $('#board-canvas').html(renderBoard(board));
    $('#board-canvas circle').on('click', function () {
        const peg = getPeg(this);
        console.log(`Peg ${peg.className} column=${peg.column}, row=${peg.row} clicked`);
        if (peg.className === 'peg') {
            setPegClass('circle[class="selected"]', 'peg');
            setPegClass(this, 'selected');
        } else if (peg.className === 'empty') {
            const originPeg = getPeg('circle[class="selected"]');
            const pegBetween = Board.pegBetween(originPeg.column, originPeg.row, peg.column, peg.row);
            if (pegBetween) {
                pegBetween.className = getPegClass(`circle[row="${pegBetween.row}"][column="${pegBetween.column}"]`);
                if (originPeg.className === 'selected' && pegBetween.className === 'peg') {
                    setPegClass(`circle[class="selected"]`, 'empty');
                    setPegClass(`circle[column="${pegBetween.column}"][row="${pegBetween.row}"]`, 'empty');
                    setPegClass(this, 'peg');
                }
            }
        }
    });
}

init(Board.createBoard());

$('#hint-btn').on('click', function () {
    const board = Board.createBoard();
    $('#board-canvas circle').each(function () {
        const peg = getPeg(this);
        board[peg.row][peg.column] = peg.className;
    });
    const solution = Board.solve(board);
    if (solution.length > 1) {
        init(solution[1]);
        console.log('Hint applied!');
    } else {
        console.log('No solution for this board!');
        $('#hint-label').fadeIn(1500);
    }
});

function renderBoard(board) {
    return board.reduce((acc, values, row) => {
        return acc + values.reduce((acc2, value, column) => {
            if (!value) return acc2;
            else {
                return acc2 + `<circle column=${column} row="${row}" cx="${25 + 50 * column}" cy="${25 + 50 * row}" r="20" class=${value}></circle>`
            }
        }, '')
    }, '');
}

function getPeg(selector) {
    const className = $(selector).attr('class');
    const column = Number($(selector).attr('column'));
    const row = Number($(selector).attr('row'));
    return {column, row, className};
}

function setPegClass(selector, hole) {
    $(selector).attr('class', hole);
}

function getPegClass(selector) {
    return $(selector).attr('class');
}





