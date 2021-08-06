const Game = require('./game')
const Human = require('./humanPlayer')
const Computer = require('./computerPlayer')
const domBoard = require('./domGameboard')
const domBegin = require('./domGameBegin')

let players = {'number': 1}
let game = new Game()

const OnePlayerButton = document.getElementById('1player')
const TwoPlayerButton = document.getElementById('2players')
const playerNamesForm = document.getElementById('player-names-form')
const preGameSettings = document.getElementById('pre-game-settings')
const gameContainer = document.getElementById('game-container')
const placingFinishedButton = document.getElementById('placing-finished')
const playAgainButton = document.getElementById('play-again')
const helpTextContainer = document.getElementById('help-text')
const enemyBoard = document.getElementById('P1enemyBoard')
const shipContainer = document.getElementById('ship-container')

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
    enemyBoard.style.display = 'none'
    shipContainer.style.display = 'flex'
    preGameSettings.style.display = 'none'
    gameContainer.style.display = 'flex'
    placingFinishedButton.style.display = 'block'
    placingFinishedButton.classList.add('disabled')
    playAgainButton.style.display = 'none'
    allowShipDragging()
    document.getElementById('stage-3').classList.remove('active-stage')
    helpTextContainer.classList.remove('result')
    document.getElementById('stage-1').classList.add('active-stage')
    helpTextContainer.innerHTML = "<p>Drag and drop the ships into the board. Click on ships to rotate<br>" +
        "When you're ready click on Placing Finished to start the game</p>"
}

// When submiting this form Ship Placement stage begins
playerNamesForm.addEventListener('submit', (e) => {
    e.preventDefault()
    setGame();
})

placingFinishedButton.addEventListener('click', () => {
    if (game.startGame()) {
        placingFinishedButton.style.display = 'none'
        playAgainButton.style.display = 'block'
        playAgainButton.classList.add('disabled')
        enemyBoard.style.display = 'grid'
        shipContainer.style.display = 'none'
        const P1enemyBoardTiles = document.getElementById('P1enemyBoard').childNodes
        P1enemyBoardTiles.forEach(tile => tile.addEventListener('click', attackTile))
        document.getElementById('stage-1').classList.remove('active-stage')
        document.getElementById('stage-2').classList.add('active-stage')
        helpTextContainer.innerHTML = '<p>Click on the enemy board to attack tiles.</p>'
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
        playAgainButton.classList.remove('disabled')
        playAgainButton.addEventListener('click', () => {
            game = new Game()
            setGame()
        })
        document.getElementById('stage-2').classList.remove('active-stage')
        document.getElementById('stage-3').classList.add('active-stage')
        setWinner()
    }
}

function setWinner() {
    if (game.getWinner() instanceof Human || game.getWinner() instanceof Computer) {
        helpTextContainer.innerHTML = `<p>${game.getWinner().name} has sunk all enemy ships and won the war!</p>`
    } else {
        helpTextContainer.innerHTML = `<p>Amazing! all the ships have been sunk at the same time!!</p><p>The game is tie!</p>`
    }
    helpTextContainer.classList.add('result')
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
        ship.draggable = true
    }

    const shipTiles = document.getElementsByClassName('tile-ship')
    for (let shipTile of shipTiles) {
        shipTile.addEventListener('dragstart', dragStarted, false)
        shipTile.addEventListener('dragend', dragEnded, false)
        shipTile.classList.add('drag-on')
        shipTiles.draggable = true
    }
}

function dropHandle(e) {
    e.preventDefault()
    if (e.dataTransfer.getData('shipId')) {
        let position = parseInt(e.target.id.split('-')[1])
        let shipId = parseInt(e.dataTransfer.getData('shipId'))
        game.player1.gameboard.moveShip(shipId, position)

        this.classList.remove('over')
        e.target.classList.remove('over-tile')
        domBoard.renderBoard(game.player1.gameboard, 'P1Board', 'ship-container', 'player')
        allShipsInBoard()
        allowShipDragging()
        allowShipRotations()
    } else {
        let playerBoard = document.getElementById('P1Board')
        playerBoard.classList.remove('over')
        e.target.classList.remove('over-tile')
    }
}

function allShipsInBoard() {
    let notPlacedShips = shipContainer.childNodes
    if (notPlacedShips.length === 0) {
        shipContainer.style.display = 'none'
        placingFinishedButton.classList.remove('disabled')
    }
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
