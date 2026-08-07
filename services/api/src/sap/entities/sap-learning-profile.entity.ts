import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { MasteryStatus } from '../enums/mastery-status.enum';

@Entity('sap_learning_profiles')
@Index(['learnerId', 'subject', 'topic'], { unique: true })
export class SAPLearningProfileEntity {
  @PrimaryColumn()
  learnerId: string;

  @Column()
  classLevel: string;

  @Column()
  subject: string;

  @Column()
  topic: string;

  @Column({ type: 'float', nullable: true })
  baselineScore: number | null;

  @Column({ type: 'float', nullable: true })
  latestScore: number | null;

  @Column({ type: 'float', default: 0 })
  masteryScore: number;

  @Column({
    type: 'enum',
    enum: MasteryStatus,
    default: MasteryStatus.NOT_ASSESSED,
  })
  masteryStatus: MasteryStatus;

  @Column({ type: 'float', default: 0 })
  competencyLevel: number;

  @Column({ type: 'float', default: 0 })
  learningGapScore: number;

  @Column({ default: false })
  interventionRequired: boolean;

  @Column({ default: true })
  personalizedPathRequired: boolean;

  @Column({ default: 0 })
  assessmentCount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
