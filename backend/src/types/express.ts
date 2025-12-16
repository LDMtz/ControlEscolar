import type { JwtPayload as JwtPayloadType } from './jwtPayload.js';
import type { Request } from 'express';

export interface AuthRequest extends Request {
  user?: JwtPayloadType;
}