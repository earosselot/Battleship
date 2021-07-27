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
    showShips(playerGameboard, DOMBoardId)
    showShotedWaterTiles(playerGameboard, DOMBoardId)
    showShotedHitTiles(playerGameboard, DOMBoardId)
}

function renderEnemyBoard(enemyGameboard, DOMBoardId) {
    showShotedWaterTiles(enemyGameboard, DOMBoardId)
    showShotedHitTiles(enemyGameboard, DOMBoardId)
    showSunkShipTiles(enemyGameboard, DOMBoardId)
}

function showShips(playerGameboard, DOMBoardId) {
    // for (tileId of Object.keys(playerGameboard.tilesWithShips)) {
    //     let tileWithShip = document.getElementById(`${DOMBoardId}-${tileId}`)
    //     tileWithShip.classList.add('tile-ship')
    // }
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
    let sunkShips = playerGameboard.sunkShips()
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
