import { ReturnAdrressDTO } from 'src/address/dtos/returnAddress.dto';
import { UserEntity } from '../entities/user.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  adresses?: ReturnAdrressDTO[];

  constructor(userEntity: UserEntity) {
    this.id = userEntity.id;
    this.name = userEntity.name;
    this.email = userEntity.email;
    this.phone = userEntity.phone;
    this.cpf = userEntity.cpf;
    this.adresses = userEntity.addresses
      ? userEntity.addresses.map((adress) => new ReturnAdrressDTO(adress))
      : undefined;
  }
}
