import  {Entity, OneToMany, Property, Cascade, Collection, PrimaryKey, OneToOne, ManyToOne, Rel} from '@mikro-orm/core'
import { Sesion } from '../sesiones/sesiones.entity.js'
import { Usuario } from '../usuarios/usuarios.entity.js'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

@Entity()
export class Categoria extends BaseEntity{
    @Property({nullable: false})
    nombre_categoria!: string

    @Property({nullable: true})
    descripcion!: string

    @Property({nullable: true})
    color!: string

    @ManyToOne(() => Usuario, {nullable: false})
    usuario!: Rel<Usuario>

    @OneToMany(() => Sesion, (sesion) => sesion.categoria, {
    cascade: [Cascade.ALL],
    })
    sesiones = new Collection<Sesion>(this)
}