const chai = require('chai')
const chaiHttp = require('chai-http')
const { servidor } = require('../index')

//https://www.chaijs.com/api/bdd/

chai.use(chaiHttp)

describe('respuesta servidor POST',()=>{
    it('responde al codigo 200 pasandole información por body',(done)=>{
        chai.request(servidor)
        .post('/autos')
        .send({
            "auto":"porsche",
            "modelo": "prueba",
            "asientos": "2"
        })
        .end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200)
            done()
        })
    })
})