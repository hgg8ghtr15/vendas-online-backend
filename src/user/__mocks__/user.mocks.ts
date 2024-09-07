import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 123456,
  email: 'testeemail@gmail.com',
  name: 'testenome',
  cpf: '123456789',
  password: 'testedesenha',
  phone: '123445695',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
