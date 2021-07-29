
function createBoard(DOMboardId) {
    const boardContainer = document.getElementById(DOMboardId);
    for (let i = 0; i < 100; i++) {
        let tile = document.createElement('div')
        tile.setAttribute('id', `${DOMboardId}-${i}`)
        tile.classList.add('tile')
        boardContainer.appendChild(tile)
    }
}

function renderPlayerBoard(playerGameboard, DOMBoardId) {
    clearBoard(playerGameboard, DOMBoardId)
    showShips(playerGameboard, DOMBoardId)
    showShotedWaterTiles(playerGameboard, DOMBoardId)
    showShotedHitTiles(playerGameboard, DOMBoardId)
    showSunkShipTiles(playerGameboard, DOMBoardId)
}

function renderEnemyBoard(enemyGameboard, DOMBoardId) {
    showShotedWaterTiles(enemyGameboard, DOMBoardId)
    showShotedHitTiles(enemyGameboard, DOMBoardId)
    showSunkShipTiles(enemyGameboard, DOMBoardId)
}

function clearBoard(playerGameboard, DOMBoardId) {
    let tiles = document.getElementById(DOMBoardId).childNodes
    tiles.forEach( tile => {
        tile.classList = ''
        tile.classList.add('tile')
    })
}

function showShips(playerGameboard, DOMBoardId) {
    for (ship of Object.values(playerGameboard.ships)) {
        showPlayerShip(ship, DOMBoardId)
    }
}

function showPlayerShip(ship, DOMBoardId) {
    if (ship.horizontal) {
        for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
            let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + shipPositionDelta}`)
            if (shipPositionDelta === 0) {
                shipTile.classList.add('ship-left')
            } else if (shipPositionDelta === ship.length - 1) {
                shipTile.classList.add('ship-right')
            }
            shipTile.classList.add('tile-ship')
            shipTile.classList.add('no-drop')
            shipTile.setAttribute('data-ship-id', ship.getId())
        }
    } else {
        for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
            let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + (10 * shipPositionDelta)}`)
            if (shipPositionDelta === 0) {
                shipTile.classList.add('ship-top')
            } else if (shipPositionDelta === ship.length - 1) {
                shipTile.classList.add('ship-bottom')
            }
            shipTile.classList.add('tile-ship')
            shipTile.classList.add('no-drop')
            shipTile.setAttribute('data-ship-id', ship.getId())
        }
    }
}

function showShotedWaterTiles(playerGameboard, DOMBoardId) {
    for (tileId of playerGameboard.tilesShoted.water) {
        let tileWater = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileWater.classList.add('tile-water')
        addHitMarker(tileWater)
    }
}

function showShotedHitTiles(playerGameboard, DOMBoardId) {
    for (tileId of playerGameboard.tilesShoted.hit) {
        let tileHit = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileHit.classList.remove('tile-ship')
        tileHit.classList.add('tile-hit')
        addHitMarker(tileHit)
    }
}

function addHitMarker(tile) {
    const hitMarker = document.createElement('div')
    hitMarker.classList.add('shoot')
    tile.innerHTML = ''
    tile.appendChild(hitMarker)
}

function showSunkShipTiles(playerGameboard, DOMBoardId) {
    let sunkShips = playerGameboard.getSunkShips()
    for (shipId of sunkShips) {
        showSunkShip(playerGameboard.ships[shipId], DOMBoardId)
    }
}

function showSunkShip(ship, DOMBoardId) {
    if (ship.horizontal) {
        for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
            let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + shipPositionDelta}`)
            if (shipPositionDelta === 0) {
                shipTile.classList.add('ship-left')
            } else if (shipPositionDelta === ship.length - 1) {
                shipTile.classList.add('ship-right')
            }
            shipTile.classList.remove('tile-hit')
            shipTile.classList.add('tile-sunk')
        }
    } else {
        for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
            let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + (10 * shipPositionDelta)}`)
            if (shipPositionDelta === 0) {
                shipTile.classList.add('ship-top')
            } else if (shipPositionDelta === ship.length - 1) {
                shipTile.classList.add('ship-bottom')
            }
            shipTile.classList.remove('tile-hit')
            shipTile.classList.add('tile-sunk')
        }
    }
}

module.exports = { createBoard, renderPlayerBoard, renderEnemyBoard }
