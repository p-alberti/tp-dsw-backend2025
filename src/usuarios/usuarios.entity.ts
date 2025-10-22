import { Cascade, Collection, Entity, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { Categoria } from '../categoria/categoria.entity.js'
import { BaseEntity } from '../shared/db/baseEntity.entity.js'

@Entity()
export class Usuario extends BaseEntity{
    @Property({nullable: false})
    nombre!: string

    @Property({nullable: false})
    apellido!: string

    @Property({nullable: false})
    fechaNac!: Date

    @Property({nullable: false, unique:true})
    username!: string

    @Property({nullable: false})
    contraseña!: string

    @Property({nullable: false, unique:true})
    mail!: string

    @OneToMany(() => Categoria, (categoria) => categoria.usuario, {
        cascade: [Cascade.ALL],
    })
    categorias = new Collection<Categoria>(this) 
    //public tasks: task[], el usurio conoce sus tareas, se crearan mas adelante
}