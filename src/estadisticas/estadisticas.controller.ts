import { Request, Response } from "express";
import { orm } from "../shared/db/orm.js";
import { Sesion } from "../sesiones/sesiones.entity.js";
import { Tarea } from "../tareas/tarea.entity.js";
import { Usuario } from "../usuarios/usuarios.entity.js";

const em = orm.em.fork();

export async function getStatistics(req: Request, res: Response) {
    try {
        const userId = (req as any).user.userId;
        const periodo = req.query.periodo as string || '1-semana'; // Valor por defecto

        // calcular la fecha de inicio según el filtro
        const fechaFin = new Date();
        const fechaInicio = new Date();

        switch (periodo) {
            case '1-semana': fechaInicio.setDate(fechaFin.getDate() - 7); break;
            case '1-quincena': fechaInicio.setDate(fechaFin.getDate() - 15); break;
            case '1-mes': fechaInicio.setMonth(fechaFin.getMonth() - 1); break;
            case '1-trimestre': fechaInicio.setMonth(fechaFin.getMonth() - 3); break;
            case 'medio-ano': fechaInicio.setMonth(fechaFin.getMonth() - 6); break;
            case '1-ano': fechaInicio.setFullYear(fechaFin.getFullYear() - 1); break;
            default: fechaInicio.setDate(fechaFin.getDate() - 7);
        }

        // obtener todas las sesiones del usuario en el rango de fechas
        const sesiones = await em.find(Sesion, 
            { categoria: { usuario: userId }, fecha_hora_creacion: { $gte: fechaInicio, $lte: fechaFin } },
            { populate: ['categoria'] }
        );

        // obtener las tareas completadas
        // NOTA IMPORTANTE: Para que el filtro de tiempo funcione aquí, tu entidad Tarea necesitaría un campo como 'fecha_completada'.
        // Asumiremos por ahora que no lo tiene y contaremos todas las completadas.
        const tareasCompletadasCount = await em.count(Tarea, { 
            usuario: userId, 
            estado: 'Completada',
            fecha_finalizacion: { $gte: fechaInicio, $lte: fechaFin }
        });

        // calcular las estadísticas en el servidor
        let tiempoTotalFoco = 0;
        const focoPorCategoria: { [key: string]: { nombre: string, color: string, duracion: number } } = {};

        for (const sesion of sesiones) {
            tiempoTotalFoco += sesion.duracion || 0;

            const cat = sesion.categoria!;
            if (!cat?.id) continue;
            
            if (!focoPorCategoria[cat.id]) {
                focoPorCategoria[cat.id] = { nombre: cat.nombre_categoria, color: cat.color, duracion: 0 };
            }
            focoPorCategoria[cat.id].duracion += sesion.duracion || 0;
        }

        // preparar la respuesta
        const estadisticas = {
            tiempoTotalFoco: tiempoTotalFoco,
            tareasCompletadas: tareasCompletadasCount,
            focoPorCategoria: Object.values(focoPorCategoria).sort((a, b) => b.duracion - a.duracion), // ordenar de mayor a menor
        };

        res.status(200).json(estadisticas);

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}