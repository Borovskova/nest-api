import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private _prismaService: PrismaService,
    private _jwtService: JwtService,
    private _configService: ConfigService
  ) {}

  public async signin(
    dto: LoginDto,
  ): Promise<any> {
    //find the user by email
    const user =
      await this._prismaService.user.findFirst({
        where: {
          email: dto.email,
        },
      });
    //if user does not exist throw exeption
    if (!user) {
      throw new ForbiddenException(
        'User does not exist!',
      );
    }

    //compare password
    const pwMatches = await argon.verify(
      user.hash,
      dto.password,
    );
    //if password invalid throw error
    if (!pwMatches) {
      throw new ForbiddenException(
        'Incorrect password!',
      );
    }

    //send back the user token
    return this.signToken(user.id, user.email);
  }

  public async signup(
    dto: RegisterDto | any,
  ): Promise<any> {
    //generate the password hash
    const hash = await argon.hash(dto.password);
    //save the new user in the data base
    try {
      let userData:any = {
        email: dto.email,
        hash,
      }
      dto.firstName ? userData.firstName = dto.firstName : null
      dto.lastName ? userData.lastName = dto.lastName : null
      const user =
        await this._prismaService.user.create({
          data: {
          ...userData
          },
          // select:{
          //     id: true,
          //     email:true,
          //     createdAt:true
          // }
        });
      
      //return the saved user token
     return this.signToken(user.id, user.email);
    } catch (error) {
      // if(error instanceof PrismaClientKnownRequestError){
      // }
      if (error.code === 'P2002') {
        throw new ForbiddenException(
          'Email already in use!',
        );
      } else {
        throw error;
      }
    }
  }

  public async  signToken(
    userId: number,
    email: string,
  ): Promise<{status:string;access_token:string}> {
    const payload = {
        sub:userId,
        email:email
    };
    const secret = this._configService.get('JWT_SECRET');
    const token =  await this._jwtService.signAsync(payload, {
        expiresIn: '24h',
        secret: secret
    });
    return {
        status: 'success',
        access_token: token
    }
  }
}
