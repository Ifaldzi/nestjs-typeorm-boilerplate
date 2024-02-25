import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { AuthProfile } from './auth.profile';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from 'src/config/app.config';
import { JwtStrategy } from 'src/guards/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => {
        return configService.jwtConfig;
      },
      inject: [AppConfigService],
    }),
  ],
  providers: [AuthService, AuthProfile, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
