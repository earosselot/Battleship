const Ship = require('./ship');

class Gameboard {

    constructor() {
        this.ships = {}
        this.shootsRecieved = {'water': [], 'hit': []}
    }

    addShip(shipLength) {
        let ship = new Ship(shipLength)
        this.ships[ship.getId()] = ship
        return this.ships[ship.getId()]
    }

    removeShip(shipId) {
        delete this.ships[shipId]
    }

    getShips() {
        return this.ships
    }

    moveShip(shipId, position) {
        let previousPosition = this.ships[shipId].getTiles()
        this.ships[shipId].setTiles(position)
        for (let ship of Object.values(this.ships)) {
            if (ship.getId() !== shipId && this.shipsIntersects(ship.getId(), shipId)) {
                this.ships[shipId].setTiles(previousPosition)
                return false
            }
        }
        return  true
    }

    shipsIntersects(ship1Id, ship2Id) {
        let ship1Tiles = this.ships[ship1Id].getTiles()
        let ship2Tiles = this.ships[ship2Id].getTiles()
        if (ship1Tiles.length > 0 && ship2Tiles.length > 0) {
            for (let tile1 of ship1Tiles) {
                for (let tile2 of ship2Tiles) {
                    if (tile1 === tile2) {
                        return true
                    }
                }
            }
        }
        return false
    }

    rotateShip(shipId) {
        if (this.ships[shipId].getTiles().length === 0) {
            throw new Error(`Can't rotate ship outside the board`)
        }
        this.ships[shipId].toggleOrientation()
        let previousPosition = this.ships[shipId].getTiles()
        let validRotation = this.moveShip(shipId, previousPosition[0])
        if (validRotation) {
            return validRotation
        }
        this.ships[shipId].toggleOrientation()
        return validRotation
    }

    receiveAttack(coordinate) {
        if (Number.isInteger(coordinate)) {
            if (this.shootsRecieved.water.includes(coordinate) || this.shootsRecieved.hit.includes(coordinate)) {
                return false
            }
            if (this.shipHit(coordinate)) {
                this.shootsRecieved.hit.push(coordinate)
            } else {
                this.shootsRecieved.water.push(coordinate)
            }
            return true
        } else {
            return null
            // throw new Error('coordinate must be an integer')
        }
    }

    shipHit(coordinate){
        let shipHit = false
        for (let ship of Object.values(this.ships)) {
            shipHit = shipHit || ship.hit(coordinate)
        }
        return shipHit
    }

    allShipsSank() {
        for (let ship of Object.values(this.ships)) {
            if (!ship.isSunk()) {
                return false
            }
        }
        return true
    }
}

module.exports = Gameboard
