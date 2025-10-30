import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { Categoria } from '../categoria/categoria.entity.js'
import { Tarea } from '../tareas/tarea.entity.js'
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
    
    @OneToMany(() => Tarea, (tarea) => tarea.usuario, {
        cascade: [Cascade.ALL],
    })
    tareas = new Collection<Tarea>(this) 
}