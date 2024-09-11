import { ReturnUserDto } from '../../user/dtos/returnUser.dto';

export class ReturnLogin {
  user: ReturnUserDto;
  accessToken: string;
}
