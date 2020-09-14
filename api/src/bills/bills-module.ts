import * as express from 'express';
import { BillModel } from './bills-model';
import { updateBillData } from './helper';

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

router.get('/:billId', (req, res) => {
  const params = req.params;
  BillModel.findById(params.billId).exec((err, bill) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(bill);
    }
  });
});

router.post('/', (req, res) => {
  const bill = new BillModel(req.body);
  const updatedBill = updateBillData(bill);
  updatedBill.validate((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      updatedBill.save((err, result) => {
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
