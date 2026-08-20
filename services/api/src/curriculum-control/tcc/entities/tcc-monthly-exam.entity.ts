import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('tcc_monthly_exam')
@Index(['academicSession', 'monthKey'], { unique: true })
export class TCCMonthlyExam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50 })
  academicSession: string;

  @Column({ type: 'varchar', length: 20 })
  monthKey: string;

  @Column({ type: 'varchar', length: 20, default: 'DRAFT' })
  status: 'DRAFT' | 'PUBLISHED';

  @Column({ type: 'timestamp with time zone', nullable: true })
  publishedAt: Date | null;

  @Column({ type: 'jsonb' })
  subjects: {
    sequenceNumber: number;
    subject: string;
    examDate: string | null;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
