import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // This will create the user repo and is used to find, update, delete,create user
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
