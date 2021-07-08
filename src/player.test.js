const Human = require('./humanPlayer')
const Computer = require('./computerPlayer')

test('creating Human Player', () => {
    let human1 = new Human('human1')
    expect(human1).toEqual({
        'name': 'human1',
        'gameboard': {
            'ships': {},
            'tilesWithShips': {},
            'tilesShoted': []
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
    human1.play()
    expect(human2.gameboard.tilesShoted).toEqual([14])
    human1.setNextOutgoingAttack(34)
    human1.play()
    expect(human2.gameboard.tilesShoted).toEqual([14, 34])
})


test('computer-computer attack enemy board', () => {
    let comp1 = new Computer('human1')
    let comp2 = new Computer('human2')
    comp1.setEnemy(comp2)
    comp2.setEnemy(comp1)
    comp1.setNextOutgoingAttack()
    comp1.play()
    expect(comp2.gameboard.tilesShoted.length).toBe(1)
    comp2.setNextOutgoingAttack()
    comp2.play()
    comp2.setNextOutgoingAttack()
    comp2.play()
    expect(comp1.gameboard.tilesShoted.length).toEqual(2)
})

test('computer-human attack enemy board', () => {
    let human1 = new Human('human1')
    let comp1 = new Computer('comp1')
    comp1.setEnemy(human1)
    human1.setEnemy(comp1)
    human1.setNextOutgoingAttack(43)
    human1.play()
    human1.setNextOutgoingAttack(36)
    human1.play()
    human1.setNextOutgoingAttack(8)
    human1.play()
    expect(comp1.gameboard.tilesShoted).toEqual([43, 36,8])
    comp1.setNextOutgoingAttack()
    comp1.play()
    comp1.setNextOutgoingAttack()
    comp1.play()
    expect(human1.gameboard.tilesShoted.length).toBe(2)
})
