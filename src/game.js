const Human = require('./humanPlayer')
const Computer = require('./computerPlayer')

class Game {
    constructor(_player1Type, _p1name, _player2Type, _p2name) {
        this.player1 = this.createPlayer(_player1Type, _p1name)
        this.player2 = this.createPlayer(_player2Type, _p2name)
        this.relatePlayers()
    }

    createPlayer(_playerType, _playerName) {
        if (_playerType === 'human') {
            return new Human(_playerName)
        } else if (_playerType === 'computer') {
            return new Computer(_playerName)
        } else {
            throw new Error('type of player not valid. Must be "human" or "computer"')
        }
    }

    relatePlayers() {
        this.player1.setEnemy(this.player2)
        this.player2.setEnemy(this.player1)
    }
}

module.exports = Game
