function calculatePriceWithTwoDecimals(price) {
  return (Math.round(price * 100) / 100).toFixed(2);
}

function calculateTotal(price, quantity) {
  return (Math.round(quantity * price * 100) / 100).toFixed(2);
}

export { calculatePriceWithTwoDecimals, calculateTotal };
