import { Router } from "express";
import { verifyToken } from "../auth/auth.middleware.js";
import { getStatistics } from "./estadisticas.controller.js";

export const estadisticasRouter = Router();

// Una única ruta protegida que llama al controlador de estadísticas
estadisticasRouter.get('/', verifyToken, getStatistics);

