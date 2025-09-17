import crypto from 'node:crypto'

export class TipoSesion{
    constructor(
        public nombreTipo: string,
        public tiempoFoco: number,
        public recreoCorto: number,
        public recreoLargo: number,
        public id = crypto.randomUUID()
    ){}
}