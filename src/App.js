import { useState, useEffect } from 'react'
import { generateRandomData } from './modules/generateRandomData'
import { calculateEMA, calculateRSI, calculateSMA } from './modules/calcData'
import { makeRecommendation } from './modules/analizeData'

function App() {
  const [period, setPeriod] = useState(14);
  const [userData, setUserData] = useState([100, 102, 98, 105, 103, 107, 110, 108, 112, 115, 120, 118, 122, 125]);
  const [data, setData] = useState(userData);
  const [res, setRes] = useState(makeRecommendation(calculateSMA(data, period), calculateEMA(data, period), calculateRSI(data, period)));

  const handlePeriodChange = (e) => {
    setPeriod(parseInt(e.target.value > 0 ? e.target.value : 2, 10));
  };

  const handleUserDataChange = (e) => {
    setUserData(e.target.value.split(','))
  };

  useEffect(() => {
    setRes(makeRecommendation(calculateSMA(data, period), calculateEMA(data, period), calculateRSI(data, period)))
  }, [data, period]);

  useEffect(() => {
    if (userData.every((value) => !isNaN(value)) && userData.length > 2) {
      setData(
        userData
        .map((value) => parseFloat(value))
        .filter((value) => !isNaN(value))
      );
    }
  }, [userData]);

  return (
    <>
      <div className="px-3 py-2 mb-4 md:mb-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-black text-3xl font-bold mb-3">Інтелектуальний модуль управління трейдинговою діяльністю на фондовому ринку</h1>
        <p className='text-black text-lg font-normal mb-2'>Отримані дані (дебаг):</p>
        <div className='py-4 px-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
          { data }
        </div>
        <label className="block my-2 text-black text-lg font-normal">
          Редактор даних (через кому):
          <textarea
            type="float" min={0} value={userData} onChange={handleUserDataChange}
            className="block px-3 py-1 mt-1 h-full w-full rounded-md border border-white focus:outline-none focus:ring focus:border-indigo-600"
          />
        </label>
        <label className="block my-2 text-black text-lg font-normal">
          Введіть період:
          <input
            type="number" inputmode="numeric" pattern="[0-9]*" min={2} max={9999} value={period} onChange={handlePeriodChange}
            className="px-3 py-1 ml-2 rounded-md border border-white focus:outline-none focus:ring focus:border-indigo-600"
          />
        </label>
        <button onClick={() => setUserData(generateRandomData(period))} className='px-3 py-2 my-1 text-base text-white bg-indigo-600 rounded-xl'>
          Згенерувати випадкові дані
        </button>
      </div>

      <div className="px-3 py-2 mb-4 md:mb-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-black text-3xl font-bold mb-3">Результат аналізу</h1>
        {
          data.length >= period ?
          <>
            <p className='text-black text-lg font-normal mb-4'>
              Рекомендація: 
              {
                res == "Купувати" ? // eslint-disable-line eqeqeq
                  <span className='ml-2 text-green-600 text-xl font-semibold'>{ res }</span>
                  : 
                  ( res == "Продавати" ? // eslint-disable-line eqeqeq
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
              { calculateSMA(data, period) }
            </div>
            {/* EMA */}
            <p className='text-black text-lg font-normal mb-2'>EMA:</p>
            <div className='py-4 px-2 mb-2 bg-gray-100 overflow-x-scroll whitespace-nowrap rounded-xl'>
              { calculateEMA(data, period) }
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
          </>
          :
          <>
            <p className='mb-3 text-red-600 text-xl font-semibold'>Невірні дані</p>
            <button onClick={() => setPeriod(data.length)} className='px-3 py-2 my-1 text-base text-white bg-indigo-600 rounded-xl'>
              Встановити правильний період
            </button>
          </>
        }
      </div>
    </>
  );
}

export default App;