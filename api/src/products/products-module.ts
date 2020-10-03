import * as express from 'express';
import { ProductModel } from './products-model';

const router = express.Router();

router.delete('/:productId', (req, res) => {
  const params = req.params;
  ProductModel.findByIdAndDelete(params.productId, (err, result) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(result);
    }
  });
});

router.get('/', (req, res) => {
  ProductModel.find().exec((err, products) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.status(200).json(products);
    }
  });
});

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

router.post('/update', (req, res) => {
  const product = new ProductModel(req.body);
  product.validate((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      ProductModel.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, result) => {
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
