import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model.js';
import { AppError } from '../utils/AppError.js';

export const loginService = async (email: string, password: string) => {
  const usuario = await Usuario.findOne({ where: { email } });
  if (!usuario) throw new AppError('Credenciales inválidas', 401);

  const valido = await bcrypt.compare(password, usuario.password_hash);
  if (!valido) throw new AppError('Credenciales inválidas', 401);

  const token = jwt.sign({ id: usuario.id, rol_id: usuario.rol_id }, process.env.JWT_SECRET!, { expiresIn: '8h' });

  return {
    token,
    usuario: {
      id: usuario.id,
      email: usuario.email,
      rol_id: usuario.rol_id,
    },
  };
};
