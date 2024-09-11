import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { AddressService } from './address.service';
import { UserType } from '../user/enum/user-type.enum';
import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id-decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  // @Post('/:userId')
  @Roles(UserType.User)
  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @UserId() userId: number,
  ): Promise<AddressEntity> {
    // console.log(userId);
    return this.addressService.createAddress(createAddressDto, userId);
  }
}
