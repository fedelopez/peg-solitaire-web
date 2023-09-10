import {PegBoard} from './pegBoard';
import $ from 'jquery';

function init(board) {
    $('#board-canvas').html(board.toHTML());
    $('#board-canvas circle').on('click', function () {
        const peg = getPeg(this);
        console.log(`Peg ${peg.className} column=${peg.column}, row=${peg.row} clicked`);
        if (peg.className === 'peg') {
            setPegClass('circle[class="selected"]', 'peg');
            setPegClass(this, 'selected');
        } else if (peg.className === 'empty') {
            const originPeg = getPeg('circle[class="selected"]');
            const pegBetween = PegBoard.pegBetween(originPeg.column, originPeg.row, peg.column, peg.row);
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

init(new PegBoard());

$('#hint-btn').on('click', function () {
    const board = new PegBoard();
    $('#board-canvas circle').each(function () {
        const peg = getPeg(this);
        board.updatePeg(peg);
    });
    const solution = board.solve();
    switch (solution.length) {
        case 0:
            console.log('No solution for this board!');
            $('#hint-label').text('No solution for this board!').fadeIn(1500);
            break;
        case 1:
            console.log('No solution for this board!');
            $('#hint-label').text('Board solved!').fadeIn(1500);
            break;
        default:
            init(solution[1]);
            console.log('Hint applied!');
    }
});

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





