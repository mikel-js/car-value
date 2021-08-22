import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  // To use generic Repo<User> we need to inject it first. Memorize the syntax
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  public create(email: string, password: string) {
    const user = this.repo.create({ email, password });

    return this.repo.save(user);
  }

  public async findOne(id: number) {
    const user = await this.repo.findOne(id); // return 1 record or null
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public find(email: string) {
    return this.repo.find({ email }); //returns an array or []
  }

  public async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);

    Object.assign(user, attrs);
    return this.repo.save(user);
  }

  public async remove(id: number) {
    const user = await this.findOne(id);

    return this.repo.remove(user);
  }
}
