import { Router } from "express";

import { findAll, findOne, add, update, remove} from "./tipos_sesion.controller.js";

export const tipoSesionRouter = Router()

tipoSesionRouter.get('/', findAll)
tipoSesionRouter.get('/:id', findOne)
tipoSesionRouter.post('/', add)
tipoSesionRouter.put('/:id', update)
//tipoSesionRouter.patch('/:id', update)
tipoSesionRouter.delete('/:id', remove)