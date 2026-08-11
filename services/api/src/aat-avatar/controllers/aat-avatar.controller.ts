import { Controller, Get, Param } from '@nestjs/common';
import { AATAvatarRegistryService } from '../services/aat-avatar-registry.service';

@Controller('aat/avatars')
export class AATAvatarController {
  constructor(
    private readonly registry: AATAvatarRegistryService,
  ) {}

  @Get()
  list() {
    return this.registry.list();
  }

  @Get(':id')
  get(@Param('id') id: string) {
    return this.registry.get(id);
  }
}
