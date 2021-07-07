const Gameboard = require('./gameboard')
const Ship = require('./ship')



// test('board creation length', () => {
//     let gameboard = new Gameboard()
//     expect(gameboard.board.length).toBe(100);
// })
//
// test('beard creation zeros', () => {
//     let gameboard = new Gameboard()
//     expect(gameboard.board.reduce((a,b) => a + b, 0)).toBe(0);
// })

test('addShip', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4)
    gameboard.addShip(5)
    expect(gameboard.ships['1']).toBeInstanceOf(Ship)
})

test('set ship position', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(2)
    gameboard.placeShip(0, 7)
    expect(gameboard.tilesWithShips['7']).toBe(0)
    expect(gameboard.tilesWithShips['8']).toBe(0)
})
