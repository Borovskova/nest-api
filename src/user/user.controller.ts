import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';

import { UserService } from './user.service';
import { GetUser } from '../auth/decorator/get-user.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { EditUserDto } from './dto/edit-user.dto';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {

    constructor(private _userService: UserService){
    }

    @Get('me')
    getMe(@GetUser() user:User): User{
        return user
    }

    @Patch()
    editUser(
        @GetUser('id') userId:number | string,
        @Body() dto:EditUserDto
    ):any{
        return this._userService.editUser(userId, dto);
    }
}
