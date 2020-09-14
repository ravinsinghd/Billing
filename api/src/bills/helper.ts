import { Bill } from './bills-model';

export function updateBillData(bill: Bill) {
  const total = bill.items.reduce((collection, item) => {
    collection = collection + item.totalPrice;
    return collection;
  }, 0);

  bill.billNumber = 100;
  bill.customerId = '100';
  bill.totalAmount = total;
  bill.roundedAmount = Math.floor(total);
  return bill;
}
