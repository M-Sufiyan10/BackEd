import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from './user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { BullModule } from '@nestjs/bull';
import { EmailProcessor } from './email.processor';

@Module({
    providers: [UserService, EmailProcessor],
    controllers: [UsersController],
    imports:[
      MongooseModule.forFeature([{name:User.name, schema:UserSchema}]),
      BullModule.registerQueue({
        name: 'email',
      }),
    ],
    exports: [
      MongooseModule,
    ],
  })
export class UsersModule {}
