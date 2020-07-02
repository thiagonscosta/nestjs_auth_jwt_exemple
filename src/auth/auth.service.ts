import { Injectable, UnauthorizedException, HttpException, HttpStatus} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

import { CredentialsDTO} from '../users/dto/credentials.dto';
import { CreatedUserDTO } from '../users/dto/createdUser.dto';
import { LoggedUserDTO } from '../users/dto/loggedUser.dto';
import { toLoggedUserDTO } from '../users/mappers/mappers';

@Injectable()
export class AuthService {
    
    constructor(private usersService: UsersService, private jwtService: JwtService,) {}

    async signIn(credentials: CredentialsDTO): Promise<LoggedUserDTO>{
        const user = await this.usersService.findByCredentials(credentials);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const _id = user.id.toString();

        const token = await this.jwtService.sign(_id);

        return toLoggedUserDTO(user, token);
    }

    async signUp(user: User): Promise<CreatedUserDTO>{
        return await this.usersService.createUser(user);
    }

    async validateUser(id) : Promise<User> {
        const user = await this.usersService.findUserById(id);
        if (!user) {
            throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

    // createToken() {

    // }
}
