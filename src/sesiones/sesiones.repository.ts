import { TipoSesion } from "../tipos_sesion/tipos_sesion.entity.js";
import { Repository } from "../shared/repository.js";
import { Sesion } from "./sesiones.entity.js";

const sessions = [
    new Sesion(
       'sesion de prueba',
       new Date("2024-09-28"),
        new TipoSesion(   
            'Pomodoro 1',
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00'),
            new Date('2024-10-04T${hora}:00')
        ),
       'a02b26bc-3769-4221-beb1-d7a3cfh7dad' 
    ),
]

export class SesionRepositorio implements Repository<Sesion>{
    public findAll(): Sesion[] | undefined{
        return sessions
    } 

    public findOne(item: {id:String}): Sesion | undefined {
        return sessions.find((session)=> session.id === item.id)
    }

    public add(item: Sesion): Sesion | undefined{
        sessions.push(item)
        return item
        //llamar a procedimiento que tambien añada la session al array del usuario
    }

    public update(item: Sesion): Sesion | undefined {
        const sessionIdx = sessions.findIndex(session => session.id === item.id)

        if (sessionIdx !== -1){
            sessions[sessionIdx] = {...sessions[sessionIdx], ...item}
        }
        return sessions[sessionIdx]
    }

    public delete(item: {id: String}): Sesion | undefined {
        const sessionIdx = sessions.findIndex(session => session.id === item.id)

        if(sessionIdx !== -1){
            const deletedSessions = sessions[sessionIdx]
            sessions.splice(sessionIdx,1)
            return deletedSessions
        }
    }
}