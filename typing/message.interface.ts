import {User} from './user.interface';

export interface Message {
    date: Date
    user: User,
    message: string
}
