import { stateEntityMock } from '../../state/__mocks__/stateEntityMock';
import { CityEntity } from '../entities/city.entity';

export const cityMock: CityEntity = {
  id: 123,
  name: 'teste',
  stateId: stateEntityMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};
