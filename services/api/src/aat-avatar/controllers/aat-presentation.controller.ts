import { Body, Controller, Post } from '@nestjs/common';
import type { AATPresentationRequest } from '../interfaces/aat-presentation.interface';
import { AATPresentationService } from '../services/aat-presentation.service';

@Controller('aat/presentation')
export class AATPresentationController {
  constructor(
    private readonly presentation: AATPresentationService,
  ) {}

  @Post('prepare')
  prepare(@Body() request: AATPresentationRequest) {
    return this.presentation.prepare(request);
  }
}
