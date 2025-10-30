import { Router } from "express";
import { verifyToken } from "../auth/auth.middleware.js";
import { sanitizeTareaInput, findAll, findOne, add, update, remove} from "./tarea.controller.js"

export const tareaRouter = Router()

tareaRouter.get('/', findAll)
tareaRouter.get('/:id', findOne)
tareaRouter.post('/', verifyToken, sanitizeTareaInput, add)
tareaRouter.put('/:id', verifyToken, sanitizeTareaInput, update)
tareaRouter.delete('/:id', verifyToken, remove)
