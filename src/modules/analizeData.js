// Функція для надання рекомендації
function makeRecommendation(sma, ema, rsi) {
  const lastSMA = sma[sma.length - 1];
  const lastEMA = ema[ema.length - 1];
  const lastRSI = rsi[rsi.length - 1].rsi;

  if (lastSMA > lastEMA && lastRSI < 30) {
    return "Купувати";
  } else if (lastSMA < lastEMA && lastRSI > 70) {
    return "Продавати";
  } else {
    return "Зберігати поточну позицію";
  }
}


export { makeRecommendation }