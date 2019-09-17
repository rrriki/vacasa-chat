import {User} from './user.interface';

export interface JwtPayload {
    user: Partial<User>;
}
