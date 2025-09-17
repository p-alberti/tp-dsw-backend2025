import crypto from 'node:crypto'
import { Sesion } from '../sesiones/sesiones.entity.js'

export class Usuario{
    constructor(
        public nombre: string,
        public apellido: string,
        public dni:number,
        public fechaNac: Date,
        public username: string,
        public contraseña: string,
        public mail: string,
        public sesiones?: Sesion[],
        public id = crypto.randomUUID()
        //public tasks: task[], el usurio conoce sus tareas, se crearan mas adelante
    ){}
}