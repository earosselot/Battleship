const Human = require('./humanPlayer')
const Computer = require('./computerPlayer')

class Game {
    constructor(_player1Type, _p1name, _player2Type, _p2name) {
        this.player1 = this.createPlayer(_player1Type, _p1name)
        this.player2 = this.createPlayer(_player2Type, _p2name)
        this.relatePlayers()
        this.gameEnded = false
        this.winner = null
    }

    getGameEnded() {
        return this.gameEnded
    }

    getWinner() {
        return this.winner
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

    gameTurn() {
        if (this.player1 instanceof Human && this.player2 instanceof Computer) {
            this.player1.play()
            this.player2.setNextOutgoingAttack()
            this.player2.play()
        } else if (this.player1 instanceof Computer && this.player2 instanceof Computer) {
            this.player1.setNextOutgoingAttack()
            this.player1.play()
            this.player2.setNextOutgoingAttack()
            this.player2.play()
        } else if (this.player1 instanceof Human && this.player2 instanceof Human) {
            if (this.player1.nextOutgoingAttack) {
                this.player1.play()
            } else if (this.player2.nextOutgoingAttack) {
                this.player2.play()
                this.checkEndGame()
            }
        }
    }

    checkEndGame() {
        if (this.player1.gameboard.allShipsSank() || this.player2.gameboard.allShipsSank()) {
            this.gameEnded = true
            this.setWinner()
        }
    }

    setWinner() {
        if (this.player1.gameboard.allShipsSank() && this.player2.gameboard.allShipsSank()) {
            this.winner = 'tie'
        } else if (this.player1.gameboard.allShipsSank()) {
            this.winner = this.player2
        } else if (this.player2.gameboard.allShipsSank()) {
            this.winner = this.player1
        }
    }
}

module.exports = Game
