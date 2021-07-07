const Ship = require('./ship');

class Gameboard {

    constructor() {
        // this.board = this.createBoard()
        this.ships = {}
        this.tilesWithShips = {}
        this.tilesShoted = []
    }


    addShip(shipLenght) {
        let ship = new Ship(shipLenght)
        this.ships[ship.id] = ship
        return this.ships
    }

    placeShip(shipId, position) {
        this.ships[shipId].setPosition(position)
        let tiles = this.ships[shipId].getTiles()
        for (let tile of tiles) {
            this.tilesWithShips[tile] = shipId
        }
    }
}

module.exports = Gameboard
