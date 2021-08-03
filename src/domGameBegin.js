
const player2NameInput = document.getElementById('player2-name')
const player1NameInput = document.getElementById('player1-name')

function setToOnePlayer(players) {
    player2NameInput.style.display = 'none'
    player2NameInput.required = false
    players.number = 1
}

function setToTwoPlayers(players) {
    player2NameInput.style.display = 'block'
    player2NameInput.required = true
    players.number = 2
}

function startGame(game, players) {
    if (players.number === 1) {
        game.addPlayer1('human', player1NameInput.value)
        game.addPlayer2('computer', 'r2-d2')
        game.player1.createShips()
        game.player2.createShips()
        game.player2.placeShips()
    } else if (players.number === 2) {
        game.addPlayer1('human', player1NameInput.value)
        game.addPlayer2('human', player2NameInput.value)
    }
    game.relatePlayers()
}

module.exports = { setToOnePlayer, setToTwoPlayers, startGame }