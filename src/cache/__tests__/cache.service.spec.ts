import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { userEntityMock } from '../../user/__mocks__/user.mocks';

describe('cacheService', () => {
  let service: CacheService;
  let cacheManager: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn(() => Promise.resolve(userEntityMock)), // Mock para retornar uma Promise
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
    cacheManager = module.get(CACHE_MANAGER);
  });

  // Teste de state geral
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Teste de State listar
  it('should return the cached user', async () => {
    const user = await service.getCache('key', () => null); // Adicione await para resolver a Promise
    expect(user).toEqual(userEntityMock); // Compara o resultado resolvido com o mock
  });

  // Teste de State listar com cache vazio
  it('should return a new value when cache is empty', async () => {
    const result = { test: 'teste' };
    jest.spyOn(cacheManager, 'get').mockResolvedValue(undefined); // Spy para simular cache vazio

    const user = await service.getCache('key', () => Promise.resolve(result)); // Adicione await para resolver a Promise
    expect(user).toEqual(result); // Compara o resultado resolvido com o novo valor
  });
});
