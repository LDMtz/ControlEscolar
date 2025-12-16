import bcrypt from 'bcryptjs';
import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from '../utils/AppError.js';

import { Usuario } from '../models/usuario.model.js';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new AppError('Credenciales inválidas', 401);

  const valido = await bcrypt.compare(password, usuario.password_hash);
  if (!valido) throw new AppError('Credenciales inválidas', 401);

  const token = jwt.sign(
    {
      id: usuario.id,
      rol_id: usuario.rol_id,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '8h' }
  );

  res.json({
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      rol_id: usuario.rol_id,
    },
  });
  
};