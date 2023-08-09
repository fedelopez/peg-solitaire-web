import {select, selectAll} from 'd3-selection';
import {transition} from 'd3-transition';
import {easeBounceIn, easeLinear} from 'd3-ease';
import * as Board from './board';

function init(board) {
    select('svg').html(renderBoard(board));
    selectAll('circle').on('click', function () {
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

select('#hint-btn').on('click', function () {
    const board = Board.createBoard();
    selectAll('circle')
        .each(function () {
            const peg = getPeg(this);
            console.log('Peg', peg);
            board[peg.row][peg.column] = peg.className;
        });
    console.log('Board', board);
    const solution = Board.solve(board);
    if (solution.length > 1) {
        init(solution[1]);
        console.log('Hint applied!', solution);
        const t1 = transition().duration(1500).ease(easeBounceIn);
        const t2 = transition().duration(500).ease(easeLinear);
        select('#hint-label').html('Hint applied!').transition(t1).style("opacity", 1).transition(t2).style("opacity", 0);
    } else {
        console.log('No solution for this board!');
        const t1 = transition().duration(1500).ease(easeBounceIn);
        select('#hint-label').html('No solution for this board!').transition(t1).style('opacity', 1);
        select('svg').style('pointer-events', 'none');
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
    const className = select(selector).attr('class');
    const column = Number(select(selector).attr('column'));
    const row = Number(select(selector).attr('row'));
    return {column, row, className};
}

function setPegClass(selector, hole) {
    select(selector).attr('class', hole);
}

function getPegClass(selector) {
    return select(selector).attr('class');
}





