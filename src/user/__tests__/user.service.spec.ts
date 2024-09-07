import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userEntityMock } from '../__mocks__/user.mocks';
import { NotFoundException } from '@nestjs/common';
import { createUserMock } from '../__mocks__/createUser.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<UserEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userEntityMock),
            save: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  //Teste de usuário geral

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined(); // Verifica se o User Repositori exite
  });

  //Teste de retorna usuário por e-mail

  it('should return user in getUserByEmail', async () => {
    const user = await service.getUserByEmail(userEntityMock.email);

    expect(user).toEqual(userEntityMock); // Verifica se o User Repositori exite
  });

  it('should return error getUserByEmail', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined); // Simula findOne retornando undefined

    await expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrow(
      NotFoundException,
    ); // Verifica se NotFoundException é lançada
  });

  it('should return error getUserByEmail (DB Errror )', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error()); // Simula findOne retornando undefined

    await expect(service.getUserByEmail(userEntityMock.email)).rejects.toThrow(
      Error,
    ); // Verifica se NotFoundException é lançada
  });

  //Teste de retorna usuário por id

  it('should return user in findUserByid', async () => {
    const user = await service.findUserByid(userEntityMock.id);

    expect(user).toEqual(userEntityMock); // Verifica se o User Repositori exite
  });

  it('should return error findUserByid', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined); // Simula findOne retornando undefined

    await expect(service.findUserByid(userEntityMock.id)).rejects.toThrow(
      NotFoundException,
    ); // Verifica se NotFoundException é lançada
  });
  it('should return error findUserByid (DB Error)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(new Error()); // Simula findOne retornando undefined

    await expect(service.findUserByid(userEntityMock.id)).rejects.toThrow(
      Error,
    ); // Verifica se NotFoundException é lançada
  });

  //Teste de retorna usuário com relação

  it('should return user in getUserByIdUsingRelations', async () => {
    const user = await service.getUserByIdUsingRelations(userEntityMock.id);

    expect(user).toEqual(userEntityMock); // Verifica se o User Repositori exite
  });

  //Teste de criar usuaário

  it('should return error if user exite)', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrow(); // Verifica se o User Repositori exite
  });

  it('should return error if user não exite)', async () => {
    jest.spyOn(userRepository, 'findOne').mockRejectedValueOnce(undefined);

    const user = await service.createUser(createUserMock);
    expect(user).toEqual(userEntityMock);
  });
});
