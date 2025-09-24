import { Router } from "express";

import { findAll, findOne, add, update, remove } from "./sesiones.controller.js";

export const sesionRouter = Router()

sesionRouter.get('/', findAll)
sesionRouter.get('/:id', findOne)
sesionRouter.post('/', add)
sesionRouter.put('/:id', update)
//sesionRouter.patch('/:id', update)
sesionRouter.delete('/:id', remove)