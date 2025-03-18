import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  async githubAuth() {
    return;
  }

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  async githubAuthCallback(@Req() req, @Res() res) {
    const user = req.user;
    const { accessToken, refreshToken } =
      await this.authService.generateTokens(user);

    // Set secure HTTP-only cookies
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      secure: true, // Set to true in production (HTTPS)
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.json({ message: 'Logged in successfully' });
  }

  @Post('logout')
  async logout(@Res() res) {
    res.clearCookie('access_token');
    res.clearCookie('refresh_token');
    return res.json({ message: 'Logged out successfully' });
  }

  @Get('status')
  @UseGuards(AuthGuard('jwt'))
  async status(@Req() req, @Res() res) {
    return res.json({ status: 'ok' });
  }

  @Get('refresh')
  async refreshToken(@Req() req, @Res() res) {
    try {
      const refreshToken = req.cookies['refresh_token'];

      if (!refreshToken) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      // Verify the refresh token
      const decoded = this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });

      // Generate a new access token
      const newAccessToken = this.jwtService.sign(
        { sub: decoded.sub, username: decoded.username },
        {
          secret: process.env.JWT_SECRET,
          expiresIn: '15m',
        },
      );

      return res.json({ accessToken: newAccessToken });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }
  }
}
