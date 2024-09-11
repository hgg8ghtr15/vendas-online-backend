import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(login: LoginDto): Promise<ReturnLogin> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(login.email)
      .catch(() => undefined);
    const isMath = await compare(login.password, user?.password || '');

    if (!user || !isMath) {
      console.log(user);
      console.log(isMath);
      throw new NotFoundException('E-mail ou Password incorreto');
    }
    return {
      accessToken: await this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
