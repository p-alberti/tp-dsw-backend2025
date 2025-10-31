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
        //asignamos el id del usuario de forma segura al objeto que se va a guardar.
        req.body.sanitizedInput = req.body.sanitizedInput || {};
        req.body.sanitizedInput.usuario = userId;

        const categoria = em.create(Categoria, req.body.sanitizedInput)
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

        //buscamos la categoría a modificar
        const categoriaToUpdate = await em.findOne(Categoria, { id }, { populate: ['sesiones'] });

        if (!categoriaToUpdate) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        //verificar token del usuario
        if (categoriaToUpdate.usuario.id !== userId) {
            return res.status(403).json({ message: 'Acción no autorizada: No eres el propietario de esta categoría' });
        }

        //aplicamos los cambios
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

        //Buscar categoria a eliminar
        const categoriaToRemove = await em.findOne(Categoria, { id }, { populate: ['sesiones'] });

        if (!categoriaToRemove) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        //verificamos token del usuario
        if (categoriaToRemove.usuario.id !== userId) {
            return res.status(403).json({ message: 'Acción no autorizada' });
        }
        
        //eliminamos
        await em.removeAndFlush(categoriaToRemove)
        res.status(200).json({message: 'Categoría eliminada con éxito'})
    } catch (error: any) {
        res.status(500).json({message: error.message})
    }
}


/* FUNCIONES ACCESIBLES POR USUARIO */


async function findMyCategorias(req: Request, res: Response) {
  try {
    const userObj = (req as any).user || {};
    const userId = userObj.userId ?? userObj.id;

    if (!userId) {
      return res.status(401).json({ message: 'No autorizado: Usuario no identificado' });
    }

    //buscamos categorias con usuario_id del usuario que lo pide
    const categorias = await em.find(Categoria, { usuario: userId });
    
    res.status(200).json({ message: 'Categorías del usuario encontradas', data: categorias });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


export {sanitizeSessionTypeInput, findAll, findOne, add, update, remove, findMyCategorias}