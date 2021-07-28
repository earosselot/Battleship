
class Ship {

    static currentId = -1

    constructor(_length) {
        if (_length <= 0 || 6 <= _length) {
            throw new Error('Ship length must be between 1 and 5')
        }
        this.id = this.setId()
        this.length = _length
        this.hits = 0
        this.sunk = false
        this.horizontal = true
        this.position = -1
    }

    setId() {
        Ship.currentId++
        return Ship.currentId
    }

    getId() {
        return this.id
    }

    hit() {
        this.hits += 1
        return this
    }

    isSunk() {
        if (this.hits === this.length) {
            this.sunk = true
            return this.sunk
        }
        return this.sunk
    }

    setPosition(_position) {
        if (_position < 0 || _position > 99) { throw new Error('position not valid') }
        this.position = _position
        let tiles = this.setTiles()
        this.position = Math.min(...tiles)
        return tiles
    }

    setTiles() {
        let tiles = []
        if (this.horizontal) {
            const row = Math.floor(this.position / 10)
            let i = 0
            let j = 1
            while (i < this.length) {
                if (Math.floor((this.position + i) / 10) === row) {
                    tiles.push(this.position + i)
                } else {
                    tiles.push(this.position - j)
                    j++
                }
                i++
            }
        } else {
            let i = 0
            let j = 1
            while (i < this.length) {
                if (this.position + (i * 10) < 100) {
                    tiles.push(this.position + (i * 10))
                } else {
                    tiles.push(this.position - (j * 10))
                    j++
                }
                i++
            }
        }
        return tiles
    }

    rotate() {
        this.horizontal = !this.horizontal
        return this.setTiles()
    }

    toggleOrientation() {
        this.horizontal = !this.horizontal
    }

}

module.exports = Ship
