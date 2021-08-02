const Ship = require('./ship');

class Gameboard {

    constructor() {
        this.ships = {}
        this.tilesShooted = {'water': [], 'hit': []}
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
        for (let tile1 of ship1Tiles) {
            for (let tile2 of ship2Tiles) {
                if (tile1 === tile2) {
                    return true
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
        return this.moveShip(shipId, previousPosition[0])
    }

    receiveAttack(coordinate) {
        if (this.tilesShooted.water.includes(coordinate) || this.tilesShooted.hit.includes(coordinate)) {
            return false
        }
        if (this.shipHit(coordinate)) {
            this.tilesShooted.hit.push(coordinate)
        } else {
            this.tilesShooted.water.push(coordinate)
        }
        return true
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
