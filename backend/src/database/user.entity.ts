import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Repository as RepositoryEntity } from './repository.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  githubId: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  accessToken: string;

  @OneToMany(() => RepositoryEntity, (repository) => repository.user, {
    cascade: true,
  })
  repositories: RepositoryEntity[];
}
