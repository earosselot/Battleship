const Human = require('./humanPlayer')
const Computer = require('./computerPlayer')

class Game {
    constructor() {
        this.player1 = null
        this.player2 = null
        this.stage = 'preGame'
        this.winner = null
    }

    addPlayer1(_playerType, _playerName) {
        if (_playerType === 'human') {
            this.player1 = new Human(_playerName)
        } else if (_playerType === 'computer') {
            this.player1 = new Computer(_playerName)
        } else {
            throw new Error('type of player not valid. Must be "human" or "computer"')
        }
    }

    addPlayer2(_playerType, _playerName) {
        if (_playerType === 'human') {
            this.player2 = new Human(_playerName)
        } else if (_playerType === 'computer') {
            this.player2 = new Computer(_playerName)
        } else {
            throw new Error('type of player not valid. Must be "human" or "computer"')
        }
    }

    relatePlayers() {
        this.player1.setEnemy(this.player2)
        this.player2.setEnemy(this.player1)
    }

    getStage() {
        return this.stage
    }

    setStage(_stage) {
        const stages = ['preGame', 'inGame', 'ended']
        if (stages.includes(_stage)) {
            this.stage = _stage
        } else {
            throw new Error('stage is not a valid game stage')
        }
    }

    getWinner() {
        return this.winner
    }

    startGame() {
        if (this.getStage() === 'preGame') {
            let p1Ships = this.player1.gameboard.getShips()
            let p2Ships = this.player2.gameboard.getShips()
            if (this.checkAllShipsPlaced(p1Ships) && this.checkAllShipsPlaced(p2Ships)) {
                this.setStage('inGame')
                return true
            } else {
                return false
            }
        } else {
            throw new Error('Game has already been started. Try to reset to start over')
        }
    }

    checkAllShipsPlaced(ships) {
        for (let ship of Object.values(ships)) {
            if (ship.getTiles().length === 0) {
                return false
            }
        }
        return true
    }

    gameTurn() {
        if (this.getStage() === 'inGame') {
            if (this.player1 instanceof Human && this.player2 instanceof Computer) {
                this.player1.play()
                this.player2.setNextOutgoingAttack()
                this.player2.play()
                this.checkEndGame()
            } else if (this.player1 instanceof Computer && this.player2 instanceof Human) {
                this.player1.setNextOutgoingAttack()
                this.player1.play()
                this.player2.play()
                this.checkEndGame()
            } else if (this.player1 instanceof Computer && this.player2 instanceof Computer) {
                this.player1.setNextOutgoingAttack()
                this.player1.play()
                this.player2.setNextOutgoingAttack()
                this.player2.play()
                this.checkEndGame()
            } else if (this.player1 instanceof Human && this.player2 instanceof Human) {
                if (this.player1.nextOutgoingAttack) {
                    this.player1.play()
                } else if (this.player2.nextOutgoingAttack) {
                    this.player2.play()
                    this.checkEndGame()
                }
            }
        } else {
            throw new Error('cannot play if the game has not started')
        }

    }

    checkEndGame() {
        if (this.player1.gameboard.allShipsSank() || this.player2.gameboard.allShipsSank()) {
            this.setStage('ended')
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
