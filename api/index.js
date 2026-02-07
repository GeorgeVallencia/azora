const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = process.env.JWT_SECRET;


// const storeItems = new Map(
//   [ 1, { priceInCents: 499, name: 'Become a member (Annual Plan)' } ]
//   )

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin:'http://localhost:5173'
}));

mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) => {
  res.json('test okay');
});

app.post('/register', async (req, res) => {
  const {name, email, password} = req.body;

 const userDetails = await User.create({
    name,
    email,
    password:bcrypt.hashSync(password, bcryptSalt)
  });
  console.log(userDetails);
  res.json(userDetails);
});

app.post('/login', async(req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({email});

  if(userDoc){
    const passwordOkay = bcrypt.compareSync(password, userDoc.password);
    if(passwordOkay) {
      jwt.sign({ 
        email: userDoc.email, 
        id:userDoc._id, 
        name: userDoc.name 
      }, jwtSecret, {}, (err, token) => {
        if(err) throw err;
        res.cookie('token', token).json(userDoc); 
      });
    } else {
      res.json('password not okay');
    }
    
  }
});

app.get('/profile', (req, res) => {
  const {token} = req.cookies; 
  
  if(!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, jwtSecret, {}, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
  res.json(user);
  
});
});


app.post('/payment', async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: req.body.items.map(item => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Product ${item.id}`, // Replace with real product details
          },
          unit_amount: 1000, // Replace with real prices (in cents)
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

app.listen(4000);