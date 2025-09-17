import { Router } from "express";

import { sanitizeSessionTypeInput, findAll, findOne, add, update, remove} from "./tipos_sesion.controller.js";

export const tipoSesionRouter = Router()

tipoSesionRouter.get('/', findAll)
tipoSesionRouter.get('/:id', findOne)
tipoSesionRouter.post('/', sanitizeSessionTypeInput, add)
tipoSesionRouter.put('/:id', sanitizeSessionTypeInput, update)
tipoSesionRouter.patch('/:id', sanitizeSessionTypeInput, update)
tipoSesionRouter.delete('/:id', remove)