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

function setGame() {
    domBegin.startGame(game, players)
    domBoard.createBoard('P1Board')
    domBoard.createBoard('P1enemyBoard')
    domBoard.renderBoard(game.player1.gameboard, 'P1Board', 'ship-container', 'player')
    preGameSettings.style.display = "none"
    allowShipDragging()
    document.getElementById('stage-3').classList.remove('active-stage')
    document.getElementById('stage-1').classList.add('active-stage')
}

// When submiting this form Ship Placement stage begins
playerNamesForm.addEventListener('submit', (e) => {
    e.preventDefault()
    setGame();
})

const placingFinishedButton = document.getElementById('placing-finished')
placingFinishedButton.addEventListener('click', () => {
    if (game.startGame()) {
        const P1enemyBoardTiles = document.getElementById('P1enemyBoard').childNodes
        P1enemyBoardTiles.forEach(tile => tile.addEventListener('click', attackTile))
        document.getElementById('stage-1').classList.remove('active-stage')
        document.getElementById('stage-2').classList.add('active-stage')
        blockShipDragging()
        blockShipRotations()
    }
})

function attackTile(e) {
    let path = e.path || (e.composedPath && e.composedPath())
    let tileId = parseInt(path[0].id.split('-')[1])
    game.player1.setNextOutgoingAttack(tileId)
    gameLoop()
    this.removeEventListener('click', attackTile)
}

function gameLoop() {
    game.gameTurn()
    domBoard.renderBoard(game.player1.gameboard, 'P1Board', 'ship-container', 'player')
    domBoard.renderBoard(game.player2.gameboard, 'P1enemyBoard',  'ship-container2', 'enemy')
    if (game.getStage() === 'ended') {
        const P1enemyBoardTiles = document.getElementById('P1enemyBoard').childNodes
        P1enemyBoardTiles.forEach(tile => {
            tile.removeEventListener('click', attackTile)
        })
        const playAgainButton = document.getElementById('play-again')
        playAgainButton.addEventListener('click', () => {
            game = new Game()
            setGame()
        })
        document.getElementById('stage-2').classList.remove('active-stage')
        document.getElementById('stage-3').classList.add('active-stage')
    }
}

// Drag And Drop Ships

function allowShipDragging() {
    let playerBoard = document.getElementById('P1Board')
    playerBoard.addEventListener('dragover', dragOnBoard, false)
    playerBoard.addEventListener('dragleave', dragOffBoard, false)
    playerBoard.addEventListener('drop', dropHandle, false)

    const P1BoardTiles = document.getElementById('P1Board').childNodes
    P1BoardTiles.forEach(tile => tile.addEventListener('dragover', dragOnTile, false))
    P1BoardTiles.forEach(tile => tile.addEventListener('dragleave', dragOffTile, false))

    // TODO: https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/setDragImage agregar.
    const outOfBoardShips = document.getElementsByClassName('out-of-board-ship')
    for (let ship of outOfBoardShips) {
        ship.addEventListener('dragstart', dragStarted, false)
        ship.addEventListener('dragend', dragEnded, false)
    }

    const shipTiles = document.getElementsByClassName('tile-ship')
    for (let shipTile of shipTiles) {
        shipTile.addEventListener('dragstart', dragStarted, false)
        shipTile.addEventListener('dragend', dragEnded, false)
        shipTile.classList.add('drag-on')
    }
}

function dropHandle(e) {
    // TODO: Prevent from dropping thing that arent ships
    e.preventDefault()

    let position = parseInt(e.target.id.split('-')[1])
    let shipId = parseInt(e.dataTransfer.getData('shipId'))
    game.player1.gameboard.moveShip(shipId, position)

    this.classList.remove('over')
    e.target.classList.remove('over-tile')
    domBoard.renderBoard(game.player1.gameboard, 'P1Board', 'ship-container', 'player')
    allowShipDragging()
    allowShipRotations()
}

function allowShipRotations() {
    let playerBoard = document.getElementById('P1Board')
    let shipTiles = playerBoard.querySelectorAll('.tile-ship')
    shipTiles.forEach(tile => tile.addEventListener('click', rotateShip, false))
}

function rotateShip(e) {
    let shipId = parseInt(e.target.getAttribute('data-shipid'))
    game.player1.gameboard.rotateShip(shipId)
    domBoard.renderBoard(game.player1.gameboard, 'P1Board', 'ship-container', 'player')
    allowShipDragging()
    allowShipRotations()
}

function dragStarted(e) {
    this.style.opacity = '0.4'
    e.dataTransfer.setData('shipId', e.target.dataset.shipid)
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

function blockShipDragging() {
    let playerBoard = document.getElementById('P1Board')
    playerBoard.removeEventListener('dragover', dragOnBoard)
    playerBoard.removeEventListener('dragleave', dragOffBoard)
    playerBoard.removeEventListener('drop', dropHandle)

    const P1BoardTiles = document.getElementById('P1Board').childNodes
    P1BoardTiles.forEach(tile => tile.removeEventListener('dragover', dragOnTile))
    P1BoardTiles.forEach(tile => tile.removeEventListener('dragleave', dragOffTile))

    const shipTiles = document.getElementsByClassName('tile-ship')
    for (let shipTile of shipTiles) {
        shipTile.removeEventListener('dragstart', dragStarted)
        shipTile.removeEventListener('dragend', dragEnded)
        shipTile.classList.remove('drag-on')
        shipTile.draggable = false
    }
}

function blockShipRotations() {
    let playerBoard = document.getElementById('P1Board')
    let shipTiles = playerBoard.querySelectorAll('.tile-ship')
    shipTiles.forEach(tile => tile.removeEventListener('click', rotateShip))
}
