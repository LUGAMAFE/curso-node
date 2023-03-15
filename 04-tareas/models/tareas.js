import { Tarea } from './tarea.js';

export class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach(element => {
        listado.push(this._listado[element]);
    });
    return listado;
  }

  constructor(desc) {
    this._listado = {};
  }

  cargarTareasFromArray(tareas = []){
    tareas.forEach(tarea => {
        this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = ''){
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listadoCompleto = () => {
    console.log("");
    this.listadoArr.forEach((tarea, index) => {
        const idx = `${index + 1}`.toString().green;
        const {desc ,completadoEn} = tarea;
        const estado = completadoEn != null ? "Completada".green : "Pendiente".red;
        console.log(`${idx} ${desc} ${'::'.cyan} ${estado}`);
    });
  }

  listarPendientesCompletadas(completadas = true){
    let index = 1;
    console.log("");
    this.listadoArr.forEach((tarea) => {
        const idx = `${index}`.toString().green;
        const {desc ,completadoEn} = tarea;
        const estado = completadoEn != null ? "Completada".green : "Pendiente".red;

        if(completadas && tarea.completadoEn != null || !completadas && tarea.completadoEn == null ){
            console.log(`${idx} ${desc} ${'::'.cyan} ${estado}`);
            index++;
        }
    });
  }

  borrarTarea(id) {
    if(this._listado[id]){
        delete this._listado[id];
        return true;
    }
    return false;
  };

  toggleCompletadas(ids = []){
    this.listadoArr.forEach(item => {
        const tarea = this._listado[item.id];
        if(ids.includes(tarea.id)){
            if(tarea.completadoEn == null){
                tarea.completadoEn = new Date().toISOString();
            }
        }else{
            tarea.completadoEn = null;
        }
    });
  }
}
