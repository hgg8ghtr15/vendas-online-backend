import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
    const user = await this.getUserByEmail(createUserDto.email).catch(
      () => undefined,
    );

    if (user) {
      throw new BadRequestException('E-mail ja registrado no sistema');
    }

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

  async getUserByIdUsingRelations(userId: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });
  }
  async getUserByEmail(userEmail: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: userEmail },
    });
    if (!user) {
      throw new NotFoundException(
        `Usuário e-mail ${userEmail} não encontrado!`,
      );
    }
    return user;
  }

  async getAllUser(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async findUserByid(useId: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id: useId,
      },
    });

    if (!user) {
      throw new NotFoundException(`Usuário id ${useId} não encontrado!`);
    }

    return user;
  }
}
