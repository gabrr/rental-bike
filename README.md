# Biker App

### Description
Rental Bike app, with two folders — web (client) a React JS written in Typescript and node js server using MongoDB as database.

### Tech Stach
- React JS
- Typescript
- Atomic Design (folder structure for the React app).
- Styled Component
- Redux
- MongoDB
- Mongoose
- Jest 
- Express JS
- Joi
- JWT
- Multer
- Bcrypt

App features a simple and light design, image upload and smooth animations.

**It has known problems that it won't be possible to be fixed or improved within the timeline.**

**Problems:**
- The dropfile is firing an event.
- The filter menu should close on the blur event.
- I left to think about the "cause" that would make a bike unavailable, since it will actually be unavailable only during the reservations period. One possibility would be to leave fo the admin but time is up!

# Starting the Project
`git clone https://git.toptal.com/screening/Gabriel-Oliveira-2/`

Now, you will want to create .env file for the two folders — web and server.

**server:**
```
NODE_ENV=dev
PORT=8000
JWT_SECRET=j9e996c9279ec9279ecbfi76eaeg429cbfi76eaeg429j9e996
```
**web:**
```
REACT_APP_API=http://localhost:8000/api
```

After cloning the project, we can run commands to enter in server folder, install packages, mongo db is included as well.

`cd server && yarn && yarn dev`

We can do the same for the web folder

`cd ../web && yarn && yarn start`

# Good to know


1. *When you signup the first user, another admin user will be created — your first user should not use admin credentials.*

**email:** admin@admin.com
**password:** admin123

2. *There are assets in the src folder in the client app, we can upload them when creating a bike.*

3. *There is a postman archive with all apis configured*





