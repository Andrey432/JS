'use strict';

const chessSettings = {
    tableSize: 8,
    figures: ['R', 'H', 'B', 'K', 'Q', 'B', 'H', 'R'],
    headers: {
        horizontal: 'ABCDEFGH',
        vertical: [1, 2, 3, 4, 5, 6, 7, 8]
    }
}

const game = new Chess(chessSettings);
game.run();
