import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from 'src/database/user.entity';
import { UsersController } from './users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Register User entity
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService], // Export UsersService for use in other modules
})
export class UsersModule {}
