const Gameboard = require('./gameboard')

class Player {
    constructor(_name) {
        this.name = _name
        this.gameboard = new Gameboard()
        this.nextOutgoingAttack = null
        this.enemy = null
    }

    createShips() {
        for (let i = 2; i < 6; i++) {
            for (let j = 1; j < 7 - i; j++) {
                this.gameboard.addShip(i)
            }
        }
    }

    // TODO: Delete placeShips, randomRotation and generatePosition methods from Player and uncomment it in
    //  ComputerPlayer when Human player ship placement done
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
    //
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
        // setea el proximo ataque, este va a variar en humanos y computadora
        return null
    }

    getNextOutgoingAttack() {
        return this.nextOutgoingAttack
    }

    setEnemy(_enemy) {
        this.enemy = _enemy
    }

    getEnemy() {
        return this.enemy
    }

    deleteEnemy() {
        this.enemy = null
    }

    play() {
        let coordinate = this.getNextOutgoingAttack()
        this.enemy.gameboard.receiveAttack(coordinate)
        this.nextOutgoingAttack = null
    }
}

module.exports = Player
