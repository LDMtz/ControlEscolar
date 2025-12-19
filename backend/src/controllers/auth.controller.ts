import type { Request, Response } from 'express';

import { loginService } from '../services/auth.service.js';

let self: any = {};

self.login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await loginService(email, password);
  res.json(result);
};

export default self;