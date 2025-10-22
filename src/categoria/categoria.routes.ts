import { Router } from "express";

import { sanitizeSessionTypeInput, findAll, findOne, add, update, remove} from "./categoria.controller.js";

export const categoriaRouter = Router()

categoriaRouter.get('/', findAll)
categoriaRouter.get('/:id', findOne)
categoriaRouter.post('/', sanitizeSessionTypeInput, add)
categoriaRouter.put('/:id', sanitizeSessionTypeInput, update)
//categoriaRouter.patch('/:id', update)
categoriaRouter.delete('/:id', remove)