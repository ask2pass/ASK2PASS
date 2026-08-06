import { Column, Entity, ManyToOne } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { EducationLevel } from '../enums/education-level.enum';

@Entity('learner_profiles')
export class LearnerProfile extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  user!: User;

  @Column({
    type: 'enum',
    enum: EducationLevel,
  })
  educationLevel!: EducationLevel;

  @Column()
  programme!: string;

  @Column()
  classLevel!: string;

  @Column({
    default: 'English',
  })
  preferredLanguage!: string;

  @Column({
    default: 'DIFFICULT',
  })
  adaptiveMode!: string;

  @Column({
    default: true,
  })
  active!: boolean;
}
