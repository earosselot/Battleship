const Game = require('./game')
const dom = require('./domManipulation')

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

const game = new Game('human', 'human1', 'computer', 'cpu2')

game.player1.createShips()
game.player1.placeShips()
game.player2.createShips()
game.player2.placeShips()

function gameLoop() {
    game.player1.play()
    game.player2.setNextOutgoingAttack()
    game.player2.play()
    dom.renderPlayerBoard(game.player1.gameboard, 'P1Board')
    dom.renderEnemyBoard(game.player1.enemy.gameboard, 'P1enemyBoard')
    if (game.player1.gameboard.allShipsSank() && game.player2.gameboard.allShipsSank()) {
        console.log('tie')
    } else if (game.player2.gameboard.allShipsSank()) {
        console.log('player1 win')
    } else if (game.player1.gameboard.allShipsSank()) {
        console.log('player2 win')
    }
}

// Game Loop for 2 computers
// while (true) {
//     game.player1.setNextOutgoingAttack()
//     game.player1.play()
//     game.player2.setNextOutgoingAttack()
//     game.player2.play()
//     dom.renderPlayerBoard(game.player1.gameboard, 'P1Board')
//     dom.renderPlayerBoard(game.player1.enemy.gameboard, 'P1enemyBoard')
//     if (game.player1.gameboard.allShipsSank() && game.player2.gameboard.allShipsSank()) {
//         console.log('tie')
//         break
//     } else if (game.player2.gameboard.allShipsSank()) {
//         console.log('player1 win')
//         break
//     } else if (game.player1.gameboard.allShipsSank()) {
//         console.log('player2 win')
//         break
//     }
// }


