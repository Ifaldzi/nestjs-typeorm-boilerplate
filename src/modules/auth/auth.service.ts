import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDTO } from './dto/register.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { LoginDto } from './dto/login.dto';
import { LoginResponse } from './dto/login-response.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly jwtService: JwtService,
  ) {}

  public async register(data: RegisterDTO) {
    const user: User = this.mapper.map(data, RegisterDTO, User);

    await this.userRepository.save(user);
  }

  public async login(data: LoginDto): Promise<LoginResponse> {
    const user = await this.userRepository.findOneBy({ email: data.email });

    if (user && (await user.checkPassword(data.password))) {
      const token = this.jwtService.sign({
        id: user.id,
      });

      return { token } as LoginResponse;
    }

    throw new UnauthorizedException('Credentials not match');
  }
}
