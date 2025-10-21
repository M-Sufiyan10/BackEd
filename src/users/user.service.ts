import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dto/UserDTO';
import * as bcrypt from "bcrypt"


@Injectable()

export class UserService 
{
    constructor(@InjectModel(User.name) private Users:Model<UserDocument>){}
    async getUsers()
    {
        const users = await this.Users.find();
        if (users)
        {
            return users
        }
        return "users doesn't exist "
    }

    async getUserbyId(id:string)
    {
        const users = await this.Users.findById(id)
        if(users)
        {
            return users
        }
        return "User doesn't exist"
    }

    async deleteUser(userId:string)
    {
        const deletedUser = await this.Users.findByIdAndDelete(userId)
        if(deletedUser)
        {
            return deletedUser
        }
        return "User doesn't exist to be deleted"
    }

    async createUser(userData:UserDTO)
    {
        try
        {
            const hashpassword = await bcrypt.hash(userData.password, 10)
            userData.password = hashpassword;
            const newUser = new this.Users(userData)
            await newUser.save()
            return newUser;
        }
        catch(err)
        {
            console.log("Error: ",err)
            throw err;
        }
    }

    async updateUser(id:string, userData:Partial<User>)
    {
        const updatedUser = await this.Users.findByIdAndUpdate(id,userData)
        if (updatedUser)
        {
            return updatedUser;
        }
        return "User doesn't exist to be updated"
    }
}
