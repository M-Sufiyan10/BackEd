import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Products } from './products.schema';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RolesGuard } from 'src/guards/auth/roles.guard';
import { Roles } from 'src/guards/auth/roles.decorator';

@Controller('products')
export class ProductsController {


    constructor( private readonly productService:ProductsService){}

    @Get()
    async getProducts()
    {
        return this.productService.getProducts()
    }

    @Get(":id")
    async getProductsbyId(@Param("id") id:string)
    {
        return this.productService.getProductsbyId(id)
    }
    @UseGuards(AuthGuard,RolesGuard)
    @Roles("superadmin", "admin")
    @Post()
    async createProduct(@Body() userData:Products)
    {
        console.log("User Data: ",userData)
        return this.productService.createProducts(userData)
    }

    @Delete(":id")
    @UseGuards(AuthGuard,RolesGuard)
    @Roles("superadmin", "admin")
    async deleteProduct(@Param("id") id:string)
    {
        return this.productService.deleteProduct(id)
    }

    @Patch(":id")
    @UseGuards(AuthGuard,RolesGuard)
    @Roles("superadmin", "admin")
    async updateProduct(@Param("id") id:string, @Body() userData:Partial<Products>)
    {
        return this.productService.updateProduct(id,userData);
    }
}
