import { Request, Response, NextFunction } from "express"
import { verifyToken } from "../auth/auth.middleware.js"; // lo usaremos en routes
import bcrypt from 'bcryptjs';
import { orm } from "../shared/db/orm.js"
import { Usuario } from "./usuarios.entity.js"


function sanitizeUserInput(req: Request, res: Response, next: NextFunction){

    req.body.sanitizedInput = {
        nombre : req.body.nombre,
        apellido : req.body.apellido,
        fechaNac : req.body.fechaNac,
        username : req.body.username,
        contraseña : req.body.contraseña,
        mail : req.body.mail,
        categorias : req.body.categorias,
    }
    Object.keys(req.body.sanitizedInput).forEach(key =>{
        if (req.body.sanitizedInput[key]===undefined){
            delete req.body.sanitizedInput[key]
        }
    })
    next()
}

async function findAll(req: Request,res: Response){
    try {
        const em = orm.em.fork()
        const usuarios = await em.find(Usuario, {}, {populate: ['categorias']})
        res.status(200).json({message: 'se han encontrado todos los usuarios', data: usuarios})
    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function findOne(req: Request,res:Response) {
    try {
        const em = orm.em.fork()
        const id = Number.parseInt(req.params.id)
        const usuario = await em.findOneOrFail(Usuario, {id}, {populate: ['categorias']})
        res.status(200).json({message:'se ha encontrado el usuario', data: usuario})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function add(req: Request,res:Response){
    try {
        const em = orm.em.fork()
        const {nombre, apellido, fechaNac, username, contraseña, mail, categorias} = req.body.sanitizedInput
        //verificamos que haya contraseña
        if (!contraseña){
            return res.status(400).json({message: 'la contraseña es obligatoria'})
        }

        //hasheo de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(contraseña, salt);

        const usuario = em.create(Usuario, {nombre, apellido, fechaNac, username, mail, categorias, contraseña: hashedPassword}) // esta es una operación sincrónica
        await em.flush() //es un commit a la bd
        res.status(201).json({message: 'usuario creado', data: usuario })

    } catch (error: any){
        res.status(500).json({message: error.message})
    }
}

async function update(req: Request,res:Response){
    try{
        const em = orm.em.fork()
        const id = Number.parseInt(req.params.id)
        const usuario = em.getReference(Usuario, id)
        em.assign(usuario, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'se ha modificado el usuario'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request,res:Response) {
    try {
        const em = orm.em.fork()
        const id = Number.parseInt(req.params.id)
        const usuario = em.getReference(Usuario, id)
        await em.removeAndFlush(usuario) //el remove permite escuchar un evento y no el delete, por eso lo usamos
        res.status(200).send({message: 'se ha eliminado el usuario'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

/* FUNCIONES ACCESIBLES SOLO POR EL USUARIO */

async function getProfile(req: Request, res: Response) {
  try {
    const em = orm.em.fork()
    const userId = (req as any).user.userId; // viene del token
    const usuario = await em.findOne(Usuario, { id: userId }, { populate: ["categorias"] });


    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    console.log("datos usuario desde back getprofile", usuario)
    res.status(200).json(usuario);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function updateProfile(req: Request, res: Response) {
  try {
    const em = orm.em.fork()
    const userId = (req as any).user.userId;
    const usuario = await em.findOneOrFail(Usuario, { id: userId });

    //validamos que la contraseña que venga no este ya hasheada
    let updatedData = req.body;
    if (updatedData.contraseña && !updatedData.contraseña.startsWith('$2b$')) {
      const salt = await bcrypt.genSalt(10);
      updatedData.contraseña = await bcrypt.hash(updatedData.contraseña, salt);
    }

    em.assign(usuario, updatedData);
    await em.flush();

    res.status(200).json({ message: "Perfil actualizado con éxito" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export {sanitizeUserInput, findAll, findOne, add, update, remove, getProfile, updateProfile}