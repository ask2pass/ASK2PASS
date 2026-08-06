import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { License } from './entities/license.entity';
import { LicenseType } from './enums/license-type.enum';
import { LicenseSummary } from './interfaces/license-summary.interface';
import { User } from '../user/entities/user.entity';

@Injectable()
export class LicensingService {
  constructor(
    @InjectRepository(License)
    private readonly licenseRepository: Repository<License>,
  ) {}

  async createLicense(
    owner: User,
    type: LicenseType,
    organizationName: string,
    durationDays: number,
  ): Promise<LicenseSummary> {
    const expiresAt = new Date(
      Date.now() + durationDays * 24 * 60 * 60 * 1000,
    );

    const license = this.licenseRepository.create({
      owner,
      type,
      organizationName,
      active: true,
      expiresAt,
    });

    const saved = await this.licenseRepository.save(license);

    return {
      id: saved.id,
      type: saved.type,
      organizationName: saved.organizationName,
      active: saved.active,
      expiresAt: saved.expiresAt,
    };
  }
}
