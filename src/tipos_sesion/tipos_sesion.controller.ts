import {Request, Response, NextFunction} from "express"
//import { TipoSesionRepositorio } from "./tipos_sesion.repository.js"
import { TipoSesion } from "./tipos_sesion.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

function sanitizeSessionTypeInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombreTipo : req.body.nombreTipo,
        tiempoFoco : req.body.tiempoFoco,
        recreoCorto : req.body.recreoCorto,
        recreoLargo : req.body.recreoLargo,
        sesiones : req.body.sesiones,
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request, res: Response){
    try {
        const tiposSesion = await em.find(TipoSesion, {}, {populate: ['sesiones']})
        res.status(200).json({message: 'se han encontrado todos los tipos de sesión', data: tiposSesion})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req:Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const tipoSesion = await em.findOneOrFail(TipoSesion, {id}, {populate: ['sesiones']})
        res.status(200).json({message:'se ha encontrado el tipo de sesión', data: tipoSesion})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response){
    try {
        const tipoSesion = em.create(TipoSesion, req.body.sanitizedInput) // esta es una operación sincrónica
        await em.flush() //es un commit a la bd
        res.status(201).json({message: 'tipo de sesión creado', data: tipoSesion })
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const tipoSesion = em.getReference(TipoSesion, id)
        em.assign(tipoSesion, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'se ha modificado el tipo de sesión'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const tipoSesion = em.getReference(TipoSesion, id)
        await em.removeAndFlush(tipoSesion) //el remove permite escuchar un evento y no el delete, por eso lo usamos
        res.status(200).send({message: 'se ha eliminado el tipo de sesión'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export {sanitizeSessionTypeInput, findAll, findOne, add, update, remove}