let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../../app")

chai.should()
chai.use(chaiHttp)

describe("POST /api/calculator/calculate", () => {
  it("It should correct calculate 2 numbers", (done) => {
    chai.request(server)
      .post("/api/calculator/calculate")
      .send({ "num": "5+2" })
      .end((err, response) => {
        response.should.have.status(200)
        response.body.should.be.a('string')
        response.body.should.be.eq('7')
        done()
      })
  })
})
