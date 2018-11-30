import * as d3 from 'd3';
import * as board from './board';

d3.select('svg').html(board.renderBoard());

d3.selectAll('circle').each(function () {
    d3.select(this).on('click', function () {
        const peg = board.getPeg(this);
        console.log(`Peg ${peg.className} column=${peg.column}, row=${peg.row} clicked`);
        if (peg.className === 'peg') {
            board.setPegClass(`circle[class="selected"]`, 'peg');
            board.setPegClass(this, 'selected');
        } else if (peg.className === 'empty') {
            const originPeg = board.getPeg(`circle[class="selected"]`);
            const pegBetween = board.pegBetween(originPeg.column, originPeg.row, peg.column, peg.row);
            if (originPeg.className === 'selected' && pegBetween.className === 'peg') {
                board.setPegClass(`circle[class="selected"]`, 'empty');
                board.setPegClass(`circle[column="${pegBetween.column}"][row="${pegBetween.row}"]`, 'empty');
                board.setPegClass(this, 'peg');
            }
        }
    })
});








