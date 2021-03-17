function getStock(stock) {
  if (stock === 0) return 'Out of stock';
  if (stock <= 10) return 'Critical stock';
  if (stock > 10 && stock <= 50) return 'Low stock';
  return 'In stock';
}

export { getStock };
