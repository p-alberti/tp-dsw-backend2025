import  {Entity, OneToMany, Property, Cascade, Collection, PrimaryKey, OneToOne, ManyToOne, Rel} from '@mikro-orm/core'
import { Usuario } from '../usuarios/usuarios.entity.js'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

@Entity()
export class Tarea extends BaseEntity{
    @Property({nullable: false})
    nombre!: string

    @Property({nullable: true})
    descripcion!: string
    /*
    @Property({nullable: false})
    fecha_creacion!: Date

    @Property({nullable: false})
    fecha_finalizacion!: Date
    */

    @ManyToOne(() => Usuario, {nullable: false})
    usuario!: Rel<Usuario>

    @Property({nullable: false})
    estado! :  string

   /* @ManyToMany(() => estados, (estado) => estado.categoria, {
    cascade: [Cascade.ALL],
    })
    estados = new Collection<Estado>(this)*/
  }