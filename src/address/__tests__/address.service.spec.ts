import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AddressEntity } from '../entities/address.entity';
import { AddressService } from '../address.service';
import { CityService } from '../../city/city.service';
import { UserService } from '../../user/user.service';
import { addressMock } from '../__mocks__/addressMock';
import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { cityMock } from '../../city/__mocks__/cityMock';
import { createAddressMock } from '../__mocks__/createAddress.Mock';

describe('AddressService', () => {
  let service: AddressService;
  let addressRepository: Repository<AddressEntity>;
  let userService: UserService;
  let cityService: CityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddressService,
        {
          provide: getRepositoryToken(AddressEntity),
          useValue: {
            save: jest.fn().mockResolvedValue(addressMock),
          },
        },
        {
          provide: UserService,
          useValue: {
            findUserByid: jest.fn().mockResolvedValueOnce(userEntityMock),
          },
        },
        {
          provide: CityService,
          useValue: {
            findById: jest.fn().mockResolvedValueOnce(cityMock),
          },
        },
      ],
    }).compile();

    service = module.get<AddressService>(AddressService);
    userService = module.get<UserService>(UserService);
    cityService = module.get<CityService>(CityService);
    addressRepository = module.get<Repository<AddressEntity>>(
      getRepositoryToken(AddressEntity),
    );
  });

  //Teste de state geral

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(cityService).toBeDefined();
    expect(addressRepository).toBeDefined();
  });

  it('Retorno de address criado com sucesso !', async () => {
    const address = await service.createAddress(
      createAddressMock,
      userEntityMock.id,
    );

    expect(address).toEqual(addressMock);
  });

  // it('Retorno de address error user Service!', async () => {
  //   jest.spyOn(userService, 'findUserByid').mockRejectedValueOnce(undefined);

  //   await expect(
  //     service.createAddress(createAddressMock, undefined),
  //   ).rejects.toThrow();
  // });

  // it('should return error if exception in userService', async () => {
  //   jest.spyOn(userService, 'findUserByid').mockRejectedValueOnce(new Error());

  //   expect(
  //     service.createAddress(createAddressMock, userEntityMock.id),
  //   ).rejects.toThrowError();
  // });
});
