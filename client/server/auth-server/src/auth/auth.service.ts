import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Auth0Client } from '@auth0/auth0-spa-js';

@Injectable()
export class AuthService {
  private auth0Client: Auth0Client;

  constructor(private jwtService: JwtService) {
    this.auth0Client = new Auth0Client({
      domain: process.env.AUTH0_DOMAIN || '',
      clientId: process.env.AUTH0_CLIENT_ID || '',
    });
  }

  async validateAuth0Token(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      if (!decoded) {
        throw new UnauthorizedException('Invalid token');
      }
      return decoded;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Token validation failed');
    }
  }

  async generateApiToken(user: any) {
    try {
      return this.jwtService.sign({
        sub: user.sub,
        email: user.email
      });
    } catch (error) {
      throw new Error('Failed to generate API token');
    }
  }

  generateJwt(user: any) {
    const payload = { email: user.email, sub: user.sub };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
