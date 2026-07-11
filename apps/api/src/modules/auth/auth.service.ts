import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly jwt: JwtService,
  ) {}

  async login(email: string, password: string) {
    const adminEmail = this.config.get<string>('ADMIN_EMAIL') ?? 'admin@boda.local';
    const adminPassword = this.config.get<string>('ADMIN_PASSWORD') ?? 'change-me';
    if (email !== adminEmail || password !== adminPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const accessToken = await this.jwt.signAsync(
      { sub: email, role: 'admin' },
      { secret: this.config.get<string>('JWT_SECRET') ?? 'dev-secret', expiresIn: '8h' },
    );
    return { accessToken };
  }

  async verify(token: string) {
    return this.jwt.verifyAsync(token, { secret: this.config.get<string>('JWT_SECRET') ?? 'dev-secret' });
  }
}
