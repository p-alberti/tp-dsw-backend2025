import { Repository } from "../shared/repository.js";
import { TipoSesion } from "./tipos_sesion.entity.js";

const sessionTypes = [
    new TipoSesion(
        'Pomodoro 1',
        25,
        5,
        20,
        '3301d471-92e6-4fb5-886f-e98c24251f61'
    ),
]

export class TipoSesionRepositorio implements Repository<TipoSesion>{
    
    public findAll(): TipoSesion[] | undefined{
        return sessionTypes
    } 

    public findOne(item: {id:String}): TipoSesion | undefined {
        return sessionTypes.find((sessionType)=> sessionType.id === item.id)
    }

    public add(item: TipoSesion): TipoSesion | undefined{
        sessionTypes.push(item)
        return item
    }

    public update(item: TipoSesion): TipoSesion | undefined {
        const sessionTypeIdx = sessionTypes.findIndex(sessionType => sessionType.id === item.id)

        if (sessionTypeIdx !== -1){
            sessionTypes[sessionTypeIdx] = {...sessionTypes[sessionTypeIdx], ...item}
        }
        return sessionTypes[sessionTypeIdx]
    }

    public delete(item: {id: String}): TipoSesion | undefined {
        const sessionTypeIdx = sessionTypes.findIndex(sessionType => sessionType.id === item.id)

        if(sessionTypeIdx !== -1){
            const deletedSessionsTypes = sessionTypes[sessionTypeIdx]
            sessionTypes.splice(sessionTypeIdx,1)
            return deletedSessionsTypes
        }
    }
}