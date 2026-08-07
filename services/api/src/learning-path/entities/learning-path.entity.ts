import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdaptiveLearningMode } from '../enums/adaptive-learning-mode.enum';

@Entity('learning_paths')
export class LearningPath {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  learnerId: string;

  @Column({ type: 'uuid' })
  academicSessionId: string;

  @Column({ type: 'uuid' })
  academicTermId: string;

  @Column({ type: 'varchar', length: 30, default: AdaptiveLearningMode.DIFFICULT })
  adaptiveMode: AdaptiveLearningMode;

  @Column({ type: 'int', default: 4 })
  defaultDailySubjects: number;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
