import { Router } from "express";

import {sanitizeUserInput, findAll, findOne, add, update, remove, getProfile, updateProfile } from "./usuarios.controller.js";
import { verifyToken } from "../auth/auth.middleware.js";

export const usuarioRouter = Router()

// Rutas protegidas (requieren JWT)
usuarioRouter.get("/perfil/me", verifyToken, getProfile);
usuarioRouter.put("/perfil/update", verifyToken, updateProfile);

usuarioRouter.get('/', findAll)
usuarioRouter.get('/:id', findOne)
usuarioRouter.post('/', sanitizeUserInput, add)
usuarioRouter.put('/:id', sanitizeUserInput, update)
//usuarioRouter.patch('/:id', update)
usuarioRouter.delete('/:id', remove)


