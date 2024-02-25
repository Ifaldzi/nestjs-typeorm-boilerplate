import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get dbConfig(): TypeOrmModuleOptions {
    const entities = [__dirname + '/../modules/**/*.entity{.ts,.js}'];

    return {
      type: 'mysql',
      host: this.configService.get('DB_HOST') || 'localhost',
      port: this.configService.get<number>('DB_PORT') || 3306,
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      namingStrategy: new SnakeNamingStrategy(),
      entities,
      logging: true,
    };
  }

  get jwtConfig(): JwtModuleOptions {
    return {
      secret: this.configService.get('JWT_SECRET'),
      signOptions: {
        expiresIn: `${this.configService.get('JWT_EXPIRES_IN_MINUTE')}m`,
      },
    };
  }
}
