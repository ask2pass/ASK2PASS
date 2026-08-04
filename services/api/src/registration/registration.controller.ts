import { Body, Controller, Post } from '@nestjs/common';

import { RegisterUserDto } from './dto/register-user.dto';
import { RegistrationService } from './registration.service';

@Controller('registration')
export class RegistrationController {
  constructor(
    private readonly registrationService: RegistrationService,
  ) {}

  @Post()
  register(
    @Body() registerUserDto: RegisterUserDto,
  ) {
    return this.registrationService.register(registerUserDto);
  }
}
