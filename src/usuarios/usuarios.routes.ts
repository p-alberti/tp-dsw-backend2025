import { Router } from "express";

import { sanitizeUserInput, findAll, findOne, add, update, remove } from "./usuarios.controller.js";

export const usuarioRouter = Router()

usuarioRouter.get('/', findAll)
usuarioRouter.get('/:id', findOne)
usuarioRouter.post('/',sanitizeUserInput, add)
usuarioRouter.put('/:id',sanitizeUserInput, update)
usuarioRouter.patch('/:id',sanitizeUserInput, update)
usuarioRouter.delete('/:id', remove)
