import crypto from 'node:crypto'
import { TipoSesion } from '../tipos_sesion/tipos_sesion.entity.js';
import { Usuario } from '../usuarios/usuarios.entity.js';

export class Sesion{
    constructor(
        public descripcion: string,
        public fecha : Date,
        public tipo : TipoSesion,
        public usuario: Usuario,
        public id = crypto.randomUUID()
    ){}
}