import { IsCompleted } from 'src/enum';
import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AssignedTask {
  @PrimaryGeneratedColumn()
  assignedTaskId: number;

  @ManyToOne(() => User, (user) => user.assignedTasks)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Task, (task) => task.assignedTasks)
  @JoinColumn({ name: 'taskId' })
  task: Task;

  @Column({ type: 'enum', enum: IsCompleted, default: IsCompleted.FALSE })
  isCompleted: IsCompleted;
}
