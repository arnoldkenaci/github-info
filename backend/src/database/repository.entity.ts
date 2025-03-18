import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Commit } from './commit.entity';

@Entity('repositories')
export class Repository {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  githubId: string;

  @Column()
  name: string;

  @Column()
  owner: string;

  @Column()
  url: string;

  @ManyToOne(() => User, user => user.repositories)
  user: User;

  @OneToMany(() => Commit, (commit) => commit.repository, { cascade: true })
  commits: Commit[];
}
