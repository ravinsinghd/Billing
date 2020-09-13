import * as express from 'express';
import { BillModel } from './bills-model';

const router = express.Router();

router.get('/', (req, res) => {
  BillModel.find().exec((err, bills) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(bills);
    }
  });
});

router.post('/', (req, res) => {
  const bill = new BillModel(req.body);
  bill.validate((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      bill.save((err, result) => {
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
