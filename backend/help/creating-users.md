# Creating Users
In this workshop, we're implementing a controller route to handle user creation, and file uploads.

 **1. Change your current branch** to `feature/creating-users` where this functionality has been removed, to code along.

```sh
git checkout feature/creating-users
```
 **2. Change your working directory** to the backend folder
```sh
cd backend
```

 **3. Add the Mongoose import to User Module** 
Open the *users/user.module.ts* file and add an Import for the MongooseModule, passing the given UserSchema.

This allows services within the module to connect to MongoDB and use the Model for Users.

```ts
// user.module.ts
import {MongooseModule} from '@nestjs/mongoose';  
import {UserSchema} from './user.schema';  
  
@Module({  
    imports: [  
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),  
  ],
```

**4. Inject the UserModel in the user service** 
Open the *users/user.service.ts* file and inject the model in the constructor of the class
```ts
// user.service.ts
@Injectable()  
export class UserService {  
    constructor(@InjectModel('User') private userModel: Model<User>) {}
```


**5. Create a method in the service to handle the creation of the User on the database**
This method should receive an object fulfilling the CreateUserDto type. and a Photo file that we'll use for the profile picture.
```ts
// user.service.ts
async createUser(user: CreateUserDto, photo: any): Promise<User> {  
    const newUser = await new this.userModel({...user, profilePhoto: photo.filename});  
    return newUser.save();  
  
}
```

**6. Create an endpoint on the controller to handle POST requests for users**
Using the `@Post` decorator, we can declare a new endpoint the receives a body with the type of CreateUserDto. 
```ts
// user.controller.ts
@Controller('users')  
export class UserController {  
    constructor(private userService: UserService) { }  
    
    @Post()  
    async createUser(@Response() res, @Body() user: CreateUserDto) {  
        try {  
          logger.log('Here we will call the method from user.service');  
	} catch (e) {  
            throw new HttpException(e.message, e.code);  
	}  
    }
```

**7. Add handle file uploads for profile photos on the Controller**
Multer is a popular library that handles file uploads on Node.js, We can add import it in the UserModule and configure it to leave our files with certain names and on a certain destination directory.

```ts
// user.moodule.ts
imports: [  
  MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),  
  // Multer is pretty cool
  MulterModule.register({  
     storage: multer.diskStorage({  
          destination: (req, file, cb) => {
	     cb(null, Configuration.getUploadDirectory());
          },  
	  filename: (req, file, cb) => {  
              cb(null, `${Date.now()}_${file.originalname}`);  
	  },  
     }),  
  }),  
],
```

Now we can use the `@UseInterceptors` decorator on the controller to extract the profilePhoto field from the request body. And the `@UploadedFile` decorator will hand it to use on a variable we can use.

```ts
@Post()  
@UseInterceptors(FileInterceptor('profilePhoto'))  
async createUser(@Response() res, @Body() user: CreateUserDto, @UploadedFile() profilePhoto) {  
    try {  
      const newUser = await this.userService.createUser(user, profilePhoto);  
      return res.status(HttpStatus.OK).json(newUser);  
  } catch (e) {  
      throw new HttpException(e.message, e.code);  
  }  
}

```
