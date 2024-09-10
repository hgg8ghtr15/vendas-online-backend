import { cityMock } from '../../city/__mocks__/cityMock';
import { AddressEntity } from '../entities/address.entity';
import { userEntityMock } from '../../user/__mocks__/user.mocks';

export const addressMock: AddressEntity = {
  id: 121325,
  userId: userEntityMock.id,
  complement: 'Teste de complemento',
  numberAddress: 12355,
  cep: '445151',
  cityId: cityMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
