import { Controller, Get } from '@nestjs/common';
import { TCCEngineService } from '../services/tcc-engine.service';

@Controller('curriculum-control/tcc')
export class TCCEngineController {

constructor(
 private readonly service:TCCEngineService
){}


@Get('structure')
structure(){

return this.service.getTermStructure();

}


@Get('dsc-rule')
dscRule(){

return this.service.generateDSCRule();

}

}
