import { Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property, Rel } from '@mikro-orm/core'
import { Categoria } from '../categoria/categoria.entity.js';
import { BaseEntity } from '../shared/db/baseEntity.entity.js';

@Entity()
export class Sesion extends BaseEntity{

    @Property({nullable: false})
    tiempo_foco! : number

    @Property({nullable: false})
    fecha_hora_creacion! : Date
    
    @Property({nullable: true})
    duracion!: number

    @ManyToOne(() => Categoria, {nullable: false})
    categoria!: Rel<Categoria>
        
}

