import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { License } from './entities/license.entity';
import { LicensingService } from './licensing.service';
import { LicensingController } from './licensing.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([License]),
  ],
  providers: [LicensingService],
  controllers: [LicensingController],
  exports: [LicensingService],
})
export class LicensingModule {}
