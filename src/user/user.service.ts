import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { User } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const senha = createUserDto.password.toString();

    // Usando bcrypt para gerar o hash da senha
    const passwordHashed = await bcrypt.hash(senha, saltOrRounds);
    console.log(passwordHashed);

    // Criando o novo usuário (simulação)
    const user: User = {
      ...createUserDto,
      id: this.users.length + 1, // Simulando a criação de um ID
      password: passwordHashed, // Armazenando a senha hasheada
    };

    this.users.push(user); // Adicionando o usuário à lista de usuários
    return user;
  }

  async getAllUser(): Promise<User[]> {
    return this.users;
  }
}
