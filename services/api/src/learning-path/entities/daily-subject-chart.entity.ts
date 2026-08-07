import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { DSCMode } from '../enums/dsc-mode.enum';

@Entity('daily_subject_charts')
export class DailySubjectChart {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  learnerId: string;

  @Column({ type: 'uuid' })
  learningPathId: string;

  @Column({ type: 'uuid' })
  academicTermId: string;

  @Column({ type: 'date' })
  chartDate: string;

  @Column({ type: 'int', default: 4 })
  defaultSubjectCount: number;

  @Column({ type: 'int', default: 0 })
  recoverySubjectCount: number;

  @Column({ type: 'int', default: 4 })
  totalSubjectCount: number;

  @Column({ type: 'varchar', length: 20, default: DSCMode.DEFAULT })
  mode: DSCMode;

  @Column({ type: 'boolean', default: false })
  completed: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
