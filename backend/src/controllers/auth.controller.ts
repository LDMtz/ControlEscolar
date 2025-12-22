import type { Request, Response, NextFunction } from 'express';

import { loginService } from '../services/auth.service.js';

let self: any = {};

self.login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await loginService(email, password);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export default self;
