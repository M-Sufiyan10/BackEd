import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import dotenv from "dotenv"
dotenv.config()
@Module({
  imports:[UsersModule, JwtModule.register({
    global:true,
    secret:process.env.SECRET_KEY,
    signOptions: { expiresIn: '1h' },
  })],

  providers: [AuthService],
  controllers: [AuthController],
  exports:[AuthService]
})
export class AuthModule {
  
}
