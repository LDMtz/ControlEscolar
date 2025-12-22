export interface JwtPayload {
  id: number;
  rol_id: number;
  iat?: number;
  exp?: number;
}
