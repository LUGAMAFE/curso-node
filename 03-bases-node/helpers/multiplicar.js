const fs = require('fs');
var colors = require('colors');

const crearArchivo = async (base, list, to) => {
    try {
        let salida = '';
        let consola = '';
        for (let index = 1; index <= to; index++) {
            consola += `${base} ${"X".magenta} ${index} = ${(index * base).toString().red}`;
            salida += `${base} X ${index} = ${index * base}`;
            if(index != to){
                salida +="\n";
                consola +="\n";
            }
        }
        fs.mkdirSync('./salida', {recursive: true});
        const archivoSalida = `./salida/tabla-${base}.txt`;
        fs.writeFileSync(archivoSalida, salida);
        if(list){
            console.log(colors.green('======================'));
            console.log(colors.green('Tabla del:'), colors.cyan.underline(base));
            console.log(colors.green('======================'));
            console.log(colors.yellow(consola));
        }
        return archivoSalida;
    } catch (error) {
        throw error;
    }
}

module.exports = {crearArchivo};