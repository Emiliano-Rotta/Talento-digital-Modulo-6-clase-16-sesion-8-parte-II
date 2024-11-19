const fs = require('fs/promises')
const { v4: uuidv4 } = require('uuid')


const creaAuto = async (nuevoAuto) => {

    try {
        const archivoOriginal = await fs.readFile('autos.txt');
        const datosOriginales = JSON.parse(archivoOriginal);
        const id = uuidv4()

        datosOriginales[id] = nuevoAuto
        await fs.writeFile('autos.txt', JSON.stringify(datosOriginales, null, 2))
      
    }catch(error) {
       console.log("No se pudo crear el nuevo auto crea js",error)

    }
}

module.exports = { creaAuto: creaAuto }