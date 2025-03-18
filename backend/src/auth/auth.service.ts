import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async validateUser(profile: any, accessToken: string) {
    let user = await this.usersService.findByGithubId(profile.id);

    if (!user) {
      user = await this.usersService.create({
        githubId: profile.id,
        username: profile.username,
        email: profile.emails?.[0]?.value || '',
        avatarUrl: profile.photos?.[0]?.value || '',
        accessToken,
      });
    }

    return this.generateTokens(user);
  }

  generateTokens(user: any) {
    const payload = { userId: user.id, username: user.username };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  }
}
