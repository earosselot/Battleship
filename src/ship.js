
class Ship {

    static currentId = -1

    constructor(_length) {
        if (_length <= 0 || 6 <= _length) {
            throw new Error('Ship length must be between 1 and 5')
        }
        this.id = this.setId()
        this.length = _length
        this.hits = this.makeHitsArray(_length)
        this.sunk = false
        this.horizontal = true
        this.position = -1
        this.tiles = []
    }

    setId() {
        Ship.currentId++
        return Ship.currentId
    }

    makeHitsArray(length) {
        let hitsArray = []
        for (let i = 0; i < length; i++) {
           hitsArray.push(0)
        }
        return hitsArray
    }

    hit(number) {
        this.hits[number] = 1
        return this
    }

    isSunk() {
        if (this.hits.reduce((a, b) => a + b, 0) === this.length) {
            this.sunk = true
            return this.sunk
        }
        return this.sunk
    }

    setPosition(_position) {
        if (_position < 0 || _position > 99) { throw new Error('position not valid') }
        this.position = _position
        this.setTiles()
        return this.position
    }

    setTiles() {
        this.tiles = []
        if (this.horizontal) {
            let i = 0
            while (i < this.length) {
                this.tiles.push(this.position + i)
                i++
            }
        } else {
            let i = 0
            while (i < this.length) {
                this.tiles.push(this.position + (i * 10))
                i++
            }
        }
        return this.tiles
    }

    getTiles() {
        return this.tiles
    }

    rotate() {
        this.horizontal = !this.horizontal
        this.setTiles()
    }


}

module.exports = Ship
