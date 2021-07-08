const Gameboard = require('./gameboard')

class Player {
    constructor(_name) {
        this.name = _name
        this.gameboard = new Gameboard()
        this.nextOutgoingAttack = null
        this.enemy = null
    }

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
