import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { RepositoriesService } from './repositories.service';

@Injectable()
export class CommitsService {
  constructor(private readonly repositoryService: RepositoriesService) {}

  @Cron('0 0 * * *') // Runs every day at midnight
  async fetchCommitsForAllRepositories() {
    const repositories = await this.repositoryService.getAllRepositories();

    for (const repo of repositories) {
      const commits = await this.repositoryService.fetchCommits(repo.owner, repo.name, repo.user.accessToken);
      await this.repositoryService.saveCommits(repo.id, commits);
    }
  }
}
