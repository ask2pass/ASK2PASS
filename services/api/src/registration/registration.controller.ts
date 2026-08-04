import { Body, Controller, Post } from '@nestjs/common';

import { RegistrationService } from './registration.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
  ) {}

  @Post()
  register(
    @Body() dto: RegisterUserDto,
  ) {
    return this.registrationService.register(dto);
  }
}
