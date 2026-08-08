import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LearningSessionStatus } from '../enums/learning-session-status.enum';

@Entity('learning_sessions')
export class LearningSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  walletId: string;

  @Column('uuid')
  learnerId: string;

  @Column('uuid')
  lessonId: string;

  @Column({
    type: 'enum',
    enum: LearningSessionStatus,
    default: LearningSessionStatus.CREATED,
  })
  status: LearningSessionStatus;

  @Column({ type: 'int', default: 0 })
  coins: number;

  @Column({ unique: true })
  reference: string;

  @Column()
  description: string;

  @Column({ default: false })
  offline: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
