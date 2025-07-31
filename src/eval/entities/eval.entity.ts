import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Eval {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;
}
