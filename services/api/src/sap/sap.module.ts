import { Module } from '@nestjs/common';

import { SAPController } from './controllers/sap.controller';

import { SAPService } from './services/sap.service';

@Module({
  controllers: [
    SAPController,
  ],

  providers: [
    SAPService,
  ],

  exports: [
    SAPService,
  ],
})
export class SAPModule {}
