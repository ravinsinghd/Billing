import * as express from 'express';
import { ProductModel } from '../models/products-model';

const router = express.Router();

router.get('/', (req, res) => {});

router.post('/', (req, res) => {
  const product = new ProductModel(req.body);
  product.validate((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      product.save((err, result) => {
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
