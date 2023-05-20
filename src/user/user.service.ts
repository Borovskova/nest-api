import { Injectable } from '@nestjs/common';

import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {
  constructor(
    private _prisma: PrismaService,
  ) {}

  public async editUser(
    userId: string | number | any,
    dto: EditUserDto,
  ): Promise<any> {

    let hash:string | null = null;
    if(dto.password){
        hash = await argon.hash(dto.password)
        delete dto.password;
        dto.hash = hash
    }
    dto.password === null ?  delete dto.password : null
    const user = await this._prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }
}
