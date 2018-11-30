const {pegBetween} = require('./board');

describe('calculates peg between origin and target', () => {
    test('when origin x is target x and origin y > target y', () => {
        const pegCoordinates = pegBetween(2, 4, 2, 2);
        expect(pegCoordinates).toEqual({column: 2, row: 3});
    });

    test('when origin x is target x and origin y < target y', () => {
        const pegCoordinates = pegBetween(2, 0, 2, 2);
        expect(pegCoordinates).toEqual({column: 2, row: 1});
    });

    test('when origin y is target y and origin x > target x', () => {
        const pegCoordinates = pegBetween(4, 2, 2, 2);
        expect(pegCoordinates).toEqual({column: 3, row: 2});
    });

    test('when origin y is target y and origin x < target x', () => {
        const pegCoordinates = pegBetween(0, 2, 2, 2);
        expect(pegCoordinates).toEqual({column: 1, row: 2});
    });
});
