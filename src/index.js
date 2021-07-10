const Game = require('./game')

const board1 = document.getElementById('board1');
const board2 = document.getElementById('board2');
createBoard(board1)
createBoard(board2)

function createBoard(boardContainer) {
    const boardId = boardContainer.id
    for (let i = 0; i < 100; i++) {
        let tile = document.createElement('div')
        tile.setAttribute('id', `${boardId}-${i}`)
        tile.classList.add('tile')
        boardContainer.appendChild(tile)
    }
}

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

function renderPlayerBoard(player, DOMBoard) {
    showShips(player.gameboard, DOMBoard)
    showShotedWaterTiles(player.gameboard, DOMBoard)
    showShotedHitTiles(player.gameboard, DOMBoard)
}

function showShips(playerGameboard, DOMBoard) {
    const boardId = DOMBoard.id
    for (tileId of Object.keys(playerGameboard.tilesWithShips)) {
        let tileWithShip = document.getElementById(`${boardId}-${tileId}`)
        tileWithShip.classList.add('tile-ship')
    }
}

function showShotedWaterTiles(playerGameboard, DOMBoard) {
    const boardId = DOMBoard.id
    for (tileId of playerGameboard.tilesShoted.water) {
        let tileWithShip = document.getElementById(`${boardId}-${tileId}`)
        tileWithShip.classList.add('tile-water')
    }
}

function showShotedHitTiles(playerGameboard, DOMBoard) {
    const boardId = DOMBoard.id
    for (tileId of playerGameboard.tilesShoted.hit) {
        let tileWithShip = document.getElementById(`${boardId}-${tileId}`)
        tileWithShip.classList.add('tile-hit')
    }
}

renderPlayerBoard(game.player2, board2)
renderPlayerBoard(game.player1, board1)
