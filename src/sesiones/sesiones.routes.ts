import { Router } from "express";

import { sanitizeSessionInput, findAll, findOne, add, update, remove } from "./sesiones.controller.js";

export const sesionRouter = Router()

sesionRouter.get('/', findAll)
sesionRouter.get('/:id', findOne)
sesionRouter.post('/', sanitizeSessionInput, add)
sesionRouter.put('/:id', sanitizeSessionInput, update)
//sesionRouter.patch('/:id', update)
sesionRouter.delete('/:id', remove)