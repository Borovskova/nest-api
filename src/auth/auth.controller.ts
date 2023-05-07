import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('signup')
  public signup(@Body() dto:AuthDto): any {
    return this._authService.signup(dto)
  }

  @Post('signin')
  public sigin(@Body() dto:AuthDto): any {
    return this._authService.signin(dto)
  }
}
