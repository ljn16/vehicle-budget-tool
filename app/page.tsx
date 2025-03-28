'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  // Form state variables
  const [carPrice, setCarPrice] = useState(30000);
  const [accessories, setAccessories] = useState(5000);
  const [serviceContract, setServiceContract] = useState(false);
  const [gap, setGap] = useState(false);
  const [cashDown, setCashDown] = useState(2000);
  const [tradeIn, setTradeIn] = useState('');
  const [paymentType, setPaymentType] = useState('finance');
  const [sliderMax, setSliderMax] = useState(5000);
  const [term, setTerm] = useState(60); // Default term for finance
  const [result, setResult] = useState(null);
  const [budget, setBudget] = useState(500);

  // Default tax rates for finance and lease
  const financeTaxRate = 6.875;
  const leaseTaxRate = 8.275;

  // Predefined options for cash down and finance term (months)
  // const cashDownOptions = [0, 2000, 5000, 10000];
  const financeTerms = [24, 36, 48, 60, 72, 80];

  // Table options for finance calculations
  const tableCashDownOptions = [Math.max(0, cashDown - 2000), cashDown, cashDown + 2000];
  const tableTermOptions = [36, 48, 60, 72, 84];

  // Parse input values and calculate base total
  const priceVal = parseFloat(carPrice) || 0;
  const accVal = parseFloat(accessories) || 0;
  const tradeInVal = parseFloat(tradeIn) || 0;
  const svcVal = serviceContract ? 2500 : 0;
  const gapVal = gap ? 2500 : 0;
  const baseTotal = priceVal + accVal + svcVal + gapVal;

  // Calculate monthly payment based on inputs
  const calculateMonthlyPayment = () => {
    // Parse input values; default to 0 if empty
    const price = parseFloat(carPrice) || 0;
    const acc = parseFloat(accessories) || 0;
    const svc = serviceContract ? 2500 : 0;
    const gapCost = gap ? 2500 : 0;
    const down = parseFloat(cashDown) || 0;
    const trade = parseFloat(tradeIn) || 0;
    
    // Total before adjustments
    const baseTotal = price + acc + svc + gapCost;
    
    // Subtract cash down and trade-in (assuming trade-in provides a tax saving)
    const adjustedTotal = baseTotal - down - trade;
    
    // Select the tax rate and term depending on payment type
    const taxRate = paymentType === 'finance' ? financeTaxRate : leaseTaxRate;
    const termMonths = paymentType === 'finance' ? term : 36;

    // Compute monthly payment with the additive tax applied
    const monthlyPayment = (adjustedTotal * (1 + taxRate / 100)) / termMonths;

    setResult(monthlyPayment.toFixed(2));
  };

  // Instead of a standalone function, use the useState hook to manage the showSliderAdjust state
  const [showSliderAdjust, setShowSliderAdjust] = useState(false);
  const [termAPRs, setTermAPRs] = useState({
    36: 3.5,
    48: 4.0,
    60: 4.5,
    72: 5.0,
    84: 5.5,
  });

  useEffect(() => {
    calculateMonthlyPayment();
  }, [carPrice, accessories, serviceContract, gap, cashDown, tradeIn, paymentType, term]);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 className='flex w-full justify-center font-bold text-3xl mb-4'>Payment Calculator</h1>

 
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
                  onChange={(e) => setCarPrice(e.target.value)}
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
                  onChange={(e) => setAccessories(e.target.value)}
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
                  Service Contract {/* <span className='text-black/50'>(~ $2,500)</span> */}
                </label>
                <label>
                  <input
                    className='mr-2'
                    type="checkbox"
                    checked={gap}
                    onChange={(e) => setGap(e.target.checked)}
                  />
                  GAP {/* <span className='text-black/50'>(~ $2,500)</span> */}
                </label>
              </div>
            </div>
          </div>

            <div className='border border-white p-4 rounded-lg shadow-md mb-4 w-fit'>
            {/* <div className='flex space-x-10'>
              <label style={{ marginRight: '1rem' }}>
                <input
                  type="radio"
                  name="paymentType"
                  value="finance"
                  checked={paymentType === 'finance'}
                  onChange={() => setPaymentType('finance')}
                />{' '}
                Finance
              </label>

              {paymentType === 'finance' && (
              <div style={{ marginBottom: '1rem' }}>
                <select value={term} onChange={(e) => setTerm(Number(e.target.value))}>
                  {financeTerms.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            )}
              <label>
                <input
                  type="radio"
                  name="paymentType"
                  value="lease"
                  checked={paymentType === 'lease'}
                  onChange={() => setPaymentType('lease')}
                />{' '}
                Lease (36 months)
              </label>
            </div> */}
            {/* ///////////// */}
            <div className='flex space-x-10'>
              <div className='flex space-x-2'>
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
                </div>
                <div>
                  <label>Cash Down </label>
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
                <label>Trade Value </label>
                <input
                  type="range"
                  style={{ cursor: 'pointer' }}
                  min={0}
                  max={20000}
                  step={100}
                  value={tradeIn ? Number(tradeIn) : 0}
                  onChange={(e) => setTradeIn(Number(e.target.value))}
                />
                <span> ${tradeIn ? Number(tradeIn).toLocaleString() : 0}</span>
              </div>
            </div>



          </div>
          <div className='flex space-x-2 mb-4 bg-green-500/50 w-fit p-2 rounded-lg shadow-md font-bold'>
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
        </div>


      </form>

      {paymentType === 'finance' && (
        <div style={{ marginTop: '2rem' }}>
          {/* <h2>Payment Table</h2> */}
          <table style={{ borderCollapse: 'collapse', width: '100%' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px' }}>Cash Down</th>
                {tableTermOptions.map((termOption) => (
                    <th key={termOption} style={{ border: '1px solid #ccc',  }}>
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
                    const monthlyPayment = (adjustedTotal * (1 + apr / 100)) / termOption;
                    return (
                      <td
                        key={termOption}
                        style={{
                          border: '1px solid #ccc',
                          padding: '8px',
                          textAlign: 'center',
                          color: monthlyPayment <= budget ? 'green' : 'inherit'
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
        </div>
      )}
    </div>
  );
}