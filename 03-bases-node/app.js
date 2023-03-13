const {crearArchivo} = require('./helpers/multiplicar');
const argv = require('./config/yargs');

console.clear();

// [,,arg3 = 1] = process.argv;

// console.log(arg3.split("=")[1]);
crearArchivo(argv.base, argv.list, argv.to).then(nombreArchivo => {
    //console.log(nombreArchivo, " creado")
});
// for (let base = 1; base <= 10; base++) {
//     crearArchivo(base).then(nombreArchivo => {
//         //console.log(nombreArchivo, " creado")
//     });
// }

