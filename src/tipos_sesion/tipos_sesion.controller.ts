import {Request, Response, NextFunction} from "express"
//import { TipoSesionRepositorio } from "./tipos_sesion.repository.js"
import { TipoSesion } from "./tipos_sesion.entity.js"

//const repository = new TipoSesionRepositorio()

// function sanitizeSessionTypeInput(req: Request, res: Response, next: NextFunction){
//     req.body.sanitizedInput = {
//         nombreTipo : req.body.nombreTipo,
//         tiempoFoco : req.body.tiempoFoco,
//         recreoCorto : req.body.recreoCorto,
//         recreoLargo : req.body.recreoLargo
//     }
//     Object.keys(req.body.sanitizedInput).forEach(key => {
//         if(req.body.sanitizedInput[key] === undefined){
//             delete req.body.sanitizedInput[key]
//         }
//     })
//     next()
// }

async function findAll(req: Request, res: Response){
    res.status(500).json({message: 'Not Implemented'})
}

async function findOne(req:Request, res:Response){
    res.status(500).json({message: 'Not Implemented'})
}

async function add(req: Request, res: Response){
    res.status(500).json({message: 'Not Implemented'})
}

async function update(req: Request, res:Response){
    res.status(500).json({message: 'Not Implemented'})
}

async function remove(req: Request, res:Response){
    res.status(500).json({message: 'Not Implemented'})
}

export {findAll, findOne, add, update, remove}