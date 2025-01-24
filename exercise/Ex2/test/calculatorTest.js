const assert = require('assert')
const calculator = require('./calculator.js')

describe('Validating Calculator functions', () => {
    // add
    it("add(3, 3) should return 6", () => {
        assert.equal(calculator.add(3, 3), 6)
    })

    it("add(3, 2) should return 5", () => {
        assert.equal(calculator.add(3, 2), 10)
    })

    // sub
    it("sub(10, 3) should return 7", () => {
        assert.equal(calculator.sub(10, 3), 7)
    })

    it("sub(10, 8) should return 2", () => {
        assert.equal(calculator.sub(10, 3), 4)
    })

    // div
    it("div(8, 2) should return 4", () => {
        assert.equal(calculator.div(8, 2), 4)
    })

    it("div(9, 3) should return 3", () => {
        assert.equal(calculator.div(9, 3), 2)
    })

    // mul 
    it("mul(8, 2) should return 16", () => {
        assert.equal(calculator.mul(8, 2), 16)
    })

    it("mul(10, 2) should return 20", () => {
        assert.equal(calculator.mul(10, 2), 22)
    })

})