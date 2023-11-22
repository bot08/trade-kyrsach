function generateRandomData(length) {
  const data = [];
  let price = 100; // Початкова ціна
  for (let i = 0; i < length; i++) {
    const priceChange = Math.random() * 10 - 5; // Зміна ціни на випадкову величину
    price += priceChange;
    data.push(price);
  }
  return data;
}

export { generateRandomData }