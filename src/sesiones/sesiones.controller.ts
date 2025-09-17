import {Request, Response, NextFunction} from "express"
import { SesionRepositorio } from "./sesiones.repository.js"
import { Sesion } from "./sesiones.entity.js"
import { TipoSesion } from "../tipos_sesion/tipos_sesion.entity.js"

const repository = new SesionRepositorio()

function sanitizeSessionInput(req: Request, res:Response, next: NextFunction){

    req.body.sanitizedInput = {
        descripcion : req.body.descripcion,
        fecha : req.body.fecha,
        tipo : req.body.tipo
    }
    Object.keys(req.body.sanitizedInput).forEach(key=> {
        if (req.body.sanitizedInput[key] === undefined){
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
    const session = repository.findOne({id})
    if(!session) {
        return res.status(404).send({message: 'Session not found'})
    }
    res.json(session)
}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput

    const sessionInput = new Sesion (
        input.descripcion, 
        input.fecha,
        new TipoSesion(   
            'Pomodoro 1',
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00')
        ),
    )

    const session = repository.add(sessionInput)
    return res.status(201).send({message: 'Session created succesfully', data:session})

    //agregar funcionalidad para que la session se agregue al array del usuario que la crea
}

function update(req: Request, res:Response){
    req.body.sanitizedInput.id = req.params.id
    const session = repository.update(req.body.sanitizedInput)

    if(!session){
        return res.status(404).send({message: 'Session not found'})
    }
    return res.status(200).send({message: 'Session updated succesfully', data:session})
}

function remove(req: Request, res:Response){
    const id = req.params.id
    const session = repository.delete({id})

    if(!session){
        res.status(404).send({message: 'Session not found'})
    }else{
        res.status(200).send({message: 'Session removed succesfully'})
    }
}

export {sanitizeSessionInput, findAll, findOne, add, update, remove}