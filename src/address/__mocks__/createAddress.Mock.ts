import { cityMock } from '../../city/__mocks__/cityMock';
import { CreateAddressDto } from '../dtos/createAddress.dto';

export const createAddressMock: CreateAddressDto = {
  complement: 'Rua teste',
  numberAddress: 12345,
  cep: '123652',
  cityId: cityMock.id,
};
