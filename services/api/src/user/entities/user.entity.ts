import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRole } from '../../common/enums/user-role.enum';
import { AccountStatus } from '../../common/enums/account-status.enum';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  firstName!: string;

  @Column({ nullable: true })
  middleName?: string;

  @Column()
  lastName!: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  phoneNumber?: string;

  @Index({ unique: true })
  @Column({ nullable: true })
  email?: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.STUDENT,
  })
  role!: UserRole;

  @Column({
    type: 'enum',
    enum: AccountStatus,
    default: AccountStatus.PENDING,
  })
  status!: AccountStatus;

  @Column({ nullable: true })
  residentialAddress?: string;

  @Column({ nullable: true })
  addressOfOrigin?: string;

  @Column({ default: false })
  profileCompleted!: boolean;
}
