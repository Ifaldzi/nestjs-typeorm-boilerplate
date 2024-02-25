import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  public async register(@Body() data: RegisterDTO) {
    console.log(data);
    await this.authService.register(data);
  }

  @Post('/login')
  public async login(@Body() data: LoginDto) {
    const result = await this.authService.login(data);

    return result;
  }
}
