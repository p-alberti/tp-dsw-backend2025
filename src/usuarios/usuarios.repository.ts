import { Repository } from "../shared/repository.js";
import { Usuario } from "./usuarios.entity.js";

const users = [
    new Usuario(
        'Paula',
        'Perez',
        46532117,
        new Date('2003-09-28'),
        'paulaperez',
        '12345',
        'paulaperez@gmail.com',
        [],
        'a02b91bc-3769-4221-beb1-d7a3aeba7dad'
    ),
]

export class UsuarioRepositorio implements Repository<Usuario>{
    public findAll(): Usuario[] | undefined {
        return users
    }

    public findOne(item: { id: String; }): Usuario | undefined {
        return users.find((user)=>user.id === item.id)
    }

    public add(item: Usuario): Usuario | undefined {
        users.push(item)
        return item
    }

    public update(item: Usuario): Usuario | undefined {
        const userIdx = users.findIndex(user => user.id === item.id)

        if(userIdx !== -1){
            users[userIdx] = {...users[userIdx], ...item}
        }
        return users[userIdx]
    }

    public delete(item: { id: String; }): Usuario | undefined {
        const userIdx = users.findIndex(user => user.id === item.id)

        if(userIdx !== -1){
            const deletedUsers = users[userIdx]
            users.splice(userIdx,1)
            return deletedUsers
        }
    }
}