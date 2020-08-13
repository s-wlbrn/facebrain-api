const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex')
const dotenv = require('dotenv');
const result = dotenv.config()
  if (result.error) {
    throw result.error
  }

//Require endpoints
const signin = require('./controllers/signin');
const register = require('./controllers/register');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client:'pg',
  connection: {
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASS,
    database : 'face-brain'
  }
});

const app = express();

app.use(express.json());
app.use(cors());

app.post('/signin', signin.signIn(db, bcrypt));
app.post('/register', register.registerUser(db, bcrypt));
app.get('/profile/:id', profile.getUserFromId(db));
app.put('/image', image.updateEntries(db));
app.post('/imageurl', image.handleApiCall);

app.listen(3000, () => {
  console.log('App is running on port 3000.')
});