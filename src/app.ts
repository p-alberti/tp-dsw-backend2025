import express, { Request, Response, NextFunction }  from 'express'
import { Usuario } from './usuario.js'

const app = express()

app.use(express.json())

const usuarios = [
  new Usuario(
    'Pedro',
    'Alberti',
    45189164,
    new Date('2003-09-28'),
    'Vysaerys',
    '12345',
    'pedroalberti2003@gmail.com',
    [],
    '733b6b1c-0197-49d9-82ae-eb2c2f2a8a54'
  ),
]

function sanitizeInputUsuario(req: Request, res: Response, next: NextFunction){

  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    dni: req.body.dni,
    fechaNac: req.body.fechaNac,
    username: req.body.username,
    sesiones: req.body.sesiones,    contraseña: req.body.contraseña,
    mail: req.body.mail
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if(req.body.sanitizedInput[key] === undefined){
    delete req.body.sanitizedInput[key]
    }
  })


  next()
}


app.get('/api/usuarios', (req, res) => {
  res.json({data: usuarios})
})

app.get('/api/usuarios/:id', (req, res) => {
  const usuario = usuarios.find((usuario) => usuario.id === req.params.id)
  if (!usuario){
    res.status(404).send({message: 'No se encuentra el usuario con el id enviado', data: req.params.id})
    return
  }
  res.json({data: usuario})
})

app.post('/api/usuarios', sanitizeInputUsuario, (req, res) => {
  const input = req.body.sanitizedInput

  const usuario = new Usuario(
    input.nombre, 
    input.apellido, 
    input.dni, 
    input.fechaNac, 
    input.username, 
    input.contraseña, 
    input.mail
  )

  usuarios.push(usuario)

  res.status(201).send({message: 'usuario Creado correctamente', data: usuario})

  return

})

app.put('/api/usuarios/:id',sanitizeInputUsuario, (req, res) => {
  const usuarioIdx = usuarios.findIndex((usuario) => usuario.id === req.params.id)

  if(usuarioIdx === -1){
    res.status(404).send({message: 'Usuario no encontrado'})
    return
  }
  

  usuarios[usuarioIdx] = {...usuarios[usuarioIdx], ...req.body.sanitizedInput }

  res.status(200).send({message: 'Usuario modificado con éxito', data: usuarios[usuarioIdx]})
  return
})

app.patch('/api/usuarios/:id',sanitizeInputUsuario, (req, res) => {
  const usuarioIdx = usuarios.findIndex((usuario) => usuario.id === req.params.id)

  if(usuarioIdx === -1){
    res.status(404).send({message: 'Usuario no encontrado'})
    return
  }
  

  usuarios[usuarioIdx] = {...usuarios[usuarioIdx], ...req.body.sanitizedInput }

  res.status(200).send({message: 'Usuario modificado con éxito', data: usuarios[usuarioIdx]})
  return
})

app.delete('/api/usuarios/:id', (req, res) => {
  const usuarioIdx = usuarios.findIndex((usuario) => usuario.id === req.params.id)

  if(usuarioIdx === -1){
    res.status(404).send({message: 'Usuario no encontrado'})
  }else{
    usuarios.splice(usuarioIdx, 1)
    res.status(200).send({message: 'Usuario eliminado exitosamente'})
  }
})

app.use((req, res) => {
  res.status(404).send({message: 'Recurso no encontrado'})
})


app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/')
})
