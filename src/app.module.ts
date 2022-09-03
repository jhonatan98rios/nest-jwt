import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config'
import { UsersModule } from './app/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: process.env.DATABASE,
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: true
    } as TypeOrmModuleOptions),
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
