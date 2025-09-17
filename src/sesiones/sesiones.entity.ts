import crypto from 'node:crypto'
import { TipoSesion } from '../tipos_sesion/tipos_sesion.entity.js';

export class Sesion{
    constructor(
        public descripcion: string,
        public fecha : Date,
        public tipo : TipoSesion,
        public id = crypto.randomUUID()
    ){}
}