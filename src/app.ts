import 'reflect-metadata'
import express from 'express' 
import { usuarioRouter } from './usuarios/usuarios.routes.js'
import { sesionRouter } from './sesiones/sesiones.routes.js'
import { tipoSesionRouter } from './tipos_sesion/tipos_sesion.routes.js'
import { orm, syncSchema } from './shared/db/orm.js'
import { RequestContext } from '@mikro-orm/core'

const app = express()
app.use(express.json())
//luego de los middlewares base 

app.use((req, res, next) => {
    RequestContext.create(orm.em, next)
})

//antes de las rutas y middlewares de negocio

app.use('/api/users', usuarioRouter)
app.use('/api/sessions', sesionRouter)
app.use('/api/sessionTypes', tipoSesionRouter)

app.use((_, res)=>{
    return res.status(404).send({message: 'Resource Not Found'})
}) //Para manejar urls que no tenemos definidas como por ejemplo si se equivocan en algun caracter del getall ej: /api/usersss


await syncSchema()// nunca en producción

app.listen(3000,() => {
    console.log('Server running on http://localhost:3000/')
})
    