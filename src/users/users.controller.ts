import { Body, Controller, Delete, Get, Param , Patch, Post, UseGuards, Req} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { UserDTO } from './dto/UserDTO';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/guards/auth/roles.guard';
import { Roles } from 'src/guards/auth/roles.decorator';



@Controller('users')
export class UsersController {
    constructor(private readonly userService:UserService, private jwt:JwtService){}
    
    
    @Get()
    
    async getAllUsers()
    {
        return this.userService.getUsers()
    }
    @Get(":id")
    getUserById(@Param('id') id:string)
    {
            return this.userService.getUserbyId(id)
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles("superadmin")
    @Delete(":id")
    deleteUser(@Param("id") id:string)
    {
        return this.userService.deleteUser(id)
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles("superadmin")
    @Post()
    createUser(@Body() userData:UserDTO)
    {
        return this.userService.createUser(userData)
    }

    @UseGuards(AuthGuard,RolesGuard)
    @Roles("superadmin")
    @Patch(":id")

    updateUser( @Param("id") id:string , @Body() userData:Partial<{name:string,age:number}>)
    {
        return this.userService.updateUser(id,userData)
    }
}
