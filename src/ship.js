
class Ship {

    static currentId = -1

    constructor(_length) {
        if (_length <= 0 || 6 <= _length) {
            throw new Error('Ship length must be between 1 and 5')
        }
        this.id = this.setId()
        this.length = _length
        this.horizontal = true
        this.tiles = []
        this.hits = {}
    }

    setId() {
        Ship.currentId++
        return Ship.currentId
    }

    getId() {
        return this.id
    }

    getTiles() {
        return this.tiles
    }

    setTiles(_position) {
        if (Number.isInteger(_position)) {
            if (_position < 0 || _position > 99) {
                throw new Error('position not valid')
            }
            this.tiles = this.chooseTiles(_position)
            this.generateHitsObject(this.tiles)
        } else if (Array.isArray(_position)) {
            if (_position.length === 0 || this.length === _position.length) {
                this.tiles = _position
            } else {
                throw new Error(`The number of tiles you're trying to assign does not match with the ship length`)
            }
        }
    }

    chooseTiles(_position) {
        let tiles = []
        if (this.horizontal) {
            const row = Math.floor(_position / 10)
            let i = 0
            let j = 1
            while (i < this.length) {
                if (Math.floor((_position + i) / 10) === row) {
                    tiles.push(_position + i)
                } else {
                    tiles.push(_position - j)
                    j++
                }
                i++
            }
        } else {
            let i = 0
            let j = 1
            while (i < this.length) {
                if (_position + (i * 10) < 100) {
                    tiles.push(_position + (i * 10))
                } else {
                    tiles.push(_position - (j * 10))
                    j++
                }
                i++
            }
        }
        tiles.sort((a, b) => a-b)
        return tiles
    }

    generateHitsObject(tiles) {
        this.hits = {}
        tiles.forEach(tile => this.hits[tile] = false)
    }

    isHorizontal() {
        return this.horizontal
    }

    toggleOrientation() {
        this.horizontal = !this.horizontal
    }

    hit(coordinate) {
        if (coordinate in this.hits) {
            this.hits[coordinate] = true
            return true
        }
        return false
    }

    getHits() {
        return this.hits
    }

    isSunk() {
        if (this.getTiles().length > 0) {
            for(let hit of Object.values(this.hits)) {
                if (!hit) { return false; }
            }
            return true
        }
        return false
    }

}

module.exports = Ship
