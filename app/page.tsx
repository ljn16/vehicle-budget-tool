'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  // Form state variables
  const [carPrice, setCarPrice] = useState(30000);
  const [accessories, setAccessories] = useState(5000);
  const [serviceContract, setServiceContract] = useState(false);
  const [gap, setGap] = useState(false);
  const [cashDown, setCashDown] = useState(2000);
  const [tradeIn, setTradeIn] = useState(0);
  const paymentType = 'finance';

  const [sliderMax, setSliderMax] = useState(5000);
  const [tradeSliderMax, setTradeSliderMax] = useState(20000);
  const [showTradeSliderAdjust, setShowTradeSliderAdjust] = useState(false);
  const term = 60; // Default term for finance
  const [budget, setBudget] = useState(500);

  // Default tax rates for finance and lease
  const financeTaxRate = 6.875;

  // Table options for finance calculations
  const tableCashDownOptions = [Math.max(0, cashDown - 2000), cashDown, cashDown + 2000];
  const tableTermOptions = [36, 48, 60, 72, 84];

  // Parse input values and calculate base total
  const priceVal = carPrice || 0;
  const accVal = accessories || 0;
  const tradeInVal = tradeIn || 0;
  const svcVal = serviceContract ? 2500 : 0;
  const gapVal = gap ? 1000 : 0;
  const baseTotal = priceVal + accVal + svcVal + gapVal;

  // Calculate monthly payment based on inputs
  const calculateMonthlyPayment = () => {
  };

  const [showSliderAdjust, setShowSliderAdjust] = useState(false);
  const [termAPRs, setTermAPRs] = useState<{ [term: number]: number }>({
    36: 3.5,
    48: 4.0,
    60: 4.5,
    72: 5.0,
    84: 5.5,
  });
  const [selectedCalc, setSelectedCalc] = useState<{
    cashDownOption: number;
    termOption: number;
    apr: number;
    financeTaxRate: number;
    baseTotal: number;
    adjustedTotal: number;
    monthlyPayment: number;
  } | null>(null);

  useEffect(() => {
    calculateMonthlyPayment();
  }, [carPrice, accessories, serviceContract, gap, cashDown, tradeIn, paymentType, term]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='flex w-full justify-center font-bold text-3xl'>Payment Calculator</h1>
      <p className='text-center text-gray-700 mb-4'>Created by Logan Nelsen</p>

 
      <form className=''>
        <div className='bg-gray-200 p-4 rounded-lg shadow-md mb-4 text-black'>

          
          <div className='border border-white p-4 rounded-lg shadow-md mb-4 w-fit'>
            <div className='flex space-x-10'>
              <div style={{ marginBottom: '1rem' }}>
                <label>Car Price: </label>
                <input
                  type="range"
                  style={{ cursor: 'pointer' }}
                  min={0}
                  max={60000}
                  step={200}
                  value={carPrice ? Number(carPrice) : 30000}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  required
                />
                <span> ${carPrice ? Number(carPrice).toLocaleString() : (30000).toLocaleString()}</span>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label>Accessories: </label>
                <input
                  type="range"
                  style={{ cursor: 'pointer' }}
                  min="0"
                  max="5000"
                  step="100"
                  value={accessories ? Number(accessories) : 0}
                  onChange={(e) => setAccessories(Number(e.target.value))}
                />
                <span> ${accessories ? Number(accessories).toLocaleString() : 0}</span>
              </div>
              <div className='space-x-2'>
                <label>
                  <input
                    className='m-2'
                    type="checkbox"
                    checked={serviceContract}
                    onChange={(e) => setServiceContract(e.target.checked)}
                  />
                  Service Contract
                </label>
                <label>
                  <input
                    className='mr-2'
                    type="checkbox"
                    checked={gap}
                    onChange={(e) => setGap(e.target.checked)}
                  />
                  GAP
                </label>
              </div>
            </div>
          </div>

            <div className='border border-white p-4 rounded-lg shadow-md mb-4 w-fit'>
            <div className='flex space-x-10'>
              <div className='flex space-x-2 flex-col'>
                <div>
                  <button
                    type="button"
                    onClick={() => setShowSliderAdjust(!showSliderAdjust)}
                    className='bg-none border-none text-blue-500/50 cursor-pointer p-0'
                  >
                    {showSliderAdjust ? '▼' : '▶'}
                  </button>

                  {showSliderAdjust && (
                    <div style={{ marginTop: '0.5rem' }}>
                      <label className='text-red-500'>
                        Adjust Max Range:&nbsp;
                        <input
                          type="number"
                          value={sliderMax}
                          onChange={(e) => setSliderMax(Number(e.target.value))}
                          style={{ width: '80px' }}
                        />
                      </label>
                    </div>
                  )}
                  <label className='ml-2'>Cash Down </label>

                </div>
                <div>
                  <input
                    type="range"
                    style={{ cursor: 'pointer' }}
                    min={0}
                    max={sliderMax}
                    value={cashDown}
                    step={100}
                    onChange={(e) => setCashDown(Number(e.target.value))}
                  />
                  <span> ${Number(cashDown).toLocaleString()}</span>
                </div>

              </div>

              <div style={{ marginBottom: '1rem' }}>
                <div className='flex space-x-2 items-center'>
                  <button
                    type="button"
                    onClick={() => setShowTradeSliderAdjust(!showTradeSliderAdjust)}
                    className='bg-none border-none text-blue-500/50 cursor-pointer p-0'
                  >
                    {showTradeSliderAdjust ? '▼' : '▶'}
                  </button>
                  <label>Trade Value </label>
                </div>
                {showTradeSliderAdjust && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <label className='text-red-500'>
                      Adjust Trade Max Range:&nbsp;
                      <input
                        type="number"
                        value={tradeSliderMax}
                        onChange={(e) => setTradeSliderMax(Number(e.target.value))}
                        style={{ width: '80px' }}
                      />
                    </label>
                  </div>
                )}
                <input
                  type="range"
                  style={{ cursor: 'pointer' }}
                  min={0}
                  max={tradeSliderMax}
                  step={100}
                  value={tradeIn ? Number(tradeIn) : 0}
                  onChange={(e) => setTradeIn(Number(e.target.value))}
                />
                <span> ${tradeIn ? Number(tradeIn).toLocaleString() : 0}</span>
              </div>
            </div>



          </div>
        </div>
        <div className='flex space-x-2 mb-4 bg-green-500/50 border border-green-500/50 w-fit p-2 rounded-lg shadow-md font-bold'>
            <label>Budget </label>
            <input
              type="range"
              style={{ cursor: 'pointer' }}
              min={0}
              max={1000}
              step={10}
              value={budget}
              onChange={(e) => setBudget(Number(e.target.value))}
            />
            <span> ${Number(budget).toLocaleString()} {'/m'}</span>
        </div>

      </form>

      {paymentType === 'finance' && (
        <div style={{ display: 'flex',  minHeight: '100vh' }}>
          <div style={{ marginTop: '2rem' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={{ border: '1px solid #ccc', padding: '8px' }}>Cash Down</th>
                  {tableTermOptions.map((termOption) => (
                    <th key={termOption} style={{ border: '1px solid #ccc' }}>
                      {termOption} months<br />
                      <input
                        type="number"
                        step="0.1"
                        value={termAPRs[termOption]}
                        onChange={(e) => setTermAPRs({ ...termAPRs, [termOption]: parseFloat(e.target.value) })}
                        style={{ width: '60px' }}
                      />%
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableCashDownOptions.map((cdOption) => (
                  <tr key={cdOption}>
                    <td style={{ border: '1px solid #ccc', padding: '8px' }}>${cdOption}</td>
                    {tableTermOptions.map((termOption) => {
                      const apr = termAPRs[termOption] || 0;
                      const adjustedTotal = baseTotal - cdOption - tradeInVal;
                      const monthlyPayment = (adjustedTotal * (1 + (financeTaxRate + apr) / 100)) / termOption;
                      return (
                        <td
                          key={termOption}
                          style={{
                            border: '1px solid #ccc',
                            padding: '8px',
                            textAlign: 'center',
                            cursor: 'pointer',
                            color: monthlyPayment <= budget ? 'green' : 'inherit',
                            backgroundColor:
                              selectedCalc && selectedCalc.cashDownOption === cdOption && selectedCalc.termOption === termOption
                                ? '#ffeb3b'
                                : 'inherit'
                          }}
                          onClick={() => {
                            setSelectedCalc({
                              cashDownOption: cdOption,
                              termOption: termOption,
                              apr: apr,
                              financeTaxRate: financeTaxRate,
                              baseTotal: baseTotal,
                              adjustedTotal: adjustedTotal,
                              monthlyPayment: monthlyPayment
                            });
                          }}
                        >
                          ${monthlyPayment.toFixed(2)}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
            {selectedCalc && (
              <div
                className="bg-white/15 rounded flex flex-col w-fit"
                style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}
              >
                <h3>Calculation Details:</h3>
                <p>
                  <strong>Base Total:</strong> ${selectedCalc.baseTotal.toFixed(2)}
                </p>
                <p>
                  <strong>Cash Down Option:</strong> ${selectedCalc.cashDownOption.toFixed(2)}
                </p>
                <p>
                  <strong>Trade-In Value:</strong> ${tradeInVal.toFixed(2)}
                </p>
                <p>
                  <strong>Adjusted Total:</strong> ${selectedCalc.adjustedTotal.toFixed(2)}
                </p>
                <p>
                  <strong>Finance Tax Rate:</strong> {selectedCalc.financeTaxRate}%
                </p>
                <p>
                  <strong>APR:</strong> {selectedCalc.apr}%
                </p>
                <p>
                  <strong>Term:</strong> {selectedCalc.termOption} months
                </p>
                <hr />
                <p>
                  <strong>Calculation:</strong> (({selectedCalc.baseTotal.toFixed(2)} -{' '}
                  {selectedCalc.cashDownOption.toFixed(2)} - {tradeInVal.toFixed(2)}) * (1 + (({selectedCalc.financeTaxRate} + {selectedCalc.apr}) / 100))) /{' '}
                  {selectedCalc.termOption} = ${selectedCalc.monthlyPayment.toFixed(2)}
                </p>
                <p className="border border-white flex justify-center m-4 p-2 rounded">
                  <strong>Monthly Payment:</strong> ${selectedCalc.monthlyPayment.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}