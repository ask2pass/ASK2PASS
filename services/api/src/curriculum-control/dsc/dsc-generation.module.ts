import { Module } from '@nestjs/common';
import { DSCGenerationController } from './controllers/dsc-generation.controller';
import { DSCGenerationService } from './services/dsc-generation.service';

@Module({
controllers:[DSCGenerationController],
providers:[DSCGenerationService],
exports:[DSCGenerationService],
})
export class DSCGenerationModule {}
