import {Request, Response, NextFunction} from "express"
import { Tarea } from "./tarea.entity.js"
import { orm } from "../shared/db/orm.js"

const em = orm.em

function sanitizeTareaInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        descripcion : req.body.descripcion,
        usuario : req.body.usuario,
        /*estados : req.body.estados,*/
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
        const tareas = await em.find(Tarea, {}/*, {populate: ['estados']}*/)
        res.status(200).json({message: 'se han encontrado todas las Tareas', data: tareas})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}



async function findOne(req:Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const tarea = await em.findOneOrFail(Tarea, {id}/*, {populate: ['estados']}*/)
        res.status(200).json({message:'se ha encontrado la Tarea', data: tarea})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request, res: Response){
    try {

        const userObj = (req as any).user || {};
        const userId = userObj.userId ?? userObj.id;

        if (!userId) {
          return res.status(401).json({ message: 'No autorizado: Usuario no identificado' });
        }
        // CAMBIAR: Asignamos el ID del usuario de forma segura al objeto que se va a guardar.
        req.body.sanitizedInput = req.body.sanitizedInput || {};
        req.body.sanitizedInput.usuario = userId;

        const tarea = em.create(Tarea, req.body.sanitizedInput) // esta es una operación sincrónica
        await em.flush() //es un commit a la bd
        res.status(201).json({message: 'Tarea creada', data: tarea })
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request, res:Response){
    try{
        const id = Number.parseInt(req.params.id)
        const userObj = (req as any).user;
        const userId = userObj.userId ?? userObj.id;

        // 1. Buscamos la tarea que se quiere modificar
        const tareaToUpdate = await em.findOne(Tarea, { id }/*, { populate: ['estados'] }*/);

        if (!tareaToUpdate) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // 2. Verificamos que el usuario de la tarea sea el mismo que el del token
        if (tareaToUpdate.usuario.id !== userId) {
            return res.status(403).json({ message: 'Acción no autorizada: No eres el propietario de esta tarea' });
        }

        // 3. Si la verificación es exitosa, aplicamos los cambios
        em.assign(tareaToUpdate, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'Categoría modificada con éxito', data: tareaToUpdate})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const userObj = (req as any).user;
        const userId = userObj.userId ?? userObj.id;

        // 1. Buscamos la tarea que se quiere eliminar
        const tareaToRemove = await em.findOne(Tarea, { id }/*, { populate: ['estados'] }*/);

        if (!tareaToRemove) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }

        // 2. Verificamos la propiedad
        if (tareaToRemove.usuario.id !== userId) {
            return res.status(403).json({ message: 'Acción no autorizada' });
        }
        
        // 3. Si es el dueño, la eliminamos
        await em.removeAndFlush(tareaToRemove)
        res.status(200).json({message: 'Tarea eliminada con éxito'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

export {sanitizeTareaInput, findAll, findOne, add, update, remove}