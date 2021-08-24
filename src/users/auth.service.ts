import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) { }
  
  public async signUp(email: string, password: string) {
    const foundEmail = await this.userService.find(email)

    if (foundEmail.length) {
      throw new BadRequestException('Email already in use!')
    }
    // generate salt
    const salt = randomBytes(8).toString('hex')
    // hash the salt and the password together
    const hash = await scrypt(password, salt, 32) as Buffer
    // join hashed result and the salt together
    const result = salt + '.' + hash.toString('hex')
    // Create a new user and save it
    const user = await this.userService.create(email, result)
    // return the user
    return user
  }
  
  public async signIn(email: string, password: string) {
    const [user] = await this.userService.find(email)
    if (!user) {
      throw new NotFoundException('User not found')
    }

    const [salt, storedHash] = user.password.split('.')

    const hash = (await scrypt(password, salt, 32)) as Buffer

    if (storedHash !== hash.toString('hex')) {
      throw new BadRequestException('Invalid credentials')
    }
    return user

  }
}