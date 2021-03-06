const Human = require('./humanPlayer')
const Computer = require('./computerPlayer')

test('creating Human Player', () => {
    let human1 = new Human('human1')
    expect(human1).toEqual({
        'name': 'human1',
        'gameboard': {
            'ships': {},
            "tilesShooted": {
                "hit": [],
                "water": []
            },
        },
        'nextOutgoingAttack': null,
        'enemy': null
    })
})

test('human-human attack enemy board', () => {
    let human1 = new Human('human1')
    let human2 = new Human('human2')
    human1.setEnemy(human2)
    human1.setNextOutgoingAttack(14)
    human1.attack()
    expect(human2.gameboard.shootsRecieved.water).toEqual([14])
    human1.setNextOutgoingAttack(34)
    human1.attack()
    expect(human2.gameboard.shootsRecieved.water).toEqual([14, 34])
})

test('computer-computer attack enemy board', () => {
    let comp1 = new Computer('human1')
    let comp2 = new Computer('human2')
    comp1.setEnemy(comp2)
    comp2.setEnemy(comp1)
    comp1.setNextOutgoingAttack()
    comp1.attack()
    expect(comp2.gameboard.shootsRecieved.water.length).toBe(1)
    comp2.setNextOutgoingAttack()
    comp2.attack()
    comp2.setNextOutgoingAttack()
    comp2.attack()
    expect(comp1.gameboard.shootsRecieved.water.length).toEqual(2)
})

test('computer-human attack enemy board', () => {
    let human1 = new Human('human1')
    let comp1 = new Computer('comp1')
    comp1.setEnemy(human1)
    human1.setEnemy(comp1)
    human1.setNextOutgoingAttack(43)
    human1.attack()
    human1.setNextOutgoingAttack(36)
    human1.attack()
    human1.setNextOutgoingAttack(8)
    human1.attack()
    expect(comp1.gameboard.shootsRecieved.water).toEqual([43, 36,8])
    comp1.setNextOutgoingAttack()
    comp1.attack()
    comp1.setNextOutgoingAttack()
    comp1.attack()
    expect(human1.gameboard.shootsRecieved.water.length).toBe(2)
    expect(typeof (human1.gameboard.shootsRecieved.water[0])).toMatch('number')
    expect(typeof (human1.gameboard.shootsRecieved.water[1])).toMatch('number')
})

test('create all ships', () => {
    let human1 = new Human('human1')
    human1.createShips()
    expect(Object.keys(human1.gameboard.ships).length).toBe(10)
})

test('create all ships: only 1 ship of length 5', () => {
    let human1 = new Human('human1')
    human1.createShips()
    let countShipsLenght5 = 0
    for (ship of Object.values(human1.gameboard.ships)) {
        if (ship.length === 5) {
            countShipsLenght5 += 1
        }
    }
    expect(countShipsLenght5).toBe(1)
})

test('create all ships: 3 ship of length 3', () => {
    let human1 = new Human('human1')
    human1.createShips()
    let countShipsLenght3 = 0
    for (let ship of Object.values(human1.gameboard.ships)) {
        if (ship.length === 3) {
            countShipsLenght3 += 1
        }
    }
    expect(countShipsLenght3).toBe(3)
})

test('computer place all ships randomly', () => {
    let comp1 = new Computer('comp1')
    comp1.createShips()
    comp1.placeShips()
    for (let ship of Object.values(comp1.gameboard.ships)) {
        expect(ship.getTiles().length).toBeGreaterThanOrEqual(2)
    }
})
