const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express ();

const knex = require('knex')({
    client: 'pg',
    connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Ex4lienioingenio_',
    database : 'smartbrain'
  }
});

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

app.use(cors());
app.use(bodyParser.json());

app.get('/profile/:id', profile.getProfile(knex));

app.post('/signin', (req, res) => {signin.handleSignIn(req, res, knex, bcrypt)});

app.post('/register', (req, res) => {register.handleRegister(req, res, knex, bcrypt)});

app.put('/image', image.putImage(knex));

app.post('/imageurl', image.handleApiCall());

app.listen(3000, () => {
    console.log('app is running on port 3000');
});

/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT --> user 
*/