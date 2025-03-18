import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { RepositoriesService } from './repositories.service';
import { AuthGuard } from '@nestjs/passport';
import axios from 'axios';
import { UsersService } from 'src/users/users.service';

@Controller('repositories')
export class RepositoriesController {
  constructor(
    private readonly repositoryService: RepositoriesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getUserRepositories(@Req() req) {
    const userId = req.user.userId;
    console.log(req.user);
    const user = await this.usersService.findByGithubId(userId);
    try {
      const response = await axios.get('https://api.github.com/user/starred', {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${user?.accessToken}`,
        },
      });
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
}
