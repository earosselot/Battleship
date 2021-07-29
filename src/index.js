const Game = require('./game')
const dom = require('./domManipulation')

const game = new Game('human', 'tony', 'computer', 'cpu2')

// game.player1.createShips()
// game.player1.placeShips()
game.player2.createShips()
game.player2.placeShips()

dom.createBoard('P1Board')
dom.createBoard('P1enemyBoard')

dom.renderPlayerBoard(game.player1.gameboard, 'P1Board')

const P1enemyBoardTiles = document.getElementById('P1enemyBoard').childNodes

P1enemyBoardTiles.forEach(tile => tile.addEventListener('click', attackTile))

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
        P1enemyBoardTiles.forEach(tile => {
            tile.removeEventListener('click', attackTile)
        })
    }
}

// Drag And Drop Ships

let playerBoard
let draggingElement
const P1BoardTiles = document.getElementById('P1Board').childNodes

function initShipPlacement() {
    playerBoard = document.getElementById('P1Board')
    playerBoard.addEventListener('dragover', dragOnBoard, false)
    playerBoard.addEventListener('dragleave', dragOffBoard, false)
    playerBoard.addEventListener('drop', dropHandle, false)

    P1BoardTiles.forEach(tile => tile.addEventListener('dragover', dragOnTile, false))
    P1BoardTiles.forEach(tile => tile.addEventListener('dragleave', dragOffTile, false))

    const outOfBoardShips = document.getElementsByClassName('out-of-board-ship')
    for (let ship of outOfBoardShips) {
        ship.addEventListener('dragstart', dragStarted, false)
        ship.addEventListener('dragend', dragEnded, false)
    }
}

function dropHandle(e) {
    e.preventDefault()
    if (!e.target.classList.contains('no-drop')) {
        let position = parseInt(e.target.id.split('-')[1])
        let shipLength = e.dataTransfer.getData('shipLength')
        let ship = game.player1.gameboard.addShip(shipLength)
        let valid = game.player1.gameboard.placeShip(ship.getId(), position)
        if (valid) {
            draggingElement.parentNode.removeChild(draggingElement)

        } else {
            delete game.player1.gameboard.removeShip(ship.getId())
        }
    }
    this.classList.remove('over')
    e.target.classList.remove('over-tile')
    dom.renderPlayerBoard(game.player1.gameboard, 'P1Board')
    allowShipRotations()
}

function allowShipRotations() {
    let shipTiles = playerBoard.querySelectorAll('.tile-ship')
    console.log(shipTiles)
    shipTiles.forEach(tile => tile.addEventListener('click', rotateShip, false))
}

function rotateShip(e) {
    let shipId = parseInt(e.target.getAttribute('data-ship-id'))
    game.player1.gameboard.rotateShip(shipId)
    dom.renderPlayerBoard(game.player1.gameboard, 'P1Board')
    console.log(game.player1.gameboard)
}

function dragStarted(e) {
    draggingElement = this
    this.style.opacity = '0.4'
    e.dataTransfer.setData('shipLength', e.target.childElementCount)
}

function dragEnded(e) {
    this.style.opacity = '1'
}

function dragOnBoard(e) {
    e.preventDefault()
    this.classList.add('over')
    return false
}

function dragOffBoard(e) {
    e.preventDefault()
    this.classList.remove('over')
    return false
}

function dragOnTile(e) {
    this.classList.add('over-tile')
}

function dragOffTile(e) {
    this.classList.remove('over-tile')
}

initShipPlacement()
