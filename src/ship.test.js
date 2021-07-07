const Ship = require('./ship');

test('id 0', () => {
    let ship = new Ship(2)
    expect(ship.id).toBe(0)
})

test('id 2', () => {
    let ship0 = new Ship(2)
    let ship1 = new Ship(3)
    let ship2 = new Ship(1)
    expect(ship2.id).toBe(3)
})

test('Ship Object constructor', () => {
    let shipA = new Ship(3)
    expect(shipA).toEqual({
        'id': 4,
        'length': 3,
        'hits': [0, 0, 0],
        'sunk': false,
        'horizontal': true,
        'position': -1,
        'tiles': []
    })
})

test('Ship creation length too small', () => {
    expect(() => new Ship(0)).toThrow()
})

test('Ship creation length too large', () => {
    expect(() => new Ship(6)).toThrow()
})

test('hit a ship', () => {
    let shipA = new Ship(4)
    shipA.hit(2)
    expect(shipA.hits).toEqual([0, 0, 1, 0])
})

test('ship not sunk', () => {
    let shipNotSunk = new Ship(5)
    shipNotSunk.hit(1).hit(2).hit(4)
    expect(shipNotSunk.isSunk()).toBeFalsy()
})

test('ship sunk', () => {
    let shipSunk = new Ship(3)
    shipSunk.hit(0).hit(1).hit(2)
    expect(shipSunk.isSunk()).toBeTruthy()
})

test('invalid position set 100', () => {
    let ship = new Ship(2)
    expect(() => { ship.setPosition(100) }).toThrow()
})

test('invalid position set -1', () => {
    let ship = new Ship(5)
    expect(() => { ship.setPosition(-1) }).toThrow()
})

test('ship possition assignement', () => {
    let ship = new Ship(3)
    ship.setPosition(4)
    expect(ship.position).toBe(4)
})

test('ship possition assignement 2', () => {
    let ship = new Ship(3)
    ship.setPosition(99)
    expect(ship.position).toBe(99)
})

test('tiles on position assignment horizontal', () => {
    let ship = new Ship(3)
    ship.setPosition(3)
    expect(ship.tiles).toEqual([3, 4, 5])
})

test('tiles on position assignment vertical', () => {
    let ship = new Ship(4)
    ship.rotate()
    ship.setPosition(3)
    expect(ship.tiles).toEqual([3, 13, 23, 33])
})


test('tiles on position assignment horizontal overflow', () => {
    let ship = new Ship(3)
    ship.setPosition(9)
    expect(ship.tiles).toEqual([9, 8, 7])
})