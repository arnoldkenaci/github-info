import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Repository as RepositoryEntity } from '../database/repository.entity';
import { Commit } from '../database/commit.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RepositoriesService {
  constructor(
    @InjectRepository(Repository)
    private readonly repositoryRepository: Repository<RepositoryEntity>,
    @InjectRepository(Repository)
    private readonly commitRepository: Repository<Commit>,
    private readonly httpService: HttpService,
  ) {}

  async saveStarredRepositories(userId: number, repos: any[]): Promise<void> {
    const entities = repos.map((repo) =>
      this.repositoryRepository.create({ ...repo, user: { id: userId } }),
    );

    await this.repositoryRepository.save(entities.flat());
  }

  async getUserRepositories(userId: number): Promise<RepositoryEntity[]> {
    return this.repositoryRepository.find({ where: { user: { id: userId } } });
  }

  async getAllRepositories(): Promise<RepositoryEntity[]> {
    return this.repositoryRepository.find({
      relations: ['user'], // Include the user who owns the repository
    });
  }

  async fetchCommits(owner: string, repo: string, accessToken: string) {
    const { data } = await this.httpService.axiosRef.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );

    return data.map((commit) => ({
      sha: commit.sha,
      date: commit.commit.author.date,
    }));
  }

  async saveCommits(repoId: number, commits: any[]) {
    const commitEntities = commits.map((commit) =>
      this.commitRepository.create({ ...commit, repository: { id: repoId } }),
    );

    await this.commitRepository.save(commitEntities.flat());
  }
}
