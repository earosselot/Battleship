
function createBoard(DOMboardId) {
    const boardContainer = document.getElementById(DOMboardId);
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

function renderAllShips(Gameboard, DOMBoardId, ShipContainerId) {
    for (ship of Object.values(Gameboard.ships)) {
        renderShip(ship, DOMBoardId, ShipContainerId)
    }
}

function renderShip(ship, DOMBoardId, ShipContainerId) {
    let shipTiles = ship.getTiles()
    if (shipTiles.length === 0) {
        const shipContainer = document.getElementById(ShipContainerId)
        let outOfBoardShip = createOutOfBoardShip(ship.length)
        outOfBoardShip.draggable = true
        outOfBoardShip.setAttribute('data-ship-id', ship.getId())
        shipContainer.appendChild(outOfBoardShip)
    } else {
        for (let tile = 0; tile < ship.length; tile++) {
            let domTile = document.getElementById(`${DOMBoardId}-${shipTiles[tile]}`)
            domTile.classList.add('tile-ship')
            domTile.classList.add('no-drop')
            domTile.draggable = true
            domTile.setAttribute('data-ship-id', ship.getId())
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
    // TODO: seguir agregando aca los shoots hit y los hundidos
}

function renderShootedWaterTiles(playerGameboard, DOMBoardId) {
    for (tileId of playerGameboard.shootsRecieved.water) {
        let tileWater = document.getElementById(`${DOMBoardId}-${tileId}`)
        tileWater.classList.add('tile-water')
        addShootMarker(tileWater)
    }
}

// function showShotedHitTiles(playerGameboard, DOMBoardId) {
//     for (tileId of playerGameboard.tilesShoted.hit) {
//         let tileHit = document.getElementById(`${DOMBoardId}-${tileId}`)
//         tileHit.classList.remove('tile-ship')
//         tileHit.classList.add('tile-hit')
//         addShootMarker(tileHit)
//     }
// }
//
function addShootMarker(tile) {
    const hitMarker = document.createElement('div')
    hitMarker.classList.add('shoot')
    tile.innerHTML = ''
    tile.appendChild(hitMarker)
}
//
// function showSunkShipTiles(playerGameboard, DOMBoardId) {
//     let sunkShips = playerGameboard.getSunkShips()
//     for (shipId of sunkShips) {
//         showSunkShip(playerGameboard.ships[shipId], DOMBoardId)
//     }
// }
//
// function showSunkShip(ship, DOMBoardId) {
//     if (ship.horizontal) {
//         for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
//             let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + shipPositionDelta}`)
//             if (shipPositionDelta === 0) {
//                 shipTile.classList.add('ship-left')
//             } else if (shipPositionDelta === ship.length - 1) {
//                 shipTile.classList.add('ship-right')
//             }
//             shipTile.classList.remove('tile-hit')
//             shipTile.classList.add('tile-sunk')
//         }
//     } else {
//         for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
//             let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + (10 * shipPositionDelta)}`)
//             if (shipPositionDelta === 0) {
//                 shipTile.classList.add('ship-top')
//             } else if (shipPositionDelta === ship.length - 1) {
//                 shipTile.classList.add('ship-bottom')
//             }
//             shipTile.classList.remove('tile-hit')
//             shipTile.classList.add('tile-sunk')
//         }
//     }
// }

module.exports = { createBoard, renderBoard }
