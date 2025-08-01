import { AssignedTask } from 'src/assigned-task/entities/assigned-task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  taskId: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  @JoinColumn({ name: 'createdBy' })
  user: User;

  @OneToMany(() => AssignedTask, (assignedTask) => assignedTask.task)
  assignedTasks: AssignedTask[];
}
