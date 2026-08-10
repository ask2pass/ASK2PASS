import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CEDMQuestionEntity } from './entities/cedm-question.entity';
import { CEDMSessionEntity } from './entities/cedm-session.entity';
import { CEDMPersistenceRepository } from './repositories/cedm-persistence.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CEDMQuestionEntity, CEDMSessionEntity])],
  providers: [CEDMPersistenceRepository],
  exports: [TypeOrmModule, CEDMPersistenceRepository],
})
export class CEDMPersistenceModule {}
