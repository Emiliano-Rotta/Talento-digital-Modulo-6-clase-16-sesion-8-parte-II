const chai = require('chai')
const chaiHttp = require('chai-http')
const { servidor } = require('../index')

//https://www.chaijs.com/api/bdd/

chai.use(chaiHttp)

xdescribe('respuesta servidor PUT',()=>{
    it('responde al codigo 200 pasandole información por body',(done)=>{
        chai.request(servidor)
        .put('/autos?id=40ff4f08-9886-4957-bbce-5d8bbe6f9a85')
        .send({
            "auto":"Renault",
            "modelo": "Clio",
            "asientos": "5"
        })
        .end((error, respuesta)=>{
            chai.expect(respuesta).to.have.status(200)
            done()
        })
    })
})