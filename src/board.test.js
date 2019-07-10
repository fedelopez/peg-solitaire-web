import {solve} from "./board";

const {pegBetween, nextStates} = require('./board');

describe('board', () => {
    describe('calculates peg between origin and target', () => {
        it('when origin x is target x and origin y > target y', () => {
            const pegCoordinates = pegBetween(2, 4, 2, 2);
            expect(pegCoordinates).toEqual({column: 2, row: 3});
        });

        it('when origin x is target x and origin y < target y', () => {
            const pegCoordinates = pegBetween(2, 0, 2, 2);
            expect(pegCoordinates).toEqual({column: 2, row: 1});
        });

        it('when origin y is target y and origin x > target x', () => {
            const pegCoordinates = pegBetween(4, 2, 2, 2);
            expect(pegCoordinates).toEqual({column: 3, row: 2});
        });

        it('when origin y is target y and origin x < target x', () => {
            const pegCoordinates = pegBetween(0, 2, 2, 2);
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
            const neighbors = nextStates(board);
            expect(neighbors).toHaveLength(2);
            expect(neighbors).toContainEqual(expected1);
            expect(neighbors).toContainEqual(expected2);
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
            const neighbors = nextStates(board);
            expect(neighbors).toHaveLength(1);
            expect(neighbors).toContainEqual(expected);
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
            const neighbors = nextStates(board);
            expect(neighbors).toHaveLength(1);
            expect(neighbors).toContainEqual(expected);
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
            const neighbors = nextStates(board);
            expect(neighbors).toHaveLength(2);
            expect(neighbors).toContainEqual(expected1);
            expect(neighbors).toContainEqual(expected2);
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
            const boardStates = solve(board);
            expect(boardStates).toHaveLength(3);
            expect(boardStates).toContainEqual(expected);
        });

        it('should solve the board when is halfway done', () => {
            const board = [
                [undefined, undefined, 'peg', 'peg', 'empty', undefined, undefined],
                [undefined, undefined, 'empty', 'peg', 'peg', undefined, undefined],
                ['peg', 'peg', 'peg', 'peg', 'empty', 'peg', 'peg'],
                ['peg', 'peg', 'empty', 'peg', 'empty', 'peg', 'peg'],
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
            const boardStates = solve(board);
            expect(boardStates).toHaveLength(15);
            expect(boardStates).toContainEqual(expected);
        });
    });
});
