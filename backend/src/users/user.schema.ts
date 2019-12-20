import {Logger} from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

import {User} from '../../../typing/user.interface';

const logger = new Logger('UserSchema');

export const UserSchema = new mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    profilePhoto: {type: String, required: true}
}, {versionKey: false});

// Hash password with bcrypt before saving
UserSchema.pre<User>('save', async function (next) {
    const user = this;

    // Check if the password is being changed, so we don't re-hash
    if (!user.isModified('password')) {
        return next();
    }

    try {
        // Generate a salt (Additional random string to pre-append)
        const salt = await bcrypt.genSalt();
        // Re-assign the password hashed with the salt
        user.password = await bcrypt.hash(user.password, salt);
        return next();
    } catch (e) {
        logger.error(e);
        return next(e);
    }
});

// Additional method to validate the entered password against the stored hash
UserSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (e) {
        logger.error(e.message);
        throw e;
    }
};
