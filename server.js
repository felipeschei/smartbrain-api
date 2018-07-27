const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express ();

const knex = require('knex')({
    client: 'pg',
    connection: {
    connectionString : process.env.DATABASE_URL,
    ssl: true,
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send('Server up and running!')});

app.get('/profile/:id', profile.getProfile(knex));

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, knex, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)});

app.put('/image', image.putImage(knex));

app.post('/imageurl', image.handleApiCall());

app.listen(process.env.PORT || 3000, () => {
    console.log(`pp is running on port ${process.env.PORT}`);
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/