
function createBoard(DOMboardId) {
    const boardContainer = document.getElementById(DOMboardId);
    boardContainer.innerHTML = ''
    for (let i = 0; i < 100; i++) {
        let tile = document.createElement('div')
        tile.setAttribute('id', `${DOMboardId}-${i}`)
        tile.classList.add('tile')
        boardContainer.appendChild(tile)
    }
}

function renderBoard(gameboard, DOMBoardId, shipContainerId, mode) {
    if (mode === 'player' || mode === 'enemy') {
        clearBoard(DOMBoardId)
        clearShipContainer(shipContainerId)
        if (mode === 'player') {
            renderAllShips(gameboard, DOMBoardId, shipContainerId)
        }
        renderShoots(gameboard, DOMBoardId)
    } else {
        throw new Error('mode not valid, try with player or enemy')
    }
}

function clearBoard(DOMBoardId) {
    let tiles = document.getElementById(DOMBoardId).childNodes
    tiles.forEach( tile => {
        tile.classList = ''
        tile.classList.add('tile')
    })
}

function clearShipContainer(shipContainerId) {
    const shipContainer = document.getElementById(shipContainerId)
    shipContainer.innerHTML = ''
}

function renderAllShips(gameboard, DOMBoardId, shipContainerId) {
    for (ship of Object.values(gameboard.getShips())) {
        renderShip(ship, DOMBoardId, shipContainerId)
    }
}

function renderShip(ship, DOMBoardId, shipContainerId) {
    let shipTiles = ship.getTiles()
    if (shipTiles.length === 0) {
        let shipContainer = document.getElementById(shipContainerId)
        let outOfBoardShip = createOutOfBoardShip(ship.length)
        // outOfBoardShip.draggable = true
        outOfBoardShip.setAttribute('data-shipId', ship.getId())
        shipContainer.appendChild(outOfBoardShip)
    } else {
        for (let tile = 0; tile < ship.length; tile++) {
            let domTile = document.getElementById(`${DOMBoardId}-${shipTiles[tile]}`)
            domTile.classList.add('tile-ship')
            // domTile.draggable = true
            domTile.setAttribute('data-shipId', ship.getId())
            domTile.setAttribute('data-ship-length', ship.length)
            if (tile === 0) {
                if (ship.horizontal) { domTile.classList.add('ship-left')}
                else { domTile.classList.add('ship-top')}
            } else if (tile === ship.length - 1) {
                if (ship.horizontal) { domTile.classList.add('ship-right')}
                else { domTile.classList.add('ship-bottom')}
            }
        }
    }
}

function createOutOfBoardShip(shipLength) {
    let ship = document.createElement('div')
    ship.classList.add('out-of-board-ship')
    for (let position = 0; position < shipLength; position++) {
        let tile = document.createElement('div')
        tile.classList.add('tile')
        if (position === 0) {
            tile.classList.add('ship-left')
        } else if (position === shipLength - 1) {
            tile.classList.add('ship-right')
        }
        ship.appendChild(tile)
    }
    return ship
}

function renderShoots(gameboard, DOMBoardId) {
    renderShootedWaterTiles(gameboard, DOMBoardId)
    renderShotedHitTiles(gameboard, DOMBoardId)
    renderSunkShips(gameboard, DOMBoardId)
}

function renderShootedWaterTiles(playerGameboard, DOMBoardId) {
    for (tileId of playerGameboard.shootsRecieved.water) {
        let tileWater = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileWater.classList.add('tile-water')
        renderShootMarker(tileWater)
    }
}

function renderShotedHitTiles(gameboard, DOMBoardId) {
    for (tileId of gameboard.shootsRecieved.hit) {
        let tileHit = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileHit.classList.remove('tile-ship')
        tileHit.classList.add('tile-hit')
        renderShootMarker(tileHit)
    }
}

function renderSunkShips(gameboard, DOMBoardId) {
    Object.values(gameboard.getShips()).forEach(ship => {
        if (ship.isSunk()) {
            renderShip(ship, DOMBoardId, null)
            ship.getTiles().forEach(tile => {
                let tileSunk = document.getElementById(`${DOMBoardId}-${tile}`)
                tileSunk.classList.remove('tile-hit')
                tileSunk.classList.remove('tile-ship')
                tileSunk.classList.add('tile-sunk')
            })
        }
    })
}

function renderShootMarker(tile) {
    const hitMarker = document.createElement('div')
    hitMarker.classList.add('shoot')
    tile.innerHTML = ''
    tile.appendChild(hitMarker)
}

module.exports = { createBoard, renderBoard }
