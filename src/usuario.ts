import crypto from 'node:crypto'

export class Usuario{
  constructor(
    public nombre:string, 
    public apellido:string, 
    public dni:number, 
    public fechaNac: Date,
    public username: string, 
    public contraseña:string, 
    public mail:string,
    public sesiones?: [],
    public id = crypto.randomUUID()
  ){}

}
