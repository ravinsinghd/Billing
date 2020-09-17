import * as express from 'express';
import { CustomerModel } from './customers.model';

const router = express.Router();

router.get('/', (req, res) => {
  CustomerModel.find().exec((err, customers) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(customers);
    }
  });
});

router.post('/search', (req, res) => {
  const customerSearch = req.body;
  CustomerModel.find({
    mobileNumber: { $regex: customerSearch.mobileNumber, $options: 'i' },
  }).exec((err, customers) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(customers);
    }
  });
});

router.post('/', (req, res) => {
  const customer = new CustomerModel(req.body);
  customer.validate((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      customer.save((err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(result);
        }
      });
    }
  });
});

module.exports = router;
