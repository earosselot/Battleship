const Player = require('./player')

class Human extends Player {
    constructor(_name) {
        super(_name)
    }

    setNextOutgoingAttack(coordinate) {
        this.nextOutgoingAttack = coordinate
    }
}

module.exports = Human
