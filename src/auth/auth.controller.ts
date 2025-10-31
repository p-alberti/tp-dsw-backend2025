import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { orm } from '../shared/db/orm.js';
import { Usuario } from '../usuarios/usuarios.entity.js';

const em = orm.em.fork();

export async function login(req: Request, res: Response) {
    try {
        //console.log('BODY LOGIN:', req.body);
        const { mail, contraseña } = req.body;

        //Buscar al usuario por su email
        const user = await em.findOne(Usuario, { mail });
        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas 1' });
        }

        //Comparar la contraseña enviada con la hasheada en la bd
        const isMatch = await bcrypt.compare(contraseña, user.contraseña);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas  2' });
        }

        //Si todo es correcto crear el payload para el token
        const payload = {
            userId: user.id,
            email: user.mail,
 
        };

        //Firmar el token
        const secret = process.env.JWT_SECRET; 
        if (!secret) {
            throw new Error('JWT_SECRET no está definida en las variables de entorno');
        }

        const token = jwt.sign(payload, secret, { expiresIn: '8h' });

        //Enviar el token al cliente
        res.status(200).json({
            message: 'Login exitoso',
            token: token,
            user: { id: user.id, nombre: user.nombre }
        });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}