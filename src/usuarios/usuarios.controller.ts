import { Request, Response, NextFunction } from "express"
//import { UsuarioRepositorio } from "./usuarios.repository.js"
import { Usuario } from "./usuarios.entity.js"

//const repository = new UsuarioRepositorio()

function sanitizeUserInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        dni : req.body.dni,
        fechaNac : req.body.fechaNac,
        username : req.body.username,
        contraseña : req.body.contraseña,
        mail : req.body.mail,
    }
    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if (req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request,res: Response){
<<<<<<< HEAD
    res.status(500).json({message: 'Not Implemented'}) 
}

async function findOne(req: Request,res:Response) {
    res.status(500).json({message: 'Not Implemented'})
}
 

async function add(req: Request,res:Response){
    res.status(500).json({message: 'Not Implemented'})
}

async function update(req: Request,res:Response){
    res.status(500).json({message: 'Not Implemented'})
}

async function remove(req: Request,res:Response) {
    res.status(500).json({message: 'Not Implemented'})
=======
    res.status(500).json({message: 'Not implemented'})
}

async function findOne(req: Request,res:Response) {
    res.status(500).json({message: 'Not implemented'})
}


async function add(req: Request,res:Response){
    res.status(500).json({message: 'Not implemented'})
}

async function update(req: Request,res:Response){
    res.status(500).json({message: 'Not implemented'})
}

async function remove(req: Request,res:Response) {
    res.status(500).json({message: 'Not implemented'})
>>>>>>> origin/main
}

export {sanitizeUserInput, findAll, findOne, add, update, remove}