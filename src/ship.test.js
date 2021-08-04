const Ship = require('./ship');

test('id 0', () => {
    let ship = new Ship(2)
    expect(ship.getId()).toBe(0)
})

test('id 2', () => {
    let ship0 = new Ship(2)
    let ship1 = new Ship(3)
    let ship2 = new Ship(1)
    expect(ship2.getId()).toBe(3)
})

test('Ship Object constructor', () => {
    let shipA = new Ship(3)
    expect(shipA).toEqual({
        'id': 4,
        'length': 3,
        'horizontal': true,
        'tiles': [],
        'hits': {}
    })
})

test('Ship creation length too small', () => {
    expect(() => new Ship(0)).toThrow()
})

test('Ship creation length too large', () => {
    expect(() => new Ship(6)).toThrow()
})

test('invalid position set 100', () => {
    let ship = new Ship(2)
    expect(() => { ship.setTiles(100) }).toThrow()
})

test('invalid position set -1', () => {
    let ship = new Ship(5)
    expect(() => { ship.setTiles(-1) }).toThrow()
})

test('ship possition assignement', () => {
    let ship = new Ship(3)
    ship.setTiles(4)
    expect(ship.getTiles()).toEqual([4, 5, 6])
    expect(ship.getHits()).toEqual({4: false, 5: false, 6: false})
})

test('ship possition assignement 2', () => {
    let ship = new Ship(3)
    ship.setTiles(99)
    expect(ship.getTiles()).toEqual([97, 98, 99])
    expect(ship.getHits()).toEqual({97: false, 98: false, 99: false})
})

test('tiles on position assignment horizontal', () => {
    let ship = new Ship(3)
    ship.setTiles(3)
    expect(ship.getTiles()).toEqual([3, 4, 5])
    expect(ship.getHits()).toEqual({3: false, 4:false, 5:false})
})

test('tiles on position assignment vertical', () => {
    let ship = new Ship(4)
    expect(ship.isHorizontal()).toBe(true)
    ship.toggleOrientation()
    expect(ship.isHorizontal()).toBe(false)
    ship.setTiles(3)
    expect(ship.getTiles()).toEqual([3, 13, 23, 33])
    expect(ship.getHits()).toEqual({3: false, 13: false, 23: false, 33: false})
    ship.toggleOrientation()
})

test('tiles on position assignment horizontal overflow', () => {
    let ship = new Ship(3)
    ship.setTiles(9)
    expect(ship.getTiles()).toEqual([7, 8, 9])
})

test('tiles on position assignment horizontal overflow', () => {
    let ship = new Ship(5)
    ship.setTiles(38)
    expect(ship.getTiles()).toEqual([35, 36, 37, 38, 39])
})

test('tiles on position assignment vertical overflow', () => {
    let ship = new Ship(4)
    ship.toggleOrientation()
    ship.setTiles(82)
    expect(ship.getTiles()).toEqual([62, 72, 82, 92])
})

test('rotate already placed ship', () => {
    let ship = new Ship(4)
    ship.setTiles(82)
    expect(ship.getTiles()).toEqual([82, 83, 84, 85])
    expect(ship.getHits()).toEqual({82: false, 83: false, 84: false, 85: false})
    ship.toggleOrientation()
    ship.setTiles(82)
    expect(ship.getTiles()).toEqual([62, 72, 82, 92])
    expect(ship.getHits()).toEqual({62: false, 72: false, 82: false, 92: false})
})

test('ship not sunk horizontal', () => {
    let shipNotSunk = new Ship(5)
    shipNotSunk.setTiles(35) // 35 36 37 38 39
    shipNotSunk.hit(35)
    expect(shipNotSunk.getHits()).toEqual({35: true, 36: false, 37: false, 38: false, 39: false})
    shipNotSunk.hit(38)
    shipNotSunk.hit(45)
    expect(shipNotSunk.getHits()).toEqual({35: true, 36: false, 37: false, 38: true, 39: false})
    expect(shipNotSunk.isSunk()).toBeFalsy()
})

test('ship not sunk vertical', () => {
    let shipNotSunk2 = new Ship(3)
    shipNotSunk2.toggleOrientation()
    shipNotSunk2.setTiles(15) // 15 25 35
    shipNotSunk2.hit(15)
    expect(shipNotSunk2.isSunk()).toBeFalsy()
    expect(shipNotSunk2.getHits()).toEqual({15: true, 25: false, 35: false})
})

test('ship sunk', () => {
    let shipSunk = new Ship(3)
    shipSunk.setTiles(49)
    shipSunk.hit(49)
    shipSunk.hit(48)
    shipSunk.hit(47)
    expect(shipSunk.getHits()).toEqual({47: true, 48: true, 49: true})
    expect(shipSunk.isSunk()).toBeTruthy()
})

test('ship set Tiles with array', () => {
    let ship = new Ship(5)
    ship.setTiles([4,5,6,7,8])
    expect(ship.getTiles()).toEqual([4,5,6,7,8])
})

test('ship set Tiles invalid', () => {
    let ship = new Ship(4)
    ship.setTiles(4)
    expect(() => ship.setTiles([6,7,8])).toThrow()
})

test('not placed ship isnt sunk', () => {
    let shipSunk = new Ship(3)
    expect(shipSunk.isSunk()).toBeFalsy()
})