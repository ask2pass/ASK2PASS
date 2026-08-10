import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import { CEDMExaminationType } from '../enums/cedm-examination-type.enum';
import { CEDMQuestionSourceType } from '../enums/cedm-question-source-type.enum';
import { CEDMQuestionType } from '../enums/cedm-question-type.enum';

@Entity('cedm_questions')
@Index(['subjectId', 'topicId'])
@Index(['examinationType', 'sourceType'])
export class CEDMQuestionEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  examinationType!: CEDMExaminationType;

  @Column({ type: 'varchar' })
  subjectId!: string;

  @Column({ type: 'varchar' })
  topicId!: string;

  @Column({ type: 'varchar' })
  questionType!: CEDMQuestionType;

  @Column({ type: 'text' })
  questionText!: string;

  @Column({ type: 'jsonb', nullable: true })
  options!: string[] | null;

  @Column({ type: 'text' })
  correctAnswer!: string;

  @Column({ type: 'text' })
  explanation!: string;

  @Column({ type: 'varchar' })
  sourceType!: CEDMQuestionSourceType;

  @Column({ type: 'boolean', default: false })
  licensed!: boolean;

  @Column({ type: 'boolean', default: false })
  sourceVerified!: boolean;

  @Column({ type: 'boolean', default: false })
  generated!: boolean;

  @Column({ type: 'int', nullable: true })
  year!: number | null;
}
