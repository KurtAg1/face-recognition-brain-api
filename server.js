const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true
  }
});

const app = express();

app.use(cors())
app.use(bodyParser.json());

// ROUTES
app.get('/', (req, res) => { res.send('It is working!')}); //database.users) });
app.post('/signin', signin.handleSignin(db, bcrypt)); // req / res are called from the function
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)});
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> {
  console.log(`app is running on port ${PORT}`);
})
