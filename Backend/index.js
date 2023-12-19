const express = require('express');
const User = require('./db');
const app = express();
const completePayment = require('./completePayment');
const cors = require('cors');

app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      console.error(`Error fetching users: ${error}`);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

app.get('/userBalance', async (req, res) => {
  try {
    const email = req.query.email;
    const query = {email : email}
    console.log(email);

    // Perform your logic with the email parameter
    const user = await User.find(query)
    console.log(user)
    res.status(200).json({ success: true, user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

app.post('/userValidation', async(req, res) => {
  const {email, password} = req.body
  const query = {email : email, password : password}
  try {
    const user = await User.find(query);
    if(user == 0) res.status(500).json({ status: 'error', message: "user did not find" });
    else res.status(200).json({ status: 'success', message: 'User Found' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: "user did not find" });
  }
})

app.post('/userData', async (req, res) => {
  const userData = req.body;
  console.log(req.body);
  const { name, email, password, age, batch } = req.body;
  const newUser = new User({
    name: name,
    email: email,
    password: password,
    age: age,
    batch: batch,
    createdAt: new Date(),
  });

    newUser
      .save()
      .then(() => {
        res.status(200).json({ status: 'success', message: 'You have been registered' });
      })
      .catch((error) => {
        res.status(500).json({ status: 'error', message: 'User already exists' });
      });
  
});

app.put('/userBalance', async(req, res) => {
  const email = req.body.email;
  try {
    const filter = { email: email };
    const update = { $set: { due: 0 } };
    const paymentResponse = await completePayment();
    console.log('Updating user balance for email:', email);

    if(paymentResponse.success) {
      const result = await User.updateOne(filter, update);
      res.status(200).json({ success: true, message: 'User balance updated successfully' });
    }
    else {
      res.status(400).json({ success: false, message: 'Error' });
    }
    
  } catch (error) {
    console.error('Error updating user balance:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 5500;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
