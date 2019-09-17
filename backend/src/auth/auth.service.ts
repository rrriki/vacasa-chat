import {Injectable, Logger} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';

import {LoginAttemptDto} from './login-attempt.dto';
import {UserService} from '../user/user.service';
import {Configuration} from '../configuration';
import {JwtPayload} from '../../../typing/jwt-payload.interface';

const logger = new Logger('AuthService');

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    /**
     * This will be used when the user is initially logging in with their email and password
     * @param loginAttempt
     */
    async validateUserByPassword(loginAttempt: LoginAttemptDto) {
        const user = await this.userService.findUserByEmail(loginAttempt.email);

        if (!user) {
            return {message: 'User not found', data: null};
        }
        // Check the supplied password against the hash stored for this email address
        if (await user.isValidPassword(loginAttempt.password)) {
            return {message: 'Login successful', data: {token: this.signTokenForPayload(user)}};
        } else {
            return {message: 'Wrong password', data: null};
        }
    }

    /**
     * This will be used when the user has already logged in and has a JWT
     * @param payload
     */
    async validateUserByJwt(payload: JwtPayload) {
        const {email} = payload.user;
        return await this.userService.findUserByEmail(email);
    }

    /**
     * Add the user info to the payload, and sign it using the JwtService and JWT_SECRET
     * @param payload
     */
    signTokenForPayload(payload) {
        // TODO: Clean user object for client (remove password, sensitive info)
        const data: JwtPayload = {
            user: payload,
        };

        const expiresIn = Configuration.getJWTConfig().expiration;

        // Return signed JWT token.
        return this.jwtService.sign(data, {expiresIn});
    }
}
