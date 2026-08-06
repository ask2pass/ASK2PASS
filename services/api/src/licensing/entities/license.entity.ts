import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { User } from '../../user/entities/user.entity';
import { LicenseType } from '../enums/license-type.enum';

@Entity('licenses')
export class License extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  owner!: User;

  @Column({
    type: 'enum',
    enum: LicenseType,
  })
  type!: LicenseType;

  @Column()
  organizationName!: string;

  @Column({ default: true })
  active!: boolean;

  @Column({ type: 'timestamptz' })
  expiresAt!: Date;
}
