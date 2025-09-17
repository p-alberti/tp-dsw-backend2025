import {Request, Response, NextFunction} from "express"
import { TipoSesionRepositorio } from "./tipos_sesion.repository.js"
import { TipoSesion } from "./tipos_sesion.entity.js"

const repository = new TipoSesionRepositorio()

function sanitizeSessionTypeInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombreTipo : req.body.typeName,
        tiempoFoco : req.body.focusTime,
        recreoCorto : req.body.shortBreak,
        recreoLargo : req.body.longBreak
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

function findAll(req: Request, res: Response){
    res.json({data: repository.findAll()})
}

function findOne(req:Request, res:Response){
    const id = req.params.id
    const sessionType = repository.findOne({id})
    if(!sessionType) {
        return res.status(404).send({message: 'Session Type not found'})
    }
    res.json(sessionType)
}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const sessionTypeInput = new TipoSesion (
        input.nombreTipo, 
        input.tiempoFoco,
        input.recreoCorto,
        input.recreoLargo
    )

    const sessionType = repository.add(sessionTypeInput)
    return res.status(201).send({message: 'Session Type created succesfully', data:sessionType})
}

function update(req: Request, res:Response){
    req.body.sanitizedInput.id = req.params.id
    const sessionType = repository.update(req.body.sanitizedInput)

    if(!sessionType){
        return res.status(404).send({message: 'Session Type not found'})
    }
    return res.status(200).send({message: 'Session Type updated succesfully', data:sessionType})
}

function remove(req: Request, res:Response){
    const id = req.params.id
    const sessionType = repository.delete({id})

    if(!sessionType){
        res.status(404).send({message: 'Session Type not found'})
    }else{
        res.status(200).send({message: 'Session Type removed succesfully'})
    }
}

export {sanitizeSessionTypeInput, findAll, findOne, add, update, remove}