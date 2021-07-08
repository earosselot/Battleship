const Player = require('./player')

class Computer extends Player {
    constructor(_name) {
        super(_name)
        this.tiles = this.makeArrayOfTiles()
    }

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
