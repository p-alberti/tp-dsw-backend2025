import 'reflect-metadata'
import express from 'express' 
import cors from 'cors';
import { usuarioRouter } from './usuarios/usuarios.routes.js'
import { categoriaRouter } from './categoria/categoria.routes.js'
import { sesionRouter } from './sesiones/sesiones.routes.js'
import { tareaRouter } from './tareas/tarea.routes.js';
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'
import 'dotenv/config'
import { authRouter } from './auth/auth.routes.js';

const app = express()
const port = process.env.PORT || 3000;
app.use(express.json())
app.use(cors())

//luego de los middlewares base 

app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
})

//antes de las rutas y middlewares de negocio

app.use('/api/users', usuarioRouter)
app.use('/api/categories', categoriaRouter)
app.use('/api/sessions', sesionRouter)
app.use('/api/tasks', tareaRouter)
app.use('/api', authRouter)

app.use((_, res)=>{
    return res.status(404).send({message: 'Resource Not Found'})
}) //para manejar urls que no tenemos definidas como por ejemplo si se equivocan en algun caracter del getall ej: /api/usersss

await syncSchema() // never in production

app.listen(port,() => {
    console.log(`Server running on http://localhost:${port}/`)
})
    