const Game = require('./game')

const game = new Game('computer', 'cpu1', 'computer', 'cpu2')

game.player1.createShips()
game.player1.placeShips()
game.player2.createShips()
game.player2.placeShips()

while (true) {
    game.player1.setNextOutgoingAttack()
    game.player1.play()
    if (game.player2.gameboard.allShipsSank()) {
        console.log('player1 win')
        break
    }
    game.player2.setNextOutgoingAttack()
    game.player2.play()
    if (game.player1.gameboard.allShipsSank()) {
        console.log('player2 win')
        break
    }
}
