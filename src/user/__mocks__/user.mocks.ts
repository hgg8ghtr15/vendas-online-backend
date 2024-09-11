import { UserEntity } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userEntityMock: UserEntity = {
  id: 123456,
  email: 'fabiolukascj@gmail.com',
  name: 'testenome',
  cpf: '123456789',
  password: '12345692',
  phone: '123445695',
  typeUser: UserType.User,
  createdAt: new Date(),
  updatedAt: new Date(),
};
