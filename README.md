# Vacasa Chat

  
  This is a simple chat, built for [Vacasa](https://www.vacasa.com/)'s Lunch & Learn, and MeetUps,  as proof of concept to teach the concepts of building Node.js backend applications using [Nestjs](https://nestjs.com/).
  
It uses [Angular](https://angular.io/) for the frontend, and implements websocket for real time messaging.

![Vacasa Chat](https://i.imgur.com/Zoa6u60.png)

## Usage

Clone or download the repo and install the dependencies.
  
```sh
$ git clone https://github.com/rrriki/vacasa-chat
  
$ cd vacasa-chat

$ npm install --prefix ./frontend
$ npm install --prefix ./backend

```

  You will need to set up the environment variables, the easiest way to do this, is to create a `.env` file in the backend's root directory with the following variables:
```sh
# SERVER
    
PORT=8080
    
JWT_SECRET=yoursecret

# MONGO

MONGO_URI=mongodb://mongourl/
```

Make sure your frontend environment variables match this set-up.

Finally, start both apps, running `npm start` inside each folder (backend & frontend)   

## License 

- MIT
