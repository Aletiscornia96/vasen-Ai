import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'vasen_estetica_super_secret_key_2026',
    });
  }

  async validate(payload: any) {
    console.log('JwtStrategy.validate payload:', payload);
    return { userId: payload.sub, email: payload.email, role: payload.role, doctorId: payload.doctorId };
  }
}
