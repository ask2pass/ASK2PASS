import {
  Column,
  Entity,
  Index,
} from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity('roles')
export class Role extends BaseEntity {
  @Index({ unique: true })
  @Column({
    length: 50,
  })
  name!: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  active!: boolean;
}
