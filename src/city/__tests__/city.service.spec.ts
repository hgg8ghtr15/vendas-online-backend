import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityEntity } from '../entities/city.entity';
import { CityService } from '../city.service';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/cityMock';
import { NotFoundException } from '@nestjs/common';

describe('CityService', () => {
  let service: CityService;
  let cityRepository: Repository<CityEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        CacheService,
        {
          provide: getRepositoryToken(CityEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
            find: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cityRepository = module.get<Repository<CityEntity>>(
      getRepositoryToken(CityEntity),
    );
  });

  //Teste de state geral

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  // Teste de State  listar

  it('Retorna a um id undefined', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);

    await expect(service.findById(cityMock.id)).rejects.toThrow(
      NotFoundException,
    );
  });

  it('Retorna a um id', async () => {
    const city = await service.findById(cityMock.id);

    expect(city).toEqual(cityMock);
  });

  it('Retorna a um id cache', async () => {
    const city = await service.getAllCitiesByStateId(cityMock.id);

    expect(city).toEqual([cityMock]);
  });
});
