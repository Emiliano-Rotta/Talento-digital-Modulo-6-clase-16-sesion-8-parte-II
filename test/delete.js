const chai = require('chai')
const chaiHttp = require('chai-http')
const { servidor } = require('../index')

chai.use(chaiHttp)

describe('Prueba DELETE',()=>{
    it('Prueba status',(done)=>{
        chai.request(servidor).delete('/autos?id=26adf8db-762d-4027-9ee1-7b3c6bebf3cc')
        .end((err, resp)=>{
            chai.expect(resp).to.have.status(200)
            done()
        })
    })
})