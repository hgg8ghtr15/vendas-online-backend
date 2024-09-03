import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { UserEntity } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltOrRounds = 10;
    const senha = createUserDto.password.toString();
    // Usando bcrypt para gerar o hash da senha
    const passwordHashed = await bcrypt.hash(senha, saltOrRounds);

    return await this.userRepository.save({
      ...createUserDto,
      password: passwordHashed,
      typeUser: 1,
    });
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserByid(user_id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário id ${user_id} não encontrado!`);
    }

    return user;
  }
}
