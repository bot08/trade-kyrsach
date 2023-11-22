import { useState, useEffect } from 'react'
import { generateRandomData } from './modules/generateRandomData'
import { calculateEMA, calculateRSI, calculateSMA } from './modules/calcData'
import { makeRecommendation } from './modules/analizeData'

function App() {
  const [period, setPeriod] = useState(20)
  const [data, setData] = useState(generateRandomData(period));
  const [res, setRes] = useState(makeRecommendation(calculateSMA(data, period), calculateEMA(data, period), calculateRSI(data, period)));
  
  useEffect(() => {
    setRes(makeRecommendation(calculateSMA(data, period), calculateEMA(data, period), calculateRSI(data, period)))
  }, [data, period]);

  const handlePeriodChange = (e) => {
    setPeriod(parseInt(e.target.value > 0 ? e.target.value : 2, 10));
  };

  return (
    <>
      <div className="px-3 py-2 mb-4 md:mb-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-black text-3xl font-bold mb-3">Інтелектуальний модуль управління трейдинговою діяльністю на фондовому ринку</h1>
        <p className='text-black text-lg font-normal mb-2'>Згенеровані дані:</p>
        <div className='py-4 px-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
          { data }
        </div>
        <label className="block text-black text-lg font-normal my-2">
          Введіть період:
          <input
            type="number" min={2} max={9999} value={period} onChange={handlePeriodChange}
            className="px-3 py-1 ml-2 rounded-md border border-white focus:outline-none focus:ring focus:border-indigo-600"
          />
        </label>
        <button onClick={() => setData(generateRandomData(period))} className='px-3 py-2 my-1 text-base text-white bg-indigo-600 rounded-xl'>
          Згенерувати нові дані
        </button>
      </div>

      <div className="px-3 py-2 mb-4 md:mb-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-black text-3xl font-bold mb-3">Результат аналізу</h1>
        <p className='text-black text-lg font-normal mb-4'>
          Рекомендація: 
          {
            res == "Купувати" ? 
              <span className='ml-2 text-green-600 text-xl font-semibold'>{ res }</span>
              : 
              ( res == "Продавати" ? 
                <span className='ml-2 text-red-600 text-xl font-semibold'>{ res }</span>
                : <span className='ml-2 text-black text-xl font-semibold'>{ res }</span>
              )
          }
        </p>
        <p className='text-black text-xl font-semibold mb-2'>
          Детальні розрахунки: 
        </p>
        {/* SMA */}
        <p className='text-black text-lg font-normal mb-2'>SMA:</p>
        <div className='py-4 px-2 mb-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
          { calculateEMA(data, period) }
        </div>
        {/* EMA */}
        <p className='text-black text-lg font-normal mb-2'>EMA:</p>
        <div className='py-4 px-2 mb-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
          { calculateSMA(data, period) }
        </div>
        {/* RSI & others */}
        <p className='text-black text-lg font-normal mb-2'>RSI + avgGain & avgLoss:</p>
        <div className='py-4 px-2 mb-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
          { calculateRSI(data, period).map(item => item.rsi).join(', ') }
        </div>
        <div className='py-4 px-2 mb-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
          { calculateRSI(data, period).map(item => item.avgGain).join(', ') }
        </div>
        <div className='py-4 px-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
          { calculateRSI(data, period).map(item => item.avgLoss).join(', ') }
        </div>
      </div>
    </>
  );
}

export default App;