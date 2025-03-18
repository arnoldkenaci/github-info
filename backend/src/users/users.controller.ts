import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  @Get('user-data')
  @UseGuards(AuthGuard('jwt'))
  async userData(@Req() req) {
    return {
      userId: req.user.userId,
      username: req.user.username,
      email: req.user.email, // Add email if available in JWT payload
    };
  }
}
