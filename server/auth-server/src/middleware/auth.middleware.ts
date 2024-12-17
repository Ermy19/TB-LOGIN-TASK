// server/auth-server/src/middleware/auth.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class Auth0Middleware implements NestMiddleware {
  constructor(private authService: AuthService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (token) {
        const user = await this.authService.validateAuth0Token(token);
        req['user'] = user;
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}