import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { CEDMAdaptiveMode } from '../enums/cedm-adaptive-mode.enum';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';
import { CEDMSessionStatus } from '../enums/cedm-session-status.enum';

@Entity('cedm_sessions')
@Index(['learnerId', 'status'])
@Index(['subjectId', 'examinationType'])
export class CEDMSessionEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  learnerId!: string;

  @Column({ type: 'varchar' })
  examinationType!: CEDMExaminationType;

  @Column({ type: 'varchar' })
  subjectId!: string;

  @Column({ type: 'jsonb' })
  topicIds!: string[];

  @Column({ type: 'varchar' })
  adaptiveMode!: CEDMAdaptiveMode;

  @Column({ type: 'varchar' })
  questionSourceType!: CEDMQuestionSourceType;

  @Column({ type: 'varchar' })
  status!: CEDMSessionStatus;

  @Column({ type: 'int', default: 0 })
  currentTopicIndex!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0 })
  scorePercent!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 65 })
  masteryThresholdPercent!: number;

  @Column({ type: 'boolean', default: true })
  continuationRequired!: boolean;
}
