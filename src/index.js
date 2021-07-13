const Game = require('./game')
const dom = require('./domManipulation')

const game = new Game('human', 'human1', 'computer', 'cpu2')

game.player1.createShips()
game.player1.placeShips()
game.player2.createShips()
game.player2.placeShips()

dom.createBoard('P1Board')
dom.createBoard('P1enemyBoard')

const P1enemyBoard = document.getElementById('P1enemyBoard').childNodes

P1enemyBoard.forEach(tile => {
    tile.addEventListener('click', attackTile)
})

function attackTile(e) {
    let tileId = e.path[0].id.split('-')[1]
    game.player1.setNextOutgoingAttack(tileId)
    gameLoop()
    this.removeEventListener('click', attackTile)
}

function gameLoop() {
    game.gameTurn()
    dom.renderPlayerBoard(game.player1.gameboard, 'P1Board')
    dom.renderEnemyBoard(game.player2.gameboard, 'P1enemyBoard')
    if (game.getGameEnded()) {
        console.log(game.winner)
    }
}
