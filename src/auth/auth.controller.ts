import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { orm } from '../shared/db/orm.js';
import { Usuario } from '../usuarios/usuarios.entity.js';

const em = orm.em.fork();

export async function login(req: Request, res: Response) {
    try {
        console.log('BODY LOGIN:', req.body); // 👀 Ver qué llega
        const { mail, contraseña } = req.body;

        // 1. Buscar al usuario por su email
        const user = await em.findOne(Usuario, { mail });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas 1' }); // Mensaje genérico por seguridad
        }

        // 2. Comparar la contraseña enviada con la hasheada en la BD
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas  2' });
        }

        // 3. Si todo es correcto, crear el Payload para el token
        const payload = {
            userId: user.id,
            email: user.mail,
            // Puedes añadir un rol si lo tienes en tu modelo de User
            // role: user.role 
        };

        // 4. Firmar el token
        const secret = process.env.JWT_SECRET; // ¡MUY IMPORTANTE!
        if (!secret) {
            throw new Error('JWT_SECRET no está definida en las variables de entorno');
        }

        const token = jwt.sign(payload, secret, { expiresIn: '8h' });

        // 5. Enviar el token al cliente
        res.status(200).json({
            message: 'Login exitoso',
            token: token,
            user: { id: user.id, nombre: user.nombre }
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}