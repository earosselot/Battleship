
function createBoard(DOMboardId) {
    const boardContainer = document.getElementById(DOMboardId);
    for (let i = 0; i < 100; i++) {
        let tile = document.createElement('div')
        tile.setAttribute('id', `${DOMboardId}-${i}`)
        tile.classList.add('tile')
        boardContainer.appendChild(tile)
    }
}

function renderBoard(Gameboard, DOMBoardId, ShipContainerId, mode) {
    if (mode === 'player' || mode === 'enemy') {
        clearBoard(DOMBoardId)
        if (mode === 'player') {
            renderAllShips(Gameboard, DOMBoardId, ShipContainerId)
        }
        // renderShoots(Gameboard, DOMBoardId)
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

// Si la nave esta en el tablero:
//     Argega a cada tile del tablero donde esta la nave (ship.tiles) las clases 'tile-ship', 'no-dop',
//     y 'ship-left/right/top/bottom' segun corresponda.
//     Sino hace lo mismo pero en el shipContainer de id shipContainerId
// Tambien le agrega el atributo 'data-ship-id' con valor ship.id
// Tambien les agrega el atributo draggable a todas las naves

function renderShip(ship, DOMBoardId, ShipContainerId) {
    let shipTiles = ship.getTiles()
    if (shipTiles.length === 0) {
        const shipContainer = document.getElementById(ShipContainerId)
        let outOfBoardShip = createOutOfBoardShip(ship.length)
        outOfBoardShip.draggable = true
        shipContainer.appendChild(outOfBoardShip)
    }


    //
    // if (ship.horizontal) {
    //     for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
    //         let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + shipPositionDelta}`)
    //         if (shipPositionDelta === 0) {
    //             shipTile.classList.add('ship-left')
    //         } else if (shipPositionDelta === ship.length - 1) {
    //             shipTile.classList.add('ship-right')
    //         }
    //         shipTile.classList.add('tile-ship')
    //         shipTile.classList.add('no-drop')
    //         shipTile.setAttribute('data-ship-id', ship.getId())
    //     }
    // } else {
    //     for (let shipPositionDelta = 0; shipPositionDelta < ship.length; shipPositionDelta++) {
    //         let shipTile = document.getElementById(`${DOMBoardId}-${ship.position + (10 * shipPositionDelta)}`)
    //         if (shipPositionDelta === 0) {
    //             shipTile.classList.add('ship-top')
    //         } else if (shipPositionDelta === ship.length - 1) {
    //             shipTile.classList.add('ship-bottom')
    //         }
    //         shipTile.classList.add('tile-ship')
    //         shipTile.classList.add('no-drop')
    //         shipTile.setAttribute('data-ship-id', ship.getId())
    //     }
    // }
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

// function renderPlayerBoard(playerGameboard, DOMBoardId) {
//     clearBoard(DOMBoardId)
//     renderAllShips(playerGameboard, DOMBoardId)
//     showShotedWaterTiles(playerGameboard, DOMBoardId)
//     showShotedHitTiles(playerGameboard, DOMBoardId)
//     showSunkShipTiles(playerGameboard, DOMBoardId)
// }
//
// function renderShoots(Gameboard, DOMBoardId) {
//     showShotedWaterTiles(Gameboard, DOMBoardId)
//     showShotedHitTiles(Gameboard, DOMBoardId)
//     showSunkShipTiles(Gameboard, DOMBoardId)
// }


//
//
//
//
//
// function showShotedWaterTiles(playerGameboard, DOMBoardId) {
//     for (tileId of playerGameboard.tilesShoted.water) {
//         let tileWater = document.getElementById(`${DOMBoardId}-${tileId}`)
//         tileWater.classList.add('tile-water')
//         addShootMarker(tileWater)
//     }
// }
//
// function showShotedHitTiles(playerGameboard, DOMBoardId) {
//     for (tileId of playerGameboard.tilesShoted.hit) {
//         let tileHit = document.getElementById(`${DOMBoardId}-${tileId}`)
//         tileHit.classList.remove('tile-ship')
//         tileHit.classList.add('tile-hit')
//         addShootMarker(tileHit)
//     }
// }
//
// function addShootMarker(tile) {
//     const hitMarker = document.createElement('div')
//     hitMarker.classList.add('shoot')
//     tile.innerHTML = ''
//     tile.appendChild(hitMarker)
// }
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
