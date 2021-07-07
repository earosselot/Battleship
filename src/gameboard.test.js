const Gameboard = require('./gameboard')
const Ship = require('./ship')


test('addShip', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 0
    gameboard.addShip(5) // 1
    expect(gameboard.ships['1']).toBeInstanceOf(Ship)
})

test('set ship position', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(2) // 2
    expect(gameboard.placeShip(2, 7)).toBeTruthy()
    expect(gameboard.tilesWithShips['7']).toBe(2)
    expect(gameboard.tilesWithShips['8']).toBe(2)
})

test('set ship on not valid position', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(2) // 3
    gameboard.addShip(4) // 4
    gameboard.placeShip(3, 7)
    expect(gameboard.placeShip(4, 6)).toBeFalsy()
    expect(gameboard.tilesWithShips).toEqual({
        '7': 3, '8':3
    })
})

test('complete the board', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(2) // 5
    gameboard.placeShip(5, 9)
    gameboard.addShip(4) // 6
    gameboard.ships[6].rotate()
    gameboard.placeShip(6, 99)
    gameboard.addShip(5) // 7
    expect(gameboard.placeShip(7, 88)).toBeFalsy()
    expect(gameboard.tilesWithShips).toEqual({
        '9': 5, '8':5, '99':6, '89':6, '79':6, '69':6
    })
})

test('receive Attack on watter', () => {
    let gameboard = new Gameboard()
    gameboard.receiveAttack(35)
    gameboard.receiveAttack(48)
    gameboard.receiveAttack(48)
    expect(gameboard.tilesShoted).toEqual([35, 48])
})

test('receive attack on ship', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 8
    gameboard.placeShip(8, 33)
    gameboard.receiveAttack(35)
    gameboard.receiveAttack(35)
    expect(gameboard.ships[8].hits).toBe(1)
    gameboard.receiveAttack(33)
    expect(gameboard.ships[8].hits).toBe(2)
})

test('all ships sank', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 9
    gameboard.placeShip(9, 33)
    gameboard.addShip(2) // 10
    gameboard.placeShip(10, 6)
    gameboard.receiveAttack(33)
    gameboard.receiveAttack(34)
    expect(gameboard.allShipsSank()).toBeFalsy()
    gameboard.receiveAttack(35)
    gameboard.receiveAttack(36)
    expect(gameboard.allShipsSank()).toBeFalsy()
    gameboard.receiveAttack(6)
    expect(gameboard.allShipsSank()).toBeFalsy()
    gameboard.receiveAttack(7)
    expect(gameboard.allShipsSank()).toBeTruthy()
})

