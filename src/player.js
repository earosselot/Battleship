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

    setNextOutgoingAttack() {
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
