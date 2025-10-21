import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config"
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [UsersModule, ProductsModule,  ConfigModule.forRoot(), MongooseModule.forRoot(process.env.MONGO_URI!), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
