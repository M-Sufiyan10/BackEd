import { IsEmail, IsString } from "class-validator";

export class authDTO{
    @IsEmail()
    email:string;

    @IsString()
    password:string
}