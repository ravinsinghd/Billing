const express = require('express');
const cors = require('cors');
import * as mongoose from 'mongoose';

const productsModule = require('./products/products-module');
const stockModule = require('./stocks/stocks-module');
const billModule = require('./bills/bills-module');
const customerModule = require('./customers/customers.module');

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use('/products', productsModule);
app.use('/stocks', stockModule);
app.use('/bills', billModule);
app.use('/customers', customerModule);

function connectToDB() {
  mongoose.connect('mongodb://localhost:27017/billing', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('DB connected');
  });
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  connectToDB();
});
