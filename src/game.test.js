const Game = require('./game')

test('player creation', () => {
    const game = new Game('human', 'pepe', 'computer', 'robot')
    expect(game.player1.enemy).toEqual(game.player2)
    expect(game.player2.enemy).toEqual(game.player1)
})
