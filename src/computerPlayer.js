const Player = require('./player')

class Computer extends Player {
    constructor(_name) {
        super(_name)
        this.tiles = this.makeArrayOfTiles()
    }

    // placeShips() {
    //     for (let ship of Object.values(this.gameboard.ships)) {
    //         let validPosition = false
    //         while (!validPosition) {
    //             let position = this.generatePosition()
    //             this.randomRotation(ship.id)
    //             validPosition = this.gameboard.placeShip(ship.id, position)
    //         }
    //     }
    // }

    // randomRotation(shipId) {
    //     if (Math.random() < 0.5) {
    //         this.gameboard.ships[shipId].rotate()
    //     }
    // }
    //
    // generatePosition() {
    //     return Math.floor(Math.random() * 100)
    // }

    setNextOutgoingAttack() {
        this.tiles = this.shuffleArray(this.tiles)
        this.nextOutgoingAttack = this.tiles.pop()
    }

    shuffleArray(array) {
        array.sort((a, b) => 0.5 - Math.random())
        return array
    }

    makeArrayOfTiles() {
        let array = []
        for (let i = 0; i < 100; i++) {
            array.push(i)
        }
        return array
    }
}

module.exports = Computer
