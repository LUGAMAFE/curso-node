import inquirer from "inquirer";
import colors from "colors";

const preguntas = [
  {
    type: "list",
    name: "option",
    message: "¿Qué desea hacer?",
    choices: [
      {
        value: "1",
        name: `${"1.".green} Crear Tarea`,
      },
      {
        value: "2",
        name: `${"2.".green} Listar Tareas`,
      },
      {
        value: "3",
        name: `${"3.".green} Listar Tareas Completadas`,
      },
      {
        value: "4",
        name: `${"4.".green} Listar Tareas Pendientes`,
      },
      {
        value: "5",
        name: `${"5.".green} Completar Tarea(s)`,
      },
      {
        value: "6",
        name: `${"6.".green} Borrar Tarea`,
      },
      {
        value: "0",
        name: `${"0.".green} Salir \n`,
      },
    ],
  },
];

const inquirerMenu = async () => {
  console.clear();
  console.log("=====================".green);
  console.log("Seleccione un opción:".white);
  console.log("=====================\n".green);

  const opt = await inquirer.prompt(preguntas);
  return opt.option;
};

const pausa = async () => {
  const question = [
    {
      type: "input",
      name: "enter",
      message: `Presione ${"enter".green} para continuar`,
    },
  ];
  console.log("\n");
  await inquirer.prompt(question);
};

const leerInput = async (message) => {
  const question = [
    {
      type: "input",
      name: "desc",
      message,
      validate(value) {
        if (value.length === 0) {
          return "Porfavor ingrese un valor";
        }
        return true;
      },
    },
  ];
  const {desc} = await inquirer.prompt(question);
  return desc;
};

const listadoTareasBorrar = async (tareas) => {
  console.clear();
  const newTareas = tareas.map((tarea, i) => {
    const index = ++i;
    return {
      value: tarea.id,
      name: `${index.toString().green + ".".green } ${tarea.desc}`,
    };
  })

  newTareas.unshift({
    value:0,
    name: `${"0.".green } Cancelar`,
  });


  const config = {
    type: "list",
    name: "id",
    message: "¿Qué tarea desea borrar?",
    choices: newTareas
  };
  const opt = await inquirer.prompt(config);
  return opt.id;
};

const mostrarListadoChecklist = async (tareas) => {
  console.clear();
  const newTareas = tareas.map((tarea, i) => {
    const index = ++i;
    return {
      value: tarea.id,
      name: `${index.toString().green + ".".green } ${tarea.desc}`,
      checked: tarea.completadoEn ? true : false
    };
  })

  const config = {
    type: "checkbox",
    name: "ids",
    message: "¿Qué tarea desea completar?",
    
    choices: newTareas
  };
  const {ids} = await inquirer.prompt(config);
  return ids;
};

const confirmar = async (message) => {
  const question = [
    {
      type: "confirm",
      name: "ok",
      message
    }
  ]

  const {ok} = await inquirer.prompt(question);
  return ok;
};

export { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist };
