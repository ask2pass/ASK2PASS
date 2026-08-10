import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('learning_progress')
@Index(
  'IDX_LEARNING_PROGRESS_LEARNER_TOPIC',
  ['learnerId', 'subjectId', 'topicId'],
  { unique: true },
)
export class LearningProgressEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @Column()
  learnerId!: string;

  @Column()
  examinationType!: string;

  @Column()
  subjectId!: string;

  @Column()
  topicId!: string;

  @Column('decimal', { precision: 5, scale: 2, default: 0 })
  masteryPercent!: number;

  @Column('integer', { default: 0 })
  attempts!: number;

  @Column('integer', { default: 0 })
  correctAttempts!: number;

  @Column({ default: false })
  completed!: boolean;

  @Column({ default: 'LEARN' })
  recommendedAction!: string;
}
