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

        const userObj = (req as any).user || {};
        const userId = userObj.userId ?? userObj.id;

        if (!userId) {
          return res.status(401).json({ message: 'No autorizado: Usuario no identificado' });
        }
        // CAMBIAR: Asignamos el ID del usuario de forma segura al objeto que se va a guardar.
        req.body.sanitizedInput = req.body.sanitizedInput || {};
        req.body.sanitizedInput.usuario = userId;

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
        const userObj = (req as any).user;
        const userId = userObj.userId ?? userObj.id;

        // 1. Buscamos la categoría que se quiere modificar
        const categoriaToUpdate = await em.findOne(Categoria, { id }, { populate: ['sesiones'] });

        if (!categoriaToUpdate) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // 2. Verificamos que el usuario de la categoría sea el mismo que el del token
        if (categoriaToUpdate.usuario.id !== userId) {
            return res.status(403).json({ message: 'Acción no autorizada: No eres el propietario de esta categoría' });
        }

        // 3. Si la verificación es exitosa, aplicamos los cambios
        em.assign(categoriaToUpdate, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({message: 'Categoría modificada con éxito', data: categoriaToUpdate})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}

async function remove(req: Request, res:Response){
    try {
        const id = Number.parseInt(req.params.id)
        const userObj = (req as any).user;
        const userId = userObj.userId ?? userObj.id;

        // 1. Buscamos la categoría que se quiere eliminar
        const categoriaToRemove = await em.findOne(Categoria, { id }, { populate: ['sesiones'] });

        if (!categoriaToRemove) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // 2. Verificamos la propiedad
        if (categoriaToRemove.usuario.id !== userId) {
            return res.status(403).json({ message: 'Acción no autorizada' });
        }
        
        // 3. Si es el dueño, la eliminamos
        await em.removeAndFlush(categoriaToRemove)
        res.status(200).json({message: 'Categoría eliminada con éxito'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}


/* FUNCIONES ACCESIBLES POR USUARIO */


async function findMyCategorias(req: Request, res: Response) {
  try {
    // Asumimos que tienes un middleware de autenticación que añade el 'user' al request
    // Si no lo tienes, necesitarás implementarlo para que esto funcione de forma segura.
    const userObj = (req as any).user || {};
    const userId = userObj.userId ?? userObj.id;

    if (!userId) {
      return res.status(401).json({ message: 'No autorizado: Usuario no identificado' });
    }

    // Buscamos en la BD todas las categorías donde el 'usuario' coincida con el ID del token
    const categorias = await em.find(Categoria, { usuario: userId });
    
    res.status(200).json({ message: 'Categorías del usuario encontradas', data: categorias });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export {sanitizeSessionTypeInput, findAll, findOne, add, update, remove, findMyCategorias}