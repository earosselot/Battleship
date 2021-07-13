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
    for (tileId of Object.keys(playerGameboard.tilesWithShips)) {
        let tileWithShip = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileWithShip.classList.add('tile-ship')
    }
}

function showShotedWaterTiles(playerGameboard, DOMBoardId) {
    for (tileId of playerGameboard.tilesShoted.water) {
        let tileWithShip = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileWithShip.classList.add('tile-water')
    }
}

function showShotedHitTiles(playerGameboard, DOMBoardId) {
    for (tileId of playerGameboard.tilesShoted.hit) {
        let tileWithShip = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileWithShip.classList.add('tile-hit')
    }
}

function showSunkShipTiles(playerGameboard, DOMBoardId) {
    let sunkShips = playerGameboard.sunkShips()
    for (shipId of sunkShips) {
        for (tile of Object.keys(playerGameboard.tilesWithShips)) {
            if (playerGameboard.tilesWithShips[tile] === shipId) {
                let sunkTile = document.getElementById(`${DOMBoardId}-${tile}`)
                sunkTile.classList.remove('tile-hit')
                sunkTile.classList.add('tile-sunk')
            }
        }
    }
}

module.exports = { createBoard, renderPlayerBoard, renderEnemyBoard }
