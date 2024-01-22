import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'task' })
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  title: string;

  @Column('text', {
    nullable: false,
  })
  description: string;

  @Column('bool', {
    default: false,
  })
  isCompleted: boolean;
}
