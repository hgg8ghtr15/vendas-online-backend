import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateEntity } from '../entities/state.entity';
import { StateService } from '../state.service';
import { stateEntityMock } from '../__mocks__/stateEntityMock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<StateEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(StateEntity),
          useValue: {
            find: jest.fn().mockResolvedValue([stateEntityMock]),
            save: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<StateEntity>>(
      getRepositoryToken(StateEntity),
    );
  });

  //Teste de state geral

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  //Teste de State  listar

  it('Retorna a lista de State', async () => {
    const state = await service.getAllState();

    expect(state).toEqual([stateEntityMock]);
  });

  //Teste de State  listar

  it('Retorna a lista de State', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValueOnce(new Error());

    expect(service.getAllState()).rejects.toThrow();
  });
});
