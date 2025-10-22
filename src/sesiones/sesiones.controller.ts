import {Request, Response, NextFunction} from "express"
//import { SesionRepositorio } from "./sesiones.repository.js"
import { Sesion } from "./sesiones.entity.js"
import { orm } from "../shared/db/orm.js"
import { Categoria } from "../categoria/categoria.entity.js"

const em = orm.em



 function sanitizeSessionInput(req: Request, res:Response, next: NextFunction){
    req.body.sanitizedInput = {
        tiempo_foco : req.body.tiempo_foco,
        fecha_hora_creacion : req.body.fecha_hora_creacion,
        duracion : req.body.duracion,
        categoria : req.body.categoria,
    }
    Object.keys(req.body.sanitizedInput).forEach(key=> {
        if (req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request, res: Response){
    try {
        const sesiones = await em.find(Sesion, {})
        res.status(200).json({message: 'se han encontrado todas las sesiones', data: sesiones})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req:Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const sesion = await em.findOneOrFail(Sesion, {id})
        res.status(200).json({message:'se ha encontrado la sesión', data: sesion})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response){
    try {
        const sesion = em.create(Sesion, req.body.sanitizedInput) // esta es una operación sincrónica
        await em.flush() //es un commit a la bd
        res.status(201).json({message: 'sesión creada', data: sesion })
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}
async function update(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const sesion = em.getReference(Sesion, id)
        em.assign(sesion, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'se ha modificado la sesion'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}


async function remove(req: Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const sesion = em.getReference(Sesion, id)
        await em.removeAndFlush(sesion) //el remove permite escuchar un evento y no el delete, por eso lo usamos
        res.status(200).send({message: 'se ha eliminado la sesión'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export {sanitizeSessionInput, findAll, findOne, add, update, remove}