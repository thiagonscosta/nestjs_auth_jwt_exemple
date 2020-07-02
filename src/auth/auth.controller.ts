import { Controller, Body, Post, Get, HttpException, HttpStatus, UsePipes, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

import { User } from '../users/user.entity';
import { CreatedUserDTO } from '../users/dto/createdUser.dto';
import { CredentialsDTO } from '../users/dto/credentials.dto';

@Controller('auth')
export class AuthController {
    
    constructor(private readonly authService: AuthService) {}

    @Post('sigup')
    public async signup(@Body() user: User) {
        return user;
    }

    @Post('signin')
    public async signin(@Body() credentials: CredentialsDTO) {
        return credentials;
    }

}
