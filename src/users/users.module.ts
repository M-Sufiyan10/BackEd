import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    providers: [UserService],
    controllers: [UsersController],
    imports:[MongooseModule.forFeature([{name:User.name, schema:UserSchema}])],
    exports: [
      MongooseModule,
    ],
  })
export class UsersModule {}
