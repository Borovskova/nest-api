import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private _prismaService:PrismaService){

    }

    public signin():any{
        return {
            msg: 'Signing in'
        }
    }

    public signup():any{
        return {
            msg: 'Signing up'
        }
    }
}
