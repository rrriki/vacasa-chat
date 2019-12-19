import * as path from "path";
import * as fs from "fs";

export class Configuration {

    static getHttpServerConfig() {
        return {
            port: +process.env.PORT,
        };
    }

    static getJWTConfig() {
        return {
            secret: process.env.JWT_SECRET,
            expiration: 3600,
        };
    }

    static getMongoConfig() {
        return {
            uri: process.env.MONGO_URI,
            options: {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            },
        };
    }

    static getUploadDirectory() {
        const uploadPath = path.resolve('./', 'uploads');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath);
        }
        return uploadPath;
    }
}
