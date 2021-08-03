const Gameboard = require('./gameboard')
const Ship = require('./ship')

test('create Gameboard', () => {
    let gameboard = new Gameboard()
    expect(gameboard).toBeInstanceOf(Gameboard)
    expect(gameboard).toEqual({'ships': {}, 'tilesShooted': {'water': [], 'hit': []}})
})

test('addShip', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 0
    gameboard.addShip(5) // 1
    expect(gameboard.ships['1']).toBeInstanceOf(Ship)
})

test('remove 1 Ship', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 2
    expect(gameboard.getShips()).toEqual({ '2': { id: 2, length: 4, horizontal: true, tiles: [], hits: {} } })
    expect(gameboard.getShips()).hasOwnProperty('2')
    gameboard.removeShip(2)
    expect(gameboard.getShips()).not.hasOwnProperty('2')
    expect(gameboard.getShips()).toEqual({})
})

test('remove 1 Ship from several', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(3) // 3
    gameboard.addShip(3) // 4
    gameboard.addShip(3) // 5
    expect(gameboard.getShips()).hasOwnProperty('3')
    expect(gameboard.getShips()).hasOwnProperty('4')
    expect(gameboard.getShips()).hasOwnProperty('5')
    gameboard.removeShip(4)
    expect(gameboard.getShips()).not.toHaveProperty('4')
})

test('move a single ship into the board', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(2) // 6
    gameboard.moveShip(6, 15)
    expect(gameboard.ships[6].getTiles()).toEqual([15, 16])
})

test('rotate a ship and then move it into the board', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 7
    gameboard.ships[7].toggleOrientation()
    gameboard.moveShip(7, 15)
    expect(gameboard.ships[7].getTiles()).toEqual([15, 25, 35, 45])
})

test('rotate a single ship in the board', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(5) // 8
    gameboard.moveShip(8, 25)
    expect(gameboard.rotateShip(8)).toBeTruthy()
    expect(gameboard.ships[8].getTiles()).toEqual([25, 35, 45, 55, 65])
})

test('rotate a single ship near bottom edge', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(5) // 9
    gameboard.moveShip(9, 82) // 82 83 84 85 86
    gameboard.rotateShip(9)
    expect(gameboard.ships[9].getTiles()).toEqual([52, 62, 72, 82, 92])
})

test('rotate a single ship near right edge', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(5) // 10
    gameboard.ships[10].toggleOrientation()
    gameboard.moveShip(10, 48) // 48 58 68 78 88
    expect(gameboard.rotateShip(10)).toBeTruthy()
    expect(gameboard.ships[10].getTiles()).toEqual([45, 46, 47, 48, 49])
})

test('move a ship to a used position', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(5) // 11
    gameboard.addShip(3) // 12
    gameboard.moveShip(11, 15) // 15 16 17 18 19
    expect(gameboard.moveShip(12, 14)).toBeFalsy()
    expect(gameboard.ships[12].getTiles()).toEqual([])
})

test('move a ship that will overlap with an used position', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(5) // 13
    gameboard.addShip(3) // 14
    gameboard.moveShip(13, 15) // 15 16 17 18 19
    gameboard.moveShip(14, 51)
    expect(gameboard.moveShip(14, 14)).toBeFalsy()
    expect(gameboard.ships[14].getTiles()).toEqual([51, 52, 53])
})

test('rotate a ship that will overlap with another ship', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(5) // 15
    gameboard.addShip(3) // 16
    gameboard.moveShip(15, 15) // 15 16 17 18 19
    gameboard.moveShip(16, 6) // 6 7 8
    expect(gameboard.rotateShip(16)).toBeFalsy()
    expect(gameboard.ships[16].getTiles()).toEqual([6, 7, 8])
})

test('rotate a ship that will overlap with an existing ship and will also be out of the bottom edge', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 17
    gameboard.addShip(5) // 18
    gameboard.moveShip(17, 83) // 83 84 85 86
    gameboard.moveShip(18, 94) // 94 95 96 97 98
    expect(gameboard.rotateShip(18)).toBeFalsy()
    expect(gameboard.ships[18].getTiles()).toEqual([94, 95, 96, 97, 98])
})

test('rotate a ship that will overlap with an existing ship and will also be out of the right edge', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 19
    gameboard.addShip(5) // 20
    gameboard.ships[19].toggleOrientation()
    gameboard.ships[20].toggleOrientation()
    gameboard.moveShip(19, 38) // 38 48 58 68
    gameboard.moveShip(20, 49) // 49 59 69 79 89
    expect(gameboard.rotateShip(20)).toBeFalsy()
    expect(gameboard.ships[20].getTiles()).toEqual([49, 59, 69, 79, 89]
    )
})

test('receive Attack on watter', () => {
    let gameboard = new Gameboard()
    gameboard.receiveAttack(35)
    gameboard.receiveAttack(48)
    expect(gameboard.receiveAttack(48)).toBeFalsy()
    expect(gameboard.receiveAttack(40)).toBeTruthy()
    expect(gameboard.shootsRecieved.water).toEqual([35, 48, 40])
})

test('receive attack on ship', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 21
    gameboard.moveShip(21, 33)
    expect(gameboard.receiveAttack(35)).toBeTruthy()
    expect(gameboard.ships[21].getHits()).toEqual({33: false, 34: false, 35: true, 36: false})
    gameboard.receiveAttack(33)
    expect(gameboard.ships[21].getHits()).toEqual({33: true, 34: false, 35: true, 36: false})
    expect(gameboard.shootsRecieved.hit).toEqual([35, 33])
})

test('all ships sank', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(4) // 22
    gameboard.moveShip(22, 33) // 33 34 35 36
    gameboard.addShip(2) // 23
    gameboard.moveShip(23, 6) // 6 7
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

test('prevent rotation out of board', () => {
    let gameboard = new Gameboard()
    gameboard.addShip(5) // 24
    expect(() => gameboard.rotateShip(24)).toThrow()
})
