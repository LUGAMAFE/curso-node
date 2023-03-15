// const { inquirerMenu } = require("./helpers/inquirer");
import colors from "colors";
import { guardarDB, leerDB } from "./db/guardarArchivo.js";
import {
  inquirerMenu,
  leerInput,
  pausa,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoChecklist
} from "./helpers/inquirer.js";
import { Tarea } from "./models/tarea.js";
import { Tareas } from "./models/tareas.js";

console.clear();

const main = async () => {
  console.log("Hola mundo");

  let opt = "";
  const tareas = new Tareas();
  const tareasDb = leerDB();

  if (tareasDb) {
    //Establecer tareas
    tareas.cargarTareasFromArray(tareasDb);
  }

  do {
    // opt = await mostrarMenu();
    opt = await inquirerMenu();
    switch (opt) {
      case "1":
        const desc = await leerInput("Descripción: ");
        tareas.crearTarea(desc);
        break;
      case "2":
        tareas.listadoCompleto();
        break;
      case "3":
        tareas.listarPendientesCompletadas();
        break;
      case "4":
        tareas.listarPendientesCompletadas(false);
        break;
      case "5":
        const ids = await mostrarListadoChecklist(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        console.log("Tareas cambiadas correctamente".green);
        break;
      case "6":
        const idBorrar = await listadoTareasBorrar(tareas.listadoArr);
        if (idBorrar != 0) {
          const confirm = await confirmar("Desea borrar la tarea realmente?");
          if (confirm) {
            tareas.borrarTarea(idBorrar);
            console.log("Tarea borrada correctamente".green);
          }
        }
        break;
      default:
        break;
    }

    guardarDB(JSON.stringify(tareas.listadoArr));

    await pausa();
  } while (opt != "0");
};

main();
