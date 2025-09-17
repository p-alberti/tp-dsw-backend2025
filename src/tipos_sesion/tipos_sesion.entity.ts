
import  {Entity, OneToMany, Property, Cascade, Collection, BaseEntity, PrimaryKey} from '@mikro-orm/core'
import { Sesion } from '../sesiones/sesiones.entity'

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

    @OneToMany(() => Sesion, (sesion) => sesion.usuario, {
    cascade: [Cascade.ALL],
    })
    sesiones = new Collection<Sesion>(this)
}