function calculateSMA(data, period) {
  const smaValues = [];
  for (let i = period - 1; i < data.length; i++) {
    const sum = data.slice(i - period + 1, i + 1).reduce((acc, val) => acc + val, 0);
    smaValues.push(sum / period);
  }
  return smaValues;
}

function calculateEMA(data, period) {
  const emaValues = [data[0]];

  const multiplier = 2 / (period + 1);

  for (let i = 1; i < data.length; i++) {
    const ema = (data[i] - emaValues[i - 1]) * multiplier + emaValues[i - 1];
    emaValues.push(ema);
  }

  return emaValues;
}

function calculateRSI(data, period) {
  const rsiValues = [];

  for (let i = 1; i < data.length; i++) {
    const gain = Math.max(0, data[i] - data[i - 1]);
    const loss = Math.max(0, data[i - 1] - data[i]);

    const avgGain = (rsiValues[i - 1] ? (rsiValues[i - 1].avgGain * (period - 1) + gain) : gain) / period;
    const avgLoss = (rsiValues[i - 1] ? (rsiValues[i - 1].avgLoss * (period - 1) + loss) : loss) / period;

    const rs = avgGain / avgLoss;
    const rsi = 100 - (100 / (1 + rs));

    rsiValues.push({ rsi, avgGain, avgLoss });
  }

  return rsiValues;
}

export { calculateEMA, calculateRSI, calculateSMA }