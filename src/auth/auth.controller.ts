import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @Post('signup')
  public signup(@Body() dto:RegisterDto): any {
    return this._authService.signup(dto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  public sigin(@Body() dto:LoginDto): any {
    return this._authService.signin(dto)
  }
}
