import * as express from 'express';
import { StockModel } from './stocks-model';

const router = express.Router();

router.get('/', (req, res) => {
  StockModel.find().exec((err, stocks) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(stocks);
    }
  });
});

router.post('/', (req, res) => {
  const stock = new StockModel(req.body);
  stock.validate((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      stock.save((err, result) => {
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
