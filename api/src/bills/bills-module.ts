import * as express from 'express';
var moment = require('moment');

import { StockModel } from '../stocks/stocks-model';
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

router.get('/raw/:billDate', (req, res) => {
  const params = req.params;
  const after = moment(params.billDate).startOf('day');
  const before = moment(params.billDate).endOf('day');

  BillModel.find({
    createdDate: {
      $gte: after,
      $lt: before,
    },
  }).exec((err, bills) => {
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
  updatedBill.createdDate = new Date();
  updatedBill.modifiedDate = new Date();
  updatedBill.validate((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      updatedBill.save((err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          bill.items.forEach((item) => {
            StockModel.findOne({ productId: item.productId }).exec((err, stock) => {
              if (stock) {
                stock.quantity = stock.quantity - item.quantity;
                StockModel.updateOne({ productId: item.productId }, stock, (err, result) => {});
              }
            });
          });
          res.status(200).json(result);
        }
      });
    }
  });
});

module.exports = router;
