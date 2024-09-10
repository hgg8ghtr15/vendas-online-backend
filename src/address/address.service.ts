import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddressEntity } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { UserService } from '../user/user.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(AddressEntity)
    private readonly addressRepository: Repository<AddressEntity>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(
    createAddressDto: CreateAddressDto,
    userId: number,
  ): Promise<AddressEntity> {
    const user = await this.userService.findUserByid(userId);
    const city = await this.cityService.findById(createAddressDto.cityId);

    if (!user || !city) {
      throw new Error(`Erro ao tentar executar`);
    }
    return await this.addressRepository.save({
      ...createAddressDto,
      userId,
    });
  }
}
