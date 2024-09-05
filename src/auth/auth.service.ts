import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entities/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async login(login: LoginDto): Promise<UserEntity> {
    const user: UserEntity | undefined = await this.userService
      .getUserByEmail(login.email)
      .catch(() => undefined);
    const isMath = await compare(login.password, user?.password || '');

    if (!user || !isMath) {
      throw new NotFoundException('E-mail ou Password incorreto');
    }
    return user;
  }
}
