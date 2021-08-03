const Game = require('./game')
const domBoard = require('./domGameboard')
const domBegin = require('./domGameBegin')

let players = {'number': 1}
let game = new Game()

const OnePlayerButton = document.getElementById('1player')
const TwoPlayerButton = document.getElementById('2players')
const playerNamesForm = document.getElementById('player-names')
const preGameSettings = document.getElementById('pre-game-settings')

OnePlayerButton.addEventListener('click', (e) => {
    e.preventDefault()
    domBegin.setToOnePlayer(players)
})

TwoPlayerButton.addEventListener('click', (e) => {
    e.preventDefault()
    domBegin.setToTwoPlayers(players)
})

// When submiting this form Ship Placement stage begins
playerNamesForm.addEventListener('submit', (e) => {
    e.preventDefault()
    domBegin.startGame(game, players)
    domBoard.createBoard('P1Board')
    domBoard.createBoard('P1enemyBoard')
    for (let i = 0; i < 10; i++) {
        game.player1.gameboard.moveShip(i,i*10)
    }
    domBoard.renderBoard(game.player1.gameboard, 'P1Board', 'ship-container', 'player')
    domBoard.renderBoard(game.player2.gameboard, 'P1enemyBoard', 'ship-container2', 'player')
    preGameSettings.style.display = "none"
})


const button111 = document.getElementById('placing-finished')
button111.addEventListener('click', () => {
    console.log(game)
    game.startGame()
    console.log(game)
    game.player1.setNextOutgoingAttack(12)
    game.gameTurn()
    game.player1.setNextOutgoingAttack(15)
    game.gameTurn()
    game.player1.setNextOutgoingAttack(17)
    game.gameTurn()
    domBoard.renderBoard(game.player1.gameboard, 'P1Board', 'ship-container', 'player')
    domBoard.renderBoard(game.player2.gameboard, 'P1enemyBoard', 'ship-container2', 'player')
    console.log(game)
})

//
// const P1enemyBoardTiles = document.getElementById('P1enemyBoard').childNodes
//
// P1enemyBoardTiles.forEach(tile => tile.addEventListener('click', attackTile))
//
// function attackTile(e) {
//     let tileId = e.path[0].id.split('-')[1]
//     game.player1.setNextOutgoingAttack(tileId)
//     gameLoop()
//     this.removeEventListener('click', attackTile)
// }
//
// function gameLoop() {
//     game.gameTurn()
//     domBoard.renderPlayerBoard(game.player1.gameboard, 'P1Board')
//     domBoard.renderEnemyBoard(game.player2.gameboard, 'P1enemyBoard')
//     if (game.getGameEnded()) {
//         P1enemyBoardTiles.forEach(tile => {
//             tile.removeEventListener('click', attackTile)
//         })
//     }
// }
//
// Drag And Drop Ships
//
// let playerBoard
// let draggingElement
// const P1BoardTiles = document.getElementById('P1Board').childNodes
//
// function initShipPlacement() {
//     playerBoard = document.getElementById('P1Board')
//     playerBoard.addEventListener('dragover', dragOnBoard, false)
//     playerBoard.addEventListener('dragleave', dragOffBoard, false)
//     playerBoard.addEventListener('drop', dropHandle, false)
//
//     P1BoardTiles.forEach(tile => tile.addEventListener('dragover', dragOnTile, false))
//     P1BoardTiles.forEach(tile => tile.addEventListener('dragleave', dragOffTile, false))
//
//     // TODO: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage agregar.
//     const outOfBoardShips = document.getElementsByClassName('out-of-board-ship')
//     for (let ship of outOfBoardShips) {
//         ship.addEventListener('dragstart', dragStarted, false)
//         ship.addEventListener('dragend', dragEnded, false)
//     }
// }
//
// function dropHandle(e) {
//     // TODO: Prevent from dropping thing that arent ships
//     e.preventDefault()
//     if (!e.target.classList.contains('no-drop')) {
//         let position = parseInt(e.target.id.split('-')[1])
//         let shipLength = e.dataTransfer.getData('shipLength')
//         let ship = game.player1.gameboard.addShip(shipLength)
//         let valid = game.player1.gameboard.moveShip(ship.getId(), position)
//         if (valid) {
//             draggingElement.parentNode.removeChild(draggingElement)
//
//         } else {
//             delete game.player1.gameboard.removeShip(ship.getId())
//         }
//     }
//     this.classList.remove('over')
//     e.target.classList.remove('over-tile')
//     domBoard.renderPlayerBoard(game.player1.gameboard, 'P1Board')
//     allowShipRotations()
// }
//
// function allowShipRotations() {
//     let shipTiles = playerBoard.querySelectorAll('.tile-ship')
//     console.log(shipTiles)
//     shipTiles.forEach(tile => tile.addEventListener('click', rotateShip, false))
// }
//
// function rotateShip(e) {
//     let shipId = parseInt(e.target.getAttribute('data-ship-id'))
//     game.player1.gameboard.rotateShip(shipId)
//     domBoard.renderPlayerBoard(game.player1.gameboard, 'P1Board')
//     console.log(game.player1.gameboard)
// }
//
// function dragStarted(e) {
//     draggingElement = this
//     this.style.opacity = '0.4'
//     e.dataTransfer.setData('shipLength', e.target.childElementCount)
// }
//
// function dragEnded(e) {
//     this.style.opacity = '1'
// }
//
// function dragOnBoard(e) {
//     e.preventDefault()
//     this.classList.add('over')
//     return false
// }
//
// function dragOffBoard(e) {
//     e.preventDefault()
//     this.classList.remove('over')
//     return false
// }
//
// function dragOnTile(e) {
//     this.classList.add('over-tile')
// }
//
// function dragOffTile(e) {
//     this.classList.remove('over-tile')
// }
//
// initShipPlacement()
