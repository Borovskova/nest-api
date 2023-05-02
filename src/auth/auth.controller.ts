import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('signup')
  public signup(@Body() dto:AuthDto): any {
    console.log({
      dto:dto
    })
    return this._authService.signup()
  }

  @Post('signin')
  public sigin(): any {
    return this._authService.signin()
  }
}
