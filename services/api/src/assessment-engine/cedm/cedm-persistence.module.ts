import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CEDMQuestionEntity } from './entities/cedm-question.entity';
import { CEDMSessionEntity } from './entities/cedm-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CEDMQuestionEntity, CEDMSessionEntity])],
  exports: [TypeOrmModule],
})
export class CEDMPersistenceModule {}
