import {Request, Response, NextFunction} from "express"
//import { SesionRepositorio } from "./sesiones.repository.js"
import { Sesion } from "./sesiones.entity.js"
import { TipoSesion } from "../tipos_sesion/tipos_sesion.entity.js"

//const repository = new SesionRepositorio()

// function sanitizeSessionInput(req: Request, res:Response, next: NextFunction){

//     req.body.sanitizedInput = {
//         descripcion : req.body.descripcion,
//         fecha : req.body.fecha,
//         tipo : req.body.tipo
//     }
//     Object.keys(req.body.sanitizedInput).forEach(key=> {
//         if (req.body.sanitizedInput[key] === undefined){
//             delete req.body.sanitizedInput[key]
//         }
//     })
//     next()
// }

async function findAll(req: Request, res: Response){
    res.status(500).json({message: 'Not implemented'})
}

async function findOne(req:Request, res:Response){
    res.status(500).json({message: 'Not implemented'})
}

async function add(req: Request, res: Response){
    res.status(500).json({message: 'Not implemented'})
}

async function update(req: Request, res:Response){
    res.status(500).json({message: 'Not implemented'})
}

async function remove(req: Request, res:Response){
    res.status(500).json({message: 'Not implemented'})
}

export {findAll, findOne, add, update, remove}