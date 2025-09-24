import { Request, Response, NextFunction } from "express"
//import { UsuarioRepositorio } from "./usuarios.repository.js"
import { orm } from "../shared/db/orm.js"
import { Usuario } from "./usuarios.entity.js"

const em = orm.em

//const repository = new UsuarioRepositorio()

// function sanitizeUserInput(req: Request, res: Response, next: NextFunction){

//     req.body.sanitizedInput = {
//         nombre : req.body.nombre,
//         apellido : req.body.apellido,
//         dni : req.body.dni,
//         fechaNac : req.body.fechaNac,
//         username : req.body.username,
//         contraseña : req.body.contraseña,
//         mail : req.body.mail,
//     }
//     Object.keys(req.body.sanitizedInput).forEach(key =>{
//         if (req.body.sanitizedInput[key]===undefined){
//             delete req.body.sanitizedInput[key]
//         }
//     })
//     next()
// }

async function findAll(req: Request,res: Response){
    try {
        const usuarios = await em.find(Usuario, {})
        res.status(200).json({message: 'se han encontrado todos los usuarios', data: usuarios})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request,res:Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const usuario = await em.findOneOrFail(Usuario, {id})
        res.status(200).json({message:'se ha encontrado el usuario', data: usuario})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request,res:Response){
    try {
        const usuario = em.create(Usuario, req.body) // esta es una operación sincrónica
        await em.flush() //es un commit a la bd
        res.status(201).json({message: 'usuario creado', data: usuario })
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request,res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const usuario = em.getReference(Usuario, id)
        em.assign(usuario, req.body)
        await em.flush()
        res.status(200).json({message: 'se ha modificado el usuario'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request,res:Response) {
    try {
        const id = Number.parseInt(req.params.id)
        const usuario = em.getReference(Usuario, id)
        await em.removeAndFlush(usuario) //el remove permite escuchar un evento y no el delete, por eso lo usamos
        res.status(200).send({message: 'se ha eliminado el usuario'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export {findAll, findOne, add, update, remove}