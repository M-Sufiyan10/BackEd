import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDTO } from './dto/auth.dto';
import type { Response } from 'express';



@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService:AuthService){}
    
    @Post()
    async LogIn(@Body() authDTO:authDTO, @Res({passthrough:true}) res:Response)
    {
        const token = await this.AuthService.LogIn(authDTO)
        console.log("Token :", token)
        res.cookie("token",token.access_token)
    }
}
