// mocha and chai test cased to validate 
// arithmetic functions percentage and square

const assert = require('assert')
const Arithmetic = require('./arithmetic.js')

describe('Validating Arithmetic functions', () => {
    it("square(3) should return 9", () => {
        assert.equal(Arithmetic.square(3), 9)
    })

    it("square(12) should return 144", () => {
        assert.equal(Arithmetic.square(12), 144)
    })

    it("square(4) should not return 8", () => {
        assert.notEqual(Arithmetic.square(4), 8)
    })

    it("square(2) should return 4", () => {
        assert.equal(Arithmetic.square(2), 4)
    })


    it("percentage(20, 50) should return 40", () => {
        assert.equal(Arithmetic.percentage(20, 50), 40)
    })
})