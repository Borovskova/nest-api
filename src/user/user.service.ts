import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto/edit-user.dto';

@Injectable()
export class UserService {

    constructor (private _prisma:PrismaService){
        
    }

    public async editUser(userId:string | number | any, dto:EditUserDto):Promise<any>{
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
