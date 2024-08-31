import { Injectable } from '@nestjs/common';
import { StateEntity } from './entities/state.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStateDto } from './entities/dtos/createState.dto';

@Injectable()
export class StateService {
  constructor(
    @InjectRepository(StateEntity)
    private readonly stateRepository: Repository<StateEntity>,
  ) {}

  async createState(createStateDto: CreateStateDto): Promise<StateEntity> {
    return await this.stateRepository.save(createStateDto);
  }

  async getAllState(): Promise<StateEntity[]> {
    return await this.stateRepository.find();
  }
}
