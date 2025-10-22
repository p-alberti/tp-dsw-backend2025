import {Request, Response, NextFunction} from "express"
import { Categoria } from "./categoria.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

function sanitizeSessionTypeInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre_categoria : req.body.nombre_categoria,
        descripcion : req.body.descripcion,
        color : req.body.color,
        usuario : req.body.usuario,
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
        const categorias = await em.find(Categoria, {}, {populate: ['sesiones']})
        res.status(200).json({message: 'se han encontrado todas las Categorias', data: categorias})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req:Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const categoria = await em.findOneOrFail(Categoria, {id}, {populate: ['sesiones']})
        res.status(200).json({message:'se ha encontrado la Categoría', data: categoria})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response){
    try {
        const categoria = em.create(Categoria, req.body.sanitizedInput) // esta es una operación sincrónica
        await em.flush() //es un commit a la bd
        res.status(201).json({message: 'Categoría creada', data: categoria })
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const categoria = em.getReference(Categoria, id)
        em.assign(categoria, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'se ha modificado la Categoría'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const categoria = em.getReference(Categoria, id)
        await em.removeAndFlush(categoria) //el remove permite escuchar un evento y no el delete, por eso lo usamos
        res.status(200).send({message: 'se ha eliminado la Categoría'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export {sanitizeSessionTypeInput, findAll, findOne, add, update, remove}