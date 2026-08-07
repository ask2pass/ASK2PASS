import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AITutor } from '../enums/ai-tutor.enum';
import { SessionStatus } from '../enums/session-status.enum';

@Entity('learning_sessions')
export class LearningSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  learnerId: string;

  @Column({ type: 'uuid' })
  dailySubjectChartId: string;

  @Column({ type: 'uuid' })
  subjectId: string;

  @Column({ type: 'uuid' })
  lessonId: string;

  @Column({ type: 'boolean', default: false })
  recoveryLesson: boolean;

  @Column({ type: 'varchar', length: 30 })
  aiTutor: AITutor;

  @Column({ type: 'varchar', length: 30, default: SessionStatus.NOT_STARTED })
  status: SessionStatus;

  @Column({ type: 'int', default: 0 })
  missedEngagementChecks: number;

  @Column({ type: 'timestamp', nullable: true })
  startedAt: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  completedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
