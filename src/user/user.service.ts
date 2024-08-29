import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './interfaces/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(UserEntity)
  private readonly userRepository: Repository<UserEntity>;

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const senha = createUserDto.password.toString();
    // Usando bcrypt para gerar o hash da senha
    const passwordHashed = await bcrypt.hash(senha, saltOrRounds);

    return await this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }
}
