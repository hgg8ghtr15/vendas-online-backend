import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../user/user.service';
import { AuthService } from '../auth.service';
import { JwtService } from '@nestjs/jwt';
import { jwtMock } from '../__mocks__/jwtMock';
import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { loginUserMock } from './login-user.mock';
import { NotFoundException } from '@nestjs/common';
import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockResolvedValue(true),
}));

describe('authService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            getUserByEmail: jest.fn().mockResolvedValue(userEntityMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockResolvedValue(jwtMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  //Teste de state geral

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('Verifica se e-mail e senha é valido! ', async () => {
    const user = await service.login(loginUserMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userEntityMock),
    });
  });
  it('should throw an error if user is not found', async () => {
    jest.spyOn(userService, 'getUserByEmail').mockResolvedValue(null);

    await expect(service.login(loginUserMock)).rejects.toThrow(
      NotFoundException,
    );
  });
});
