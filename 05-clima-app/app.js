// const { inquirerMenu } = require("./helpers/inquirer");
import colors from 'colors';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {
  inquirerMenu,
  leerInput,
  listarLugares,
  pausa,
} from './helpers/inquirer.js';
import { Busquedas } from './models/busquedas.js';
colors.enable();
dotenv.config();
console.clear();

const main = async () => {
  let opt = '';
  const busquedas = new Busquedas();
  do {
    // opt = await mostrarMenu();
    opt = await inquirerMenu();
    switch (opt) {
      case 1:
        const lugar = await leerInput('Descripción: ');
        const lugares = await busquedas.ciudad(lugar);
        const id = await listarLugares(lugares);
        if (id == '0') continue;
        const lugarSel = lugares.find((l) => l.id == id);
        busquedas.agregarHistorial(lugarSel.nombre);
        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        console.clear();
        console.log(`\nInformación de la ciudad: ${lugar}\n`.green);
        console.log(
          `Ciudad: ${lugarSel.nombre}
Latitud: ${lugarSel.lat}
Longitud: ${lugarSel.lng}
Desc: ${clima.desc}
Temperatura: ${clima.temp}
Minima: ${clima.min}
Maxima: ${clima.max}`,
        );
        break;
      case 2:
        busquedas.historial.forEach((lugar, i) => {
          const idx = `${i + 1}`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;
      default:
        break;
    }

    if (opt != '0') await pausa();
  } while (opt != '0');
};

main();
