import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

import { User } from './user.entity';
import { CredentialsDTO } from './dto/credentials.dto';
import { toUserDTO } from './mappers/mappers';
import { CreatedUserDTO } from './dto/createdUser.dto';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async findUserById(id: number) : Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async findByCredentials(credentials: CredentialsDTO) : Promise<User> {
        const { email, password } = credentials;

        const user = await this.userRepository.findOne(email);

        if (!user) {
            throw new HttpException('User not found', HttpStatus.UNAUTHORIZED); 
        }

        if (!await bcrypt.compare(user.password, password)) {
            throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED); 
        }

        return user;
    }   

    async createUser(user: User) : Promise<CreatedUserDTO> {
        if (!await this.userRepository.findOne(user.email)) {
            throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
        }

        const createdUser = await this.userRepository.save(user);
        
        return toUserDTO(createdUser);
    }

}
