import { Router } from "express";
import { verifyToken } from "../auth/auth.middleware.js";
import { sanitizeSessionTypeInput, findAll, findOne, add, update, remove, findMyCategorias} from "./categoria.controller.js";

export const categoriaRouter = Router()

categoriaRouter.get('/mis-categorias', verifyToken, findMyCategorias);

categoriaRouter.get('/', findAll)
categoriaRouter.get('/:id', findOne)
categoriaRouter.post('/', verifyToken, sanitizeSessionTypeInput, add)
categoriaRouter.put('/:id', verifyToken, sanitizeSessionTypeInput, update)
categoriaRouter.delete('/:id', verifyToken, remove)


