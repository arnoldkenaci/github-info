import { Module } from '@nestjs/common';
import { RepositoriesController } from './repositories.controller';
import { RepositoriesService } from './repositories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'src/database/repository.entity';
import { Commit } from 'src/database/commit.entity';
import { HttpModule } from '@nestjs/axios';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Repository, Commit]),
    HttpModule,
    UsersModule,
  ],
  controllers: [RepositoriesController],
  providers: [RepositoriesService],
})
export class RepositoriesModule {}
