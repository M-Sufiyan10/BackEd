import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, Products } from './products.schema';
import { Model } from 'mongoose';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/auth/roles.guard';
import { Roles } from 'src/guards/auth/roles.decorator';


@Injectable()
export class ProductsService {
    constructor(@InjectModel(Products.name) private Products:Model<ProductDocument>){}

    async getProducts()
    {
        try
        {
            const products =  await this.Products.find()
            return products
        }
        catch(err)
        {
            console.log("ERROR :",err)
            return err;
        }
        
    }


    async getProductsbyId(id:string)
    {
        try
        {
            const products =  await this.Products.findById(id)
            return products
        }
        catch(err)
        {
            console.log("ERROR :",err)
            return err;
        }
        
    }

    
    async createProducts(productData:Products)
    {
        try
        {
            const newProduct = new this.Products(productData)
            await newProduct.save()
            return newProduct;
        }
        catch(err)
        {
            console.log("ERROR :",err)
            return err;
        }
        
    }


    async deleteProduct(id:string)
    {
        try
        {
            const products =  await this.Products.findByIdAndDelete(id)
            if(products) return products
            return "Product doesn't exist to be deleted"
        }
        catch(err)
        {
            console.log("ERROR :",err)
            return err;
        }
    }

    async updateProduct(id:string, userData:Partial<Products>)
    {
        try
        {
            const products =  await this.Products.findByIdAndUpdate(id, userData)
            return products
        }
        catch(err)
        {
            console.log("ERROR :",err)
            return err;
        }
    }
}
