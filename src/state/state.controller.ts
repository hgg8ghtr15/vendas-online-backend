import { Body, Controller, Get, Post } from '@nestjs/common';
import { StateService } from './state.service';
import { StateEntity } from './entities/state.entity';
import { CreateStateDto } from './entities/dtos/createState.dto';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Post()
  async createState(@Body() createState: CreateStateDto): Promise<StateEntity> {
    return this.stateService.createState(createState);
  }

  @Get()
  async getAllState(): Promise<StateEntity[]> {
    return this.stateService.getAllState();
  }
}
