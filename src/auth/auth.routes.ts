import { Router } from 'express';
import { login } from './auth.controller.js';

export const authRouter = Router();
authRouter.post('/auth/login', login);