import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProductDocument, Products } from './products.schema';
import { Model } from 'mongoose';
import { createClient } from 'redis';
const client = createClient();
client.connect()

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
            const product = await client.get(`product:${id}`)
            if(product)
            {
                console.log("this is from redis server")
                return JSON.parse(product)
            }
            const products =  await this.Products.findById(id)
            if (products)
            {
                await client.set(`product:${id}`, JSON.stringify({name:products.name, price:products.price, description:products.description}))
                console.log("this is from the Db direct")
                return products
            }
            return "Product doesn't exist in our database"
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
            if(products) 
            {
                await client.del(`product:${id}`)
                return products
            }
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
            if(products)
            {
                await client.set(`user:${id}`,JSON.stringify({name:products.name,price:products.price,description:products.description}))
                return products
            }
            return "Product doesn't exits in database"
        }
        catch(err)
        {
            console.log("ERROR :",err)
            return err;
        }
    }
}
