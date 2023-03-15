import fs from "fs";
import { stringify } from "querystring";

const archivo = './db/data.json';

const guardarDB = (data) => {
    fs.writeFileSync(archivo, data)
};

const leerDB = (path) => {
    if(!fs.existsSync(archivo)){
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'});
    const data = JSON.parse(info);
    return data;
};

export { guardarDB, leerDB }