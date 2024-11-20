const chai = require('chai')
const chaiHttp = require('chai-http')
const { servidor } = require('../index')

//https://www.chaijs.com/api/bdd/

chai.use(chaiHttp)

describe('respuesta servidor GET',()=>{
    it('responde al codigo 200',(done)=>{
        chai.request(servidor).get('/autos').end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200)
            done()
        })
    })
})