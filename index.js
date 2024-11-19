const http = require('http');
const fs = require('fs/promises');
const { creaAuto } = require('./crea');
const servidor = http.createServer(async (req, res) => {
    const { searchParams, pathname } = new URL(req.url, `http://${req.headers.host}`);
    const params = new URLSearchParams(searchParams);

    if (pathname == '/autos' && req.method == 'GET') {
        try {
            const lecturaArchivo = await fs.readFile('autos.txt')
            res.statusCode = 200
            res.write(lecturaArchivo)
            res.end()

        } catch (error) {
            res.statusCode = 500
            res.write("Ha ocurrido un error al obtener los datos", error)
            res.end()
           
        }

    }

    if (pathname == '/autos' && req.method == 'POST') {
        try {
            let datosAutos;

            req.on('data', (data) => {
                datosAutos = JSON.parse(data)
            })
            req.on('end', async () => {
                console.log(datosAutos)
                await creaAuto(datosAutos)            

                res.statusCode = 200
                res.write("Auto agregado correctamente")
                res.end()
            
            })
        } catch (error) {
            res.statusCode = 500
            res.write("No se ha podido crear el nuevo auto", error)
            res.end()

            
        }

    }
    if (pathname == '/autos' && req.method == 'PUT') {
        const id = params.get('id');
        try {

            const datosArchivo = await fs.readFile('autos.txt');
            const objetoArchivoOriginal = JSON.parse(datosArchivo);

            let datosParaModificar;
            req.on('data', (datos) => {
                datosParaModificar = JSON.parse(datos);
            })
            req.on('end', async () => {
                const autoOriginal = objetoArchivoOriginal[id]
                const autoActualizado = { ...autoOriginal, ...datosParaModificar }
                objetoArchivoOriginal[id] = autoActualizado;

                await fs.writeFile('autos.txt', JSON.stringify(objetoArchivoOriginal, null, 2));
                res.statusCode = 200
                res.write("Los datos han sido modificados exitosamente");
                res.end();
            })

        } catch (error) {
            res.statusCode = 500
            res.write("Hubo un error en la petición para modificar", error)      
            res.end()
        }

    }
    if (pathname == '/autos' && req.method == 'DELETE') {
        try {
            const autosOriginales = await fs.readFile('autos.txt')
            const objetoAutosOriginales = JSON.parse(autosOriginales)
            const id = params.get('id');
            delete objetoAutosOriginales[id]

            await fs.writeFile('autos.txt', JSON.stringify(objetoAutosOriginales, null, 2));
            res.statusCode = 200

            res.write("El auto ha sido eliminado");
            res.end()
        } catch (error) {
            res.statusCode = 500
            res.write("Hubo un error en la petición para eliminar", error)          
            res.end()
        }
    }
})
servidor.listen(3000, function () {
    console.log("Servidor iniciado en puerto 3000");
});

module.exports = { servidor }