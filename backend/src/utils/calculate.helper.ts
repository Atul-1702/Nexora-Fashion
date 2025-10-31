export default function calculateTotalAmount(product: any) {
  let totalAmount = 0;
  for (let p of product) {
    totalAmount += p.quantity * p.id.price;
  }
  return totalAmount;
}
