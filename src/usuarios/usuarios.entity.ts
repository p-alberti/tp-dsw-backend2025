import { BaseEntity, Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { Sesion } from '../sesiones/sesiones.entity.js'

@Entity()
export class Usuario extends BaseEntity{
    @Property({nullable: false})
    nombre!: string

    @Property({nullable: false})
    apellido!: string

    @Property({unique:true})
    dni?:number

    @Property({nullable: false})
    fechaNac!: Date

    @Property({nullable: false, unique:true})
    username!: string

    @Property({nullable: false})
    contraseña!: string

    @Property({nullable: false, unique:true})
    mail!: string

    @OneToMany(() => Sesion, (sesion) => sesion.usuario, {
        cascade: [Cascade.ALL],
    })
    sesiones = new Collection<Sesion>(this) 
    //public tasks: task[], el usurio conoce sus tareas, se crearan mas adelante
}