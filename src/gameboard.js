const Ship = require('./ship');

class Gameboard {

    constructor() {
        this.ships = {}
        this.tilesWithShips = {}
        this.tilesShoted = []
    }

    addShip(shipLenght) {
        let ship = new Ship(shipLenght)
        this.ships[ship.getId()] = ship
        return this.ships[ship.getId()]
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

    receiveAttack(coordinate) {
        if (this.tilesShoted.includes(coordinate)) {
            return false
        } else {
            this.tilesShoted.push(coordinate)
            if (coordinate in this.tilesWithShips) {
                const shipId = this.tilesWithShips[coordinate]
                this.ships[shipId].hit()
                return 'hit'
            }
            return 'water'
        }
    }

    allShipsSank() {
        for (const ship of Object.values(this.ships)) {
            if (!ship.isSunk()) {
                return false
            }
        }
        return true
    }

}

module.exports = Gameboard
