import {PegBoard} from './pegBoard';

describe('pegBoard', () => {
    describe('calculates peg between origin and target', () => {
        it('when origin x is target x and origin y > target y', () => {
            const pegCoordinates = PegBoard.pegBetween(2, 4, 2, 2);
            expect(pegCoordinates).toEqual({column: 2, row: 3});
        });

        it('when origin x is target x and origin y < target y', () => {
            const pegCoordinates = PegBoard.pegBetween(2, 0, 2, 2);
            expect(pegCoordinates).toEqual({column: 2, row: 1});
        });

        it('when origin y is target y and origin x > target x', () => {
            const pegCoordinates = PegBoard.pegBetween(4, 2, 2, 2);
            expect(pegCoordinates).toEqual({column: 3, row: 2});
        });

        it('when origin y is target y and origin x < target x', () => {
            const pegCoordinates = PegBoard.pegBetween(0, 2, 2, 2);
            expect(pegCoordinates).toEqual({column: 1, row: 2});
        });
    });

    describe('when only two pegs remain', function () {
        it('returns two states for a left to right or right to left movement', () => {
            const expected1 = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'peg', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const expected2 = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['peg', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const board = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'peg', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const neighbors = new PegBoard(board).nextStates();
            expect(neighbors).toHaveLength(2);
            expect(neighbors[0].data).toEqual(expected1);
            expect(neighbors[1].data).toEqual(expected2);
        });

        it('returns one state for a up to down', () => {
            const expected = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const board = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const neighbors = new PegBoard(board).nextStates();
            expect(neighbors).toHaveLength(1);
            expect(neighbors[0].data).toEqual(expected);
        });

        it('returns one state for a down to up', () => {
            const expected = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const board = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const neighbors = new PegBoard(board).nextStates();
            expect(neighbors).toHaveLength(1);
            expect(neighbors[0].data).toEqual(expected);
        });

        it('returns two states for the same peg', () => {
            const expected1 = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'peg', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'peg'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const expected2 = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'peg', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'peg'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const board = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'peg', 'peg'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'peg'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const neighbors = new PegBoard(board).nextStates();
            expect(neighbors).toHaveLength(2);
            expect(neighbors[0].data).toEqual(expected1);
            expect(neighbors[1].data).toEqual(expected2);
        });
    });

    describe('solve', () => {
        it('should solve the board when there are two movements left', () => {
            const board = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'peg', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'peg', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const expected = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'peg', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const boardStates = new PegBoard(board).solve();
            expect(boardStates).toHaveLength(3);
            expect(boardStates[2].data).toEqual(expected);
        });

        it('should solve the board when there are 17 movements left', () => {
            const board = [
                [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
                [undefined, undefined, 'empty', 'peg', 'peg', undefined, undefined],
                ['peg', 'peg', 'peg', 'peg', 'empty', 'peg', 'peg'],
                ['peg', 'peg', 'empty', 'peg', 'peg', 'peg', 'peg'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const expected = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'peg', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const boardStates = new PegBoard(board).solve();
            expect(boardStates).toHaveLength(17);
            expect(boardStates[16].data).toEqual(expected);
        });

        it('should solve the board when there are 20 movements left', () => {
            const board = [
                [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
                [undefined, undefined, 'peg', 'peg', 'peg', undefined, undefined],
                ['peg', 'peg', 'peg', 'peg', 'empty', 'peg', 'peg'],
                ['peg', 'peg', 'empty', 'peg', 'peg', 'peg', 'peg'],
                ['peg', 'peg', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const expected = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'peg'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const boardStates = new PegBoard(board).solve();
            expect(boardStates).toHaveLength(20);
            expect(boardStates[19].data).toEqual(expected);
        });
    });

    describe('isSolved', () => {
        it('should return true if the board is solved', () => {
            const board = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'peg', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const actual = new PegBoard(board).isSolved();
            expect(actual).toBe(true);
        });

        it('should return false when the board has more than one peg', () => {
            const board = [
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'peg', 'empty', 'empty', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'empty', 'empty', 'empty', 'empty'],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'empty', 'empty', undefined, undefined],
            ];
            const actual = new PegBoard(board).isSolved();
            expect(actual).toBe(false);
        });
    });

    describe('dead-ends', () => {
        it('should return empty array when there are no movements left', () => {
            const board = [
                [null, null, 'peg', 'empty', 'empty', null, null],
                [null, null, 'empty', 'empty', 'empty', null, null],
                ['peg', 'empty', 'empty', 'empty', 'peg', 'empty', 'empty'],
                ['empty', 'empty', 'empty', 'peg', 'empty', 'empty', 'empty'],
                ['empty', 'peg', 'empty', 'empty', 'empty', 'empty', 'peg'],
                [null, null, 'empty', "empty", 'empty', null, null],
                [null, null, 'empty', "empty", 'empty', null, null],
            ];
            const boardStates = new PegBoard(board).solve();
            expect(boardStates).toHaveLength(0);
        });
    });
});
