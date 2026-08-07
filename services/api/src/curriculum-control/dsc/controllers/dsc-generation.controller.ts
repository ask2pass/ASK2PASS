import { Body, Controller, Post } from '@nestjs/common';
import { DSCGenerationService } from '../services/dsc-generation.service';

@Controller('curriculum-control/dsc')
export class DSCGenerationController {

constructor(
private readonly service: DSCGenerationService,
){}

@Post('generate')
generate(@Body() body:any){
 return this.service.generate(body);
}

}
