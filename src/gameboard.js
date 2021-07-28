const Ship = require('./ship');

class Gameboard {

    constructor() {
        this.ships = {}
        this.tilesWithShips = {}
        this.tilesShoted = {'water': [], 'hit': []}
    }

    addShip(shipLength) {
        let ship = new Ship(shipLength)
        this.ships[ship.getId()] = ship
        return this.ships[ship.getId()]
    }

    removeShip(shipId) {
        delete this.ships[shipId]
    }

    placeShip(shipId, position) {
        let tiles = this.ships[shipId].setPosition(position)
        let possibleTiles = {}
        for (const tile of tiles) {
            if (!(tile in this.tilesWithShips)) {
                possibleTiles[tile] = shipId
            } else {
                return false
            }
        }
        this.tilesWithShips = { ...this.tilesWithShips, ...possibleTiles }
        return true
    }

    rotateShip(shipId) {
        let tiles = this.ships[shipId].rotate()
        // this.cleanOldShipTiles(shipId)
        let possibleTiles = {}
        for (const tile of tiles) {
            if (tile < 99 || this.tilesWithShips[tile] === shipId || (!(tile in this.tilesWithShips))) {
                possibleTiles[tile] = shipId
            } else {
                console.log('false')
                this.ships[shipId].toggleOrientation()
                return false
            }
        }
        this.cleanOldShipTiles(shipId)
        this.tilesWithShips = { ...this.tilesWithShips, ...possibleTiles }
        console.log(this.tilesWithShips)
        return true
    }

    cleanOldShipTiles(shipId) {
        console.log(this.tilesWithShips)
        for (let tile of Object.keys(this.tilesWithShips)) {
            if (this.tilesWithShips[tile] === shipId) {
                delete this.tilesWithShips[tile]
            }
        }
    }

    receiveAttack(coordinate) {
        if (this.tilesShoted.water.includes(coordinate) || this.tilesShoted.hit.includes(coordinate)) {
            return false
        }
        if (coordinate in this.tilesWithShips) {
            const shipId = this.tilesWithShips[coordinate]
            this.ships[shipId].hit()
            this.tilesShoted.hit.push(coordinate)
            return true
        }
        this.tilesShoted.water.push(coordinate)
        return true
    }

    allShipsSank() {
        for (const ship of Object.values(this.ships)) {
            if (!ship.isSunk()) {
                return false
            }
        }
        return true
    }

    sunkShips() {
        let sunkShips = []
        for (const ship of Object.values(this.ships)) {
            if (ship.isSunk()) {
                sunkShips.push(ship.id)
            }
        }
        return sunkShips
    }
}

module.exports = Gameboard
