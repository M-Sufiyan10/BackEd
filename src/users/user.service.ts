import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './user.schema';
import { Model } from 'mongoose';
import { UserDTO } from './dto/UserDTO';
import * as bcrypt from "bcrypt"
import { InjectQueue } from '@nestjs/bull';
import type { Queue } from 'bull';
import { InternalServerErrorException } from '@nestjs/common';
import { createClient} from 'redis';
import { json } from 'express';
const client = createClient();
client.connect();

@Injectable()

export class UserService 
{
    constructor(@InjectModel(User.name) private Users:Model<UserDocument> , @InjectQueue("email") private emailQueue:Queue){}
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
        const user = await client.get(`user:${id}`)
        if(user)
        {
            console.log("this is returned from Redis")
            return JSON.parse(user)       
        }


        const users = await this.Users.findById(id)
        if(users)
        {
            console.log("This is returned from Db direct")
            await client.set(`user:${id}`, JSON.stringify({name:users.name, age:users.age,id:users._id, role:users.role,email:users.email}))
            return users
        }
        return "User doesn't exist"
    }

    async deleteUser(userId:string)
    {
        const deletedUser = await this.Users.findByIdAndDelete(userId)
        if(deletedUser)
        {
            await client.del(`user:${userId}`)
            return deletedUser
        }
        return "User doesn't exist to be deleted"
    }

    async createUser(userData:UserDTO)
    {
        try
        {
            const hashpassword = await bcrypt.hash(userData.password, 10)
            const newUserData = {
                ...userData,
                password:hashpassword
            };

            const newUser = new this.Users(newUserData)
            await newUser.save()
            await this.sendEmail(newUser._id.toString(), newUser.email)
            return newUser;
        }
        catch(err)
        {
            console.log("Error: ",err)
            throw new InternalServerErrorException('Failed to create user');
        }
    }

    async updateUser(id:string, userData:Partial<User>)
    {
        const updatedUser = await this.Users.findByIdAndUpdate(id,userData)
        if (updatedUser)
        {
            await client.set(`user:${id}`,JSON.stringify({name:updatedUser.name, age:updatedUser.age,id:updatedUser._id, role:updatedUser.role,email:updatedUser.email}))
            return updatedUser;
        }
        return "User doesn't exist to be updated"
    }

    async sendEmail(userId:string, mail:string)
    {
        await this.emailQueue.add("WelcomeMail", {
            userId,mail
        });
    }
}
