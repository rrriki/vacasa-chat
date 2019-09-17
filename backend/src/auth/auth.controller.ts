import {Controller, Body, Post, Response, HttpStatus, HttpException} from '@nestjs/common';
import {ApiResponse, ApiUseTags} from '@nestjs/swagger';
import * as _ from 'lodash';
import {AuthService} from './auth.service';
import {LoginAttemptDto} from './login-attempt.dto';

@ApiUseTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post()
    @ApiResponse({status: HttpStatus.OK, description: 'User authenticated successfully'})
    @ApiResponse({status: HttpStatus.UNAUTHORIZED, description: 'Wrong credentials'})
    @ApiResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Error authenticating'})
    async login(@Response() res, @Body() loginAttempt: LoginAttemptDto) {
        try {
            const result = await this.authService.validateUserByPassword(loginAttempt);
            if (_.isNil(result.data)) {
                return res.status(HttpStatus.UNAUTHORIZED).json(result);
            }
            return res.status(HttpStatus.OK).json(result);

        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
