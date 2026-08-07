import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AssessmentType } from '../enums/assessment-type.enum';
import { AssessmentSyncStatus } from '../enums/assessment-sync-status.enum';

@Entity('sap_assessments')
@Index(['learnerId', 'subject', 'topic'])
export class SAPAssessmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  learnerId: string;

  @Column({ nullable: true })
  sessionId: string | null;

  @Column({ nullable: true })
  lessonId: string | null;

  @Column()
  classLevel: string;

  @Column()
  subject: string;

  @Column()
  topic: string;

  @Column({
    type: 'enum',
    enum: AssessmentType,
  })
  assessmentType: AssessmentType;

  @Column('float')
  score: number;

  @Column('float')
  maxScore: number;

  @Column('float')
  percentage: number;

  @Column({ default: true })
  completed: boolean;

  @Column({ default: false })
  offline: boolean;

  @Column({
    type: 'enum',
    enum: AssessmentSyncStatus,
    default: AssessmentSyncStatus.LOCAL,
  })
  syncStatus: AssessmentSyncStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
