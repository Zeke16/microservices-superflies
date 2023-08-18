import { Controller } from '@nestjs/common';
import { User } from './model/user.model';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from 'src/common/constants';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
  @MessagePattern(UserMSG.CREATE)
  createUser(@Payload() user: User) {
    return this.userService.createUser(user);
  }

  @MessagePattern(UserMSG.FIND_ALL)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  getUser(@Payload() id: string) {
    return this.userService.getUser(id);
  }

  @MessagePattern(UserMSG.UPDATE)
  updateUser(@Payload() payload: any) {
    return this.userService.updateUser(payload.id, payload.user);
  }

  @MessagePattern(UserMSG.DELETE)
  deleteUser(@Payload() id: string) {
    return this.userService.deleteUser(id);
  }
}
