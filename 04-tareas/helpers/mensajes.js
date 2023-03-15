import colors from 'colors';
import readline from 'readline';

const mostrarMenu = () => {
    return new Promise(resolve => {
        console.clear();
        console.log(('=====================').green);
        console.log(('Seleccione un opción:').green);
        console.log(('=====================\n').green);
    
        console.log(`${'1.'.green} Crear Tarea`);
        console.log(`${'2.'.green} Listar Tareas`);
        console.log(`${'3.'.green} Listar Tareas Completadas`);
        console.log(`${'4.'.green} Listar Tareas Pendientes`);
        console.log(`${'5.'.green} Completar Tarea(s)`);
        console.log(`${'6.'.green} Borrar Tarea`);
        console.log(`${'0.'.green} Salir \n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline.question('Seleccione un opción: ', (opt) => {
            readline.close();
            resolve(opt);
        });
    })
}

const pausa = () => {
    return new Promise(resolve => {
        const readline2 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readline2.question(`\nPresione ${'ENTER'.green} para continuar\n `, (opt) => {
            readline2.close();
            resolve()
        });
    });
}

export {
    mostrarMenu,
    pausa
}