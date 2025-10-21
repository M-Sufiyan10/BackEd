import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IsIn, IsInt, IsString } from "class-validator";
import { Document } from "mongoose";

export type ProductDocument = Document & Products

@Schema({timestamps:true})
export class Products
{
    @IsString()
    @Prop({required:true})
    name:string

    @IsInt()
    @Prop({required:true})
    price:number
    
    @IsString()
    @Prop()
    description:string
}

export const ProductsSchema= SchemaFactory.createForClass(Products)