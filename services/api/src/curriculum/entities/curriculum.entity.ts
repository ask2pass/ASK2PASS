import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { ProgrammeCategory } from '../enums/programme-category.enum';
import { CertificateExamination } from '../enums/certificate-examination.enum';

@Entity('curriculum')
export class Curriculum extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ProgrammeCategory,
  })
  programmeCategory!: ProgrammeCategory;

  @Column({
    type: 'enum',
    enum: CertificateExamination,
    nullable: true,
  })
  examination?: CertificateExamination;

  @Column()
  programme!: string;

  @Column()
  subject!: string;

  @Column()
  topic!: string;

  @Column()
  lessonTitle!: string;

  @Column({
    default: true,
  })
  active!: boolean;
}
