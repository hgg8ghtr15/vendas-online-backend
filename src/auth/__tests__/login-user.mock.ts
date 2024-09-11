import { userEntityMock } from '../../user/__mocks__/user.mocks';
import { LoginDto } from '../dtos/login.dto';

export const loginUserMock: LoginDto = {
  email: userEntityMock.email,
  password: '12345692',
};
