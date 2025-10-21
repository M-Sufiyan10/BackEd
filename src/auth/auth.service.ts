import { Injectable, Res, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/users/user.schema';
import * as bcrypt from "bcrypt"
import { InjectModel } from '@nestjs/mongoose';
import { authDTO } from './dto/auth.dto';


@Injectable()
export class AuthService {
    constructor( @InjectModel(User.name) private userModel:Model<UserDocument>, private jwt:JwtService){}

    async LogIn(authDTO:authDTO)
    {
        try{

        const user = await this.userModel.findOne({email:authDTO.email})

        if (!user)
        {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(authDTO.password, user.password)

        if(!isMatch)
        {
            return null;
        }
        const payload = { id: user._id, role : user.role , name:user.name}
        const token = await this.jwt.signAsync(payload)
        
        return {access_token: token};
    }
    
    catch(err)
    {
        console.log("Error:", err)
        return err;
    }
    }
}
