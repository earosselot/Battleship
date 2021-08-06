const Game = require('./game')

// TODO: change all test to the new way to instaciate Game()

test('player relation', () => {
    const game = new Game('human', 'pepe', 'computer', 'robot')
    expect(game.player1.enemy).toEqual(game.player2)
    expect(game.player2.enemy).toEqual(game.player1)
})

test('create not valid player', () => {
    expect(() => {const game = new Game('humano', 'pepe', 'androide', 'robot')}).toThrow()
})

const game1 = new Game('human', 'pepe', 'computer', 'robot')

test('Start game with all ships placed', () => {
    game1.player1.createShips()
    game1.player2.createShips()
    game1.player2.placeShips()
    for (let i = 0; i < 10; i++) {
        game1.player1.gameboard.moveShip(i,i*10)
    }
    expect(game1.getStage()).toMatch('preGame')
    expect(game1.startGame()).toBeTruthy()
    expect(game1.getStage()).toMatch('inGame')
})

test('Attempt to start when not all ships are in place', () => {
    const game2 = new Game('human', 'pepe', 'computer', 'robot')
    game2.player1.createShips()
    game2.player2.createShips()
    game2.player2.placeShips()
    for (let i = 20; i < 29; i++) {
        game2.player1.gameboard.moveShip(i,(i % 20)*10)
    }
    expect(game2.getStage()).toMatch('preGame')
    expect(game2.startGame()).toBeFalsy()
    expect(game2.getStage()).toMatch('preGame')
})

test('Attempt to start when stage is inGame', () => {
    const game2 = new Game('human', 'pepe', 'computer', 'robot')
    game2.player1.createShips()
    game2.player2.createShips()
    game2.player2.placeShips()
    for (let i = 40; i < 50; i++) {
        game2.player1.gameboard.moveShip(i,(i % 40)*10)
    }
    game2.startGame()
    expect(() => {game2.startGame()}).toThrow()
})

test('Attempt to start when stage is ended', () => {
    const game2 = new Game('human', 'pepe', 'computer', 'robot')
    game2.setStage('ended')
    expect(() => {game2.startGame()}).toThrow()
})

test('Attempt to play a turn with game not started', () => {
    const game = new Game('computer', 'robo1', 'computer', 'robo2')
    game.player1.createShips()
    game.player2.createShips()
    game.player1.placeShips()
    game.player2.placeShips()
    expect(() => {game.gameTurn()}).toThrow()
})

test('Game flow for 2 computer players', () => {
    const game = new Game('computer', 'robo1', 'computer', 'robo2')
    game.player1.createShips()
    game.player2.createShips()
    game.player1.placeShips()
    game.player2.placeShips()
    game.startGame()
    expect(game.getStage()).toMatch('inGame')
    expect(game.getWinner()).toBeNull()
    while (!game.getWinner()) {
        game.gameTurn()
    }
    expect(game.getStage()).toMatch('ended')
    expect(game.getWinner()).not.toBeNull()
})

test('Game turn for 2 human players', () => {
    const game = new Game('human', 'robo1', 'human', 'robo2')
    game.player1.createShips()
    game.player2.createShips()
    for (let i = 100; i < 110; i++) {
        game.player1.gameboard.moveShip(i,(i % 100)*10)
    }
    for (let i = 110; i < 120; i++) {
        game.player2.gameboard.moveShip(i,(i % 110)*10)
    }
    game.startGame()
    game.player1.setNextOutgoingAttack(15)
    game.player2.setNextOutgoingAttack(54)
    game.gameTurn()
    expect(game.player1.getNextOutgoingAttack()).toBeNull()
    expect(game.player2.getNextOutgoingAttack()).toBe(54)
    game.gameTurn()
    expect(game.player2.getNextOutgoingAttack()).toBeNull()
})

test('Game turn for 1 human and 1 computer', () => {
    const game = new Game('human', 'robo1', 'computer', 'robo2')
    game.player1.createShips()
    game.player2.createShips()
    for (let i = 120; i < 130; i++) {
        game.player1.gameboard.moveShip(i,(i % 120)*10)
    }
    game.player2.placeShips()
    game.startGame()
    game.player1.setNextOutgoingAttack(14)
    game.gameTurn()
    expect(game.player1.getNextOutgoingAttack()).toBeNull()
    expect(game.player2.getNextOutgoingAttack()).toBeNull()
})

test('Game turn for 1 computer and 1 human', () => {
    const game = new Game('computer', 'robo1', 'human', 'humano123')
    game.player1.createShips()
    game.player2.createShips()
    for (let i = 150; i < 160; i++) {
        game.player2.gameboard.moveShip(i,(i % 150)*10)
    }
    game.player1.placeShips()
    game.startGame()
    game.player2.setNextOutgoingAttack(14)
    game.gameTurn()
    expect(game.player1.getNextOutgoingAttack()).toBeNull()
    expect(game.player2.getNextOutgoingAttack()).toBeNull()
})
