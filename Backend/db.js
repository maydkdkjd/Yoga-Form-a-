const mongoose = require('mongoose');

const password = 'MayAli80';
const dbName = 'test';
const url = `mongodb+srv://mayankjbpgupta6001:${password}@cluster0.jsdasxm.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
  batch: {
    type: String,
    required: true,
  },
  due: {
    type: Number,
    required: true,
    default: 500
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

const init = async () => {
  try {
    await mongoose.connect(url, connectionParams);
    await User.collection.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 2592000 });

  } catch (error) {
    console.error(`Error connecting to the database. \n${error}`);
  }
};

init();
module.exports = User;
