'use strict'
// Require the dev-dependencies
var chai = require('chai'),
    expect = chai.expect,
    assert = chai.assert,
    should = chai.should();
const chaiHttp = require('chai-http')
const app = require('./app')
chai.use(chaiHttp)

describe('/GET', () => {
    it('it should GET all the pizzas', (done) => {
        chai.request(app)
            .get('/pizza')
            .end((err, res) => {
                if (err) {
                    console.error(err)
                }
                res.should.have.status(200)
                res.body.should.be.a('array')
                res.body.length.should.be.eql(4)
                console.log(res.body)
                done()
            })
    })
})

var answer = 43;

// Assertion: topic [answer]: expected 43 to equal 43.
expect(answer, 'topic [answer]').to.equal(43);