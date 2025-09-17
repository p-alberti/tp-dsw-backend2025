import crypto from 'node:crypto'

export class TipoSesion{
    constructor(
        public nombreTipo: string,
        public tiempoFoco: Date,
        public recreoCorto: Date,
        public recreoLargo: Date,
        public id = crypto.randomUUID()
    ){}
}