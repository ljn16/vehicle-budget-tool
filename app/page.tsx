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
  const [showAdditionalSettings, setShowAdditionalSettings] = useState(false);

  // Default tax rates for finance and lease
  const [financeTaxRate, setFinanceTaxRate] = useState(6.875);

  // Table options for finance calculations
  // const tableCashDownOptions = [Math.max(0, cashDown - 2000), cashDown, cashDown + 2000];
  const tableCashDownOptions = Array.from(new Set([Math.max(0, cashDown - 2000), cashDown, cashDown + 2000]));
  const tableTermOptions = [36, 48, 60, 72, 84];

  // Parse input values and calculate base total
  const priceVal = carPrice || 0;
  const accVal = accessories || 0;
  const tradeInVal = tradeIn || 0;
  const svcVal = serviceContract ? 3000 : 0;
  const gapVal = gap ? 1000 : 0;
  const titleLicenseFee = 500;
  const baseTotal = priceVal + accVal + svcVal + gapVal + titleLicenseFee;

  // Calculate monthly payment based on inputs
  const calculateMonthlyPayment = () => {
    // Use the current cashDown value as the default cash down option
    const defaultCashDownOption = cashDown;
    // Choose a default term option, e.g., 60 months
    const defaultTermOption = 60;
    // Retrieve the APR for the default term
    const apr = termAPRs[defaultTermOption] || 0;
    
    // Calculate the adjusted total by subtracting the default cash down and trade-in value
    const adjustedTotal = baseTotal - defaultCashDownOption - tradeIn;
    
    // Compute the monthly payment with finance tax and APR
    const monthlyPayment = (adjustedTotal * (1 + (financeTaxRate + apr) / 100)) / defaultTermOption;
    
    // Update the selected calculation state with these default values
    setSelectedCalc({
      cashDownOption: defaultCashDownOption,
      termOption: defaultTermOption,
      apr: apr,
      financeTaxRate: financeTaxRate,
      baseTotal: baseTotal,
      adjustedTotal: adjustedTotal,
      monthlyPayment: monthlyPayment
    });
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

  const [showBaseBreakdown, setShowBaseBreakdownState] = useState(false);

  function setShowBaseBreakdown(updateFn: (prev: boolean) => boolean): void {
    setShowBaseBreakdownState(prev => updateFn(prev));
  }
  return (
    <div className="p-4 md:p-8 font-sans">
      <div className="absolute top-0 right-0 m-4 z-10">
        <button
          type="button"
          onClick={() => setShowAdditionalSettings(!showAdditionalSettings)}
          className="bg-blue-500 text-white px-2 py-1 rounded hover:cursor-pointer"
        >
          {showAdditionalSettings ? 'Advanced' : 'Advanced'}
        </button>
        {showAdditionalSettings && (
          <div className="mt-2 p-4 bg-gray-100 border rounded shadow text-black">
            <h3 className="text-lg font-bold mb-2">Additional Settings</h3>
            <div className="mb-2">
              <label className="mr-2">Tax Rate:</label>
              <input
                type="number"
                value={financeTaxRate}
                onChange={(e) => setFinanceTaxRate(Number(e.target.value))}
                className="border rounded px-1 w-20"
              />
            </div>
            <div>
              <p className='opacity-35'>Additional settings comming soon</p>
            </div>
            {/* <div>
              <label className="mr-2">GAP:</label>
              <input
                type="checkbox"
                checked={gap}
                onChange={(e) => setGap(e.target.checked)}
                className="cursor-pointer"
              />
            </div> */}
          </div>
        )}
      </div>
      <h1 className="flex w-full justify-center font-bold text-3xl">
      Vehicle Payment Calculator
      </h1>
      <p className="text-center text-gray-700 mb-4">Created by Logan Nelsen</p>

      <form className="flex flex-col w-full items-center">
      <div className="flex flex-col items-center  bg-gray-200 p-4 rounded-lg shadow-md mb-4 text-black w-fit pb-0 px-0">
        <div className='flex'>
          {/* <span className='bg-yellow-600 align-middle'>+</span> */}
        <div className="border border-red-500/20 p-4 rounded-lg shadow-md shadow-red-500/20 mb-4 w-fit mx-4 mt-2">
          {/* <div className="relative">
            <button
              type="button"
              className="absolute -top-8 -left-8 m-2 w-5 h-5 rounded-full bg-green-400 text-white flex items-center justify-center shadow-md"
            >
              +
            </button>
          </div> */}
          <div className="relative group">
            <button
              type="button"
              className="cursor-help absolute -top-9 left-[50%] transform -translate-x-1/2 m-2 w-fit px-2 h-5 rounded-full bg-red-400 text-white flex items-center justify-center shadow-md text-xs"
            >
              <span className='font-extrabold'>+&nbsp;</span> {(baseTotal).toLocaleString(undefined)}
            </button>
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
              includes title/license ($500)
            </div>
          </div>
        <div className="flex items-center space-x-10">
          <div className="flex flex-col justify-center">
            <div className='w-52 flex items-center justify-evenly'>
              <label><span className='font-semibold'>Vehicle</span></label>
              <span> ${carPrice ? Number(carPrice).toLocaleString() : (30000).toLocaleString()}</span>
            </div>


            <input
              type="range"
              className="cursor-grab active:cursor-grabbing"
              min={0}
              max={60000}
              step={200}
              value={carPrice ? Number(carPrice) : 30000}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              required
            />
          </div>

          <div className="flex flex-col justify-center">
            <div className='flex items-center justify-evenly w-40'>
              <label><span className='font-semibold'>Accessories</span></label>
              <span> ${accessories ? Number(accessories).toLocaleString() : 0}</span>
            </div>
            <input
              type="range"
              className="cursor-grab active:cursor-grabbing"
              min="0"
              max="5000"
              step="100"
              value={accessories ? Number(accessories) : 0}
              onChange={(e) => setAccessories(Number(e.target.value))}
            />
 
          </div>
          <div className=" p-4 rounded-lg w-fit bg-gray-50/30 border border-white/30 flex flex-col justify-center items-start">
            <div className='flex align-middle'>
            <input
                className="mr-1 cursor-pointer"
                type="checkbox"
                checked={serviceContract}
                onChange={(e) => setServiceContract(e.target.checked)}
              />
              <label>Service Contract</label>
            </div>

            <div className='flex align-middle'>
              <input
                className="mr-1 cursor-pointer"
                type="checkbox"
                checked={gap}
                onChange={(e) => setGap(e.target.checked)}
              />
              <label>GAP</label>
            </div>

          </div>
        </div>
        </div>
        </div>
        

        <div className="border border-green-500/20 shadow-green-500/20 p-4 rounded-lg shadow-md mb-4 w-fit mt-2">
        {/* <div className="relative">
            <button
              type="button"
              className="absolute -top-8 -left-8 m-2 w-5 h-5 rounded-full bg-red-400 text-white flex items-center justify-center shadow-md"
            >
              <span className='font-extrabold'>-&nbsp;</span>            
            </button>
          </div> */}
          <div className="relative">
            <button
              type="button"
              className="absolute -top-9 left-[50%] transform -translate-x-1/2 m-2 w-fit px-2 h-5 rounded-full bg-green-400 text-white flex items-center justify-center shadow-md text-xs"
            >
              <span className='font-extrabold'>-&nbsp;</span> {(cashDown + tradeInVal).toLocaleString(undefined)}
            </button>
          </div>
        <div className="flex space-x-10">
          
          
          
          
          <div className="flex flex-col space-y-2">
          <div className="flex items-center">
            <button
            type="button"
            onClick={() => setShowSliderAdjust(!showSliderAdjust)}
            className="bg-none border-none text-blue-500/50 cursor-pointer p-0 mr-2"
            >
            {showSliderAdjust ? '▼' : '▶'}
            </button>
            <label>Cash Down</label>
          </div>
          {showSliderAdjust && (
            <div className="mt-2">
            <label className="text-red-500">
              Adjust Max Range:&nbsp;
              <input
              type="number"
              className="w-20"
              value={sliderMax}
              onChange={(e) => setSliderMax(Number(e.target.value))}
              />
            </label>
            </div>
          )}
          <div>
            <input
            type="range"
            className="cursor-grab active:cursor-grabbing"
            min={0}
            max={sliderMax}
            value={cashDown}
            step={100}
            onChange={(e) => setCashDown(Number(e.target.value))}
            />
            <span> ${Number(cashDown).toLocaleString()}</span>
          </div>
          </div>

          <div className="mb-4">
          <div className="flex items-center space-x-2">
            <button
            type="button"
            onClick={() => setShowTradeSliderAdjust(!showTradeSliderAdjust)}
            className="bg-none border-none text-blue-500/50 cursor-pointer p-0"
            >
            {showTradeSliderAdjust ? '▼' : '▶'}
            </button>
            <label>Trade Value</label>
          </div>
          {showTradeSliderAdjust && (
            <div className="mt-2">
            <label className="text-red-500">
              Adjust Trade Max Range:&nbsp;
              <input
              type="number"
              className="w-20"
              value={tradeSliderMax}
              onChange={(e) => setTradeSliderMax(Number(e.target.value))}
              />
            </label>
            </div>
          )}
          <div>
            <input
            type="range"
            className="cursor-grab active:cursor-grabbing"
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
        <div className="flex items-center justify-center bg-green-500/50 border border-green-500/50 p-2 mb-0 mx-0 rounded-lg shadow-md w-full">
          <div className='font-bold space-x-2'>
            <label>Budget </label>
            <input
            type="range"
            className="cursor-grab active:cursor-grabbing"
            min={0}
            max={1000}
            step={10}
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            />
            <span> ${Number(budget).toLocaleString()}/m</span>
          </div>

      </div>
      </div>

      </form>

      {paymentType === 'finance' && (
      <div className="flex flex-col items-center mt-2">
        <div className="relative group">
          <button
            type="button"
            className="cursor-help absolute -top-3 left-[50%] transform -translate-x-1/2 m-2 w-fit px-2 h-5 rounded-full bg-red-400 text-white flex flex-row items-center justify-center shadow-md text-xs"
          >
            <span className='font-extrabold'>x&nbsp;</span> {(((selectedCalc?.apr) ?? 0) + financeTaxRate).toLocaleString(undefined)}%
          </button>

          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            APR + Sales Tax (MN)
          </div>
        </div>

        {/* <div className="relative">
            <button
            type="button"
            className="absolute bottom-0 left-[50%] transform -translate-x-1/2 m-2 w-fit px-2 h-5 rounded-full bg-red-400 text-white flex flex-row items-center justify-center shadow-md text-xs"
            >
            <span className='font-extrabold'>x&nbsp;</span> {(((selectedCalc?.apr) ?? 0) + financeTaxRate).toLocaleString(undefined)}%
            </button>
        </div> */}
        <div className="mt-2">
        <div className="overflow-x-auto w-full">
          <table className="w-full border-collapse">
          <thead>
          <tr>
            <th className="border border-gray-300 p-2 italic font-thin">Cash Down<br/>▼</th>
            {tableTermOptions.map((termOption) => (
            <th key={termOption} className="border border-gray-300 p-1 whitespace-nowrap">
              {termOption}m&nbsp;
              <span className="font-normal opacity-50">({(termOption / 12).toFixed(0)}y)</span>
              <br />
              <input
                type="number"
                step="0.1"
                value={termAPRs[termOption]}
                onChange={(e) =>
                  setTermAPRs({
                    ...termAPRs,
                    [termOption]: parseFloat(e.target.value),
                  })
                }
                className="w-12 text-xs"
              />
              <span className='text-xs'>%</span>
            </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {tableCashDownOptions.map((cdOption) => (
            <tr key={cdOption}>
            <td className="border border-gray-300 p-2">
              ${cdOption.toLocaleString(undefined)}
            </td>
            {tableTermOptions.map((termOption) => {
              const apr = termAPRs[termOption] || 0;
              const adjustedTotal = baseTotal - cdOption - tradeInVal;
              const monthlyPayment =
              (adjustedTotal * (1 + (financeTaxRate + apr) / 100)) / termOption;
              return (
              <td
                key={termOption}
                className={`border border-gray-300 p-2 text-center cursor-cell bg-gray-500/50 ${
                monthlyPayment <= budget ? 'text-green-500' : ''
                } ${
                selectedCalc &&
                selectedCalc.cashDownOption === cdOption &&
                selectedCalc.termOption === termOption
                  ? 'bg-yellow-300/50'
                  : ''
                }`}
                onClick={() => {
                setSelectedCalc({
                  cashDownOption: cdOption,
                  termOption: termOption,
                  apr: apr,
                  financeTaxRate: financeTaxRate,
                  baseTotal: baseTotal,
                  adjustedTotal: adjustedTotal,
                  monthlyPayment: monthlyPayment,
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
        </div>
        {!selectedCalc && (
          <p className="mt-1 italic text-gray-500/50">
          * Select cell to see calculation details.
          </p>
        )}
        {selectedCalc && (
          <div className="rounded flex flex-col w-fit mt-4 p-4 border border-gray-300">
          <h3>Calculation Details:</h3>
          <div>
            <div className="flex items-center">
            <button
              onClick={() => setShowBaseBreakdown((prev) => !prev)}
              className="mr-2 opacity-25 cursor-pointer"
            >
              {showBaseBreakdown ? '▼' : '▶'}
            </button>
            <strong className="mr-1">Base Total:</strong>{' '}
            ${selectedCalc.baseTotal.toLocaleString(undefined)}
            </div>
            {showBaseBreakdown && (
            <div className="font-extralight text-gray-500 ml-10">
              <div>Car Price: ${priceVal.toLocaleString(undefined)}</div>
              <div>Accessories: ${accVal.toLocaleString(undefined)}</div>
              <div>Service Contract: ${svcVal.toLocaleString(undefined)}</div>
              <div>GAP: ${gapVal.toLocaleString(undefined)}</div>
              <div>Title/License: $500.00</div>
            </div>
            )}
          </div>
          <div className="ml-6">
            <p>
            <strong>Cash Down:</strong>{' '}
            ${selectedCalc.cashDownOption.toLocaleString(undefined)}
            </p>
            <p>
            <strong>Trade-In Value:</strong> ${tradeInVal.toLocaleString(undefined)}
            </p>
            <p className='bg-gray-500/30'>
            <strong>Adjusted Total:</strong>{' '}
            ${selectedCalc.adjustedTotal.toLocaleString(undefined)}
            </p>
            <p>
            <strong>Sales Tax Rate (MN):</strong>{' '}
            {selectedCalc.financeTaxRate}%
            </p>
            <p>
            <strong>APR:</strong> {selectedCalc.apr}%
            </p>
            <p>
            <strong>Term:</strong> {selectedCalc.termOption} months
            </p>
          </div>

          <div className="my-2 opacity-30">
            <hr />
          </div>
          {/* .toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) */}

          <p>
            <strong>Calculation:</strong>
            <div className="flex flex-col items-center my-4">
              {/* Numerator */}
              <div className="text-center">
                (
                {selectedCalc.baseTotal.toLocaleString(undefined)} -{' '}
                {selectedCalc.cashDownOption.toLocaleString(undefined)} -{' '}
                {tradeInVal.toLocaleString(undefined)}) * (100% + {selectedCalc.financeTaxRate}% + {selectedCalc.apr}%)
              </div>
              {/* Fraction line */}
              <div className="w-full border-t border-gray-400 my-1"></div>
              {/* Denominator */}
              <div className="text-center">{selectedCalc.termOption}</div>
            </div>
            <p className="text-center font-bold">
              {/* = ${selectedCalc.monthlyPayment.toFixed(2)} */}
            </p>
            <p className="border border-white flex justify-center m-4 p-2 rounded">
              <strong className="mr-1">Monthly Payment:</strong> ${selectedCalc.monthlyPayment.toFixed(2)}
            </p>
            </p>
          </div>
        )}
        </div>
      </div>
      )}
    </div>
  );
}