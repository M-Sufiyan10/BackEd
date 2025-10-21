import { IsEmail ,IsInt, IsString } from "class-validator";

export class UserDTO 
{
    @IsString()
    name:string

    @IsEmail()
    email:String

    @IsString()
    password:string

    @IsInt()
    age:number

    @IsString()
    gender:string


    @IsString()
    role:string
    
}