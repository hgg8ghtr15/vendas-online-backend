import { Injectable, NotFoundException } from '@nestjs/common';
import { CityEntity } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CacheService } from 'src/cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(CityEntity)
    private readonly cityReposotory: Repository<CityEntity>,
    private readonly cacheService: CacheService,
  ) {}

  async getAllCitiesByStateId(stateId: number): Promise<CityEntity[]> {
    return this.cacheService.getCache<CityEntity[]>(`state_${stateId}`, () =>
      this.cityReposotory.find({
        where: {
          stateId,
        },
      }),
    );
  }

  async findById(city_id: number): Promise<CityEntity> {
    const city = await this.cityReposotory.findOne({
      where: {
        id: city_id,
      },
    });

    if (!city) {
      throw new NotFoundException(`Cidade id ${city_id} não encontrada!`);
    }
    return city;
  }
}
