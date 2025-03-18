import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Repository } from './repository.entity';

@Entity('commits')
export class Commit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sha: string;

  @Column()
  date: Date;

  @ManyToOne(() => Repository, (repo) => repo.commits, { onDelete: 'CASCADE' })
  repository: Repository;
}