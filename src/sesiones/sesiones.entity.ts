import { BaseEntity, Cascade, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from '@mikro-orm/core'
import { TipoSesion } from '../tipos_sesion/tipos_sesion.entity.js';
import { Usuario } from '../usuarios/usuarios.entity.js';

@Entity()
export class Sesion extends BaseEntity{
    @Property()
    descripcion?: string

    @Property({nullable: false})
    fecha! : Date

    @ManyToOne(() => TipoSesion, {nullable: false})
    tipo!: TipoSesion

    @ManyToOne(() => Usuario, {nullable:false})
    usuario!: Usuario
        
   
}

