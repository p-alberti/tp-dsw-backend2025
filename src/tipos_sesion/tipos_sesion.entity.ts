import  {Entity, OneToMany, Property, Cascade, Collection, PrimaryKey} from '@mikro-orm/core'
import { Sesion } from '../sesiones/sesiones.entity.js'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

@Entity()
export class TipoSesion extends BaseEntity{
    @Property({nullable: false})
    nombreTipo!: string

    @Property({nullable: false})
    tiempoFoco!: number

    @Property({nullable: false})
    recreoCorto!: number

    @Property({nullable: false})
    recreoLargo!: number

    @OneToMany(() => Sesion, (sesion) => sesion.tipo, {
    cascade: [Cascade.ALL],
    })
    sesiones = new Collection<Sesion>(this)
}