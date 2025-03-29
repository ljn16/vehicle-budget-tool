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
  const svcVal = serviceContract ? 3000 : 0;
  const gapVal = gap ? 1000 : 0;
  const titleLicenseFee = 500;
  const baseTotal = priceVal + accVal + svcVal + gapVal + titleLicenseFee;

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

  const [showBaseBreakdown, setShowBaseBreakdownState] = useState(false);

  function setShowBaseBreakdown(updateFn: (prev: boolean) => boolean): void {
    setShowBaseBreakdownState(prev => updateFn(prev));
  }
  return (
    <div className="p-8 font-sans">
      <h1 className="flex w-full justify-center font-bold text-3xl">
      Vehicle Payment Calculator
      </h1>
      <p className="text-center text-gray-700 mb-4">Created by Logan Nelsen</p>

      <form className="flex flex-col w-full items-center">
      <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg shadow-md mb-4 text-black w-fit">
        <div className="border border-white p-4 rounded-lg shadow-md mb-4 w-fit">
        <div className="flex space-x-10">
          <div className="mb-4">
          <label>Car Price: </label>
          <input
            type="range"
            className="cursor-pointer"
            min={0}
            max={60000}
            step={200}
            value={carPrice ? Number(carPrice) : 30000}
            onChange={(e) => setCarPrice(Number(e.target.value))}
            required
          />
          <span> ${carPrice ? Number(carPrice).toLocaleString() : (30000).toLocaleString()}</span>
          </div>

          <div className="mb-4">
          <label>Accessories: </label>
          <input
            type="range"
            className="cursor-pointer"
            min="0"
            max="5000"
            step="100"
            value={accessories ? Number(accessories) : 0}
            onChange={(e) => setAccessories(Number(e.target.value))}
          />
          <span> ${accessories ? Number(accessories).toLocaleString() : 0}</span>
          </div>
          <div className="space-x-2">
          <label>
            <input
            className="m-2"
            type="checkbox"
            checked={serviceContract}
            onChange={(e) => setServiceContract(e.target.checked)}
            />
            Service Contract
          </label>
          <label>
            <input
            className="mr-2"
            type="checkbox"
            checked={gap}
            onChange={(e) => setGap(e.target.checked)}
            />
            GAP
          </label>
          </div>
        </div>
        </div>

        <div className="border border-white p-4 rounded-lg shadow-md mb-4 w-fit">
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
            className="cursor-pointer"
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
            className="cursor-pointer"
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
      </div>
      <div className="flex items-center space-x-2 mb-4 bg-green-500/50 border border-green-500/50 w-fit p-2 rounded-lg shadow-md font-bold">
        <label>Budget </label>
        <input
        type="range"
        className="cursor-pointer"
        min={0}
        max={1000}
        step={10}
        value={budget}
        onChange={(e) => setBudget(Number(e.target.value))}
        />
        <span> ${Number(budget).toLocaleString()} /m</span>
      </div>
      </form>

      {paymentType === 'finance' && (
      <div className="flex flex-col items-center">
        <div className="mt-2">
        <table className="w-full border-collapse">
          <thead>
          <tr>
            <th className="border border-gray-300 p-2">Cash Down</th>
            {tableTermOptions.map((termOption) => (
            <th key={termOption} className="border border-gray-300 p-2">
              {termOption} months
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
              className="w-16"
              />
              %
            </th>
            ))}
          </tr>
          </thead>
          <tbody>
          {tableCashDownOptions.map((cdOption) => (
            <tr key={cdOption}>
            <td className="border border-gray-300 p-2">
              ${cdOption}
            </td>
            {tableTermOptions.map((termOption) => {
              const apr = termAPRs[termOption] || 0;
              const adjustedTotal = baseTotal - cdOption - tradeInVal;
              const monthlyPayment =
              (adjustedTotal * (1 + (financeTaxRate + apr) / 100)) / termOption;
              return (
              <td
                key={termOption}
                className={`border border-gray-300 p-2 text-center cursor-pointer ${
                monthlyPayment <= budget ? 'text-green-500' : ''
                } ${
                selectedCalc &&
                selectedCalc.cashDownOption === cdOption &&
                selectedCalc.termOption === termOption
                  ? 'bg-yellow-300'
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
            ${selectedCalc.baseTotal.toFixed(2)}
            </div>
            {showBaseBreakdown && (
            <div className="font-extralight text-gray-500 ml-10">
              <div>Car Price: ${priceVal.toFixed(2)}</div>
              <div>Accessories: ${accVal.toFixed(2)}</div>
              <div>Service Contract: ${svcVal.toFixed(2)}</div>
              <div>GAP: ${gapVal.toFixed(2)}</div>
              <div>Title/License: $500.00</div>
            </div>
            )}
          </div>
          <div className="ml-6">
            <p>
            <strong>Cash Down Option:</strong>{' '}
            ${selectedCalc.cashDownOption.toFixed(2)}
            </p>
            <p>
            <strong>Trade-In Value:</strong> ${tradeInVal.toFixed(2)}
            </p>
            <p>
            <strong>Adjusted Total:</strong>{' '}
            ${selectedCalc.adjustedTotal.toFixed(2)}
            </p>
            <p>
            <strong>Finance Tax Rate:</strong>{' '}
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

          <p>
            <strong>Calculation:</strong> (({selectedCalc.baseTotal.toFixed(2)} -
            {selectedCalc.cashDownOption.toFixed(2)} - {tradeInVal.toFixed(2)}) * (1 +
            (({selectedCalc.financeTaxRate} + {selectedCalc.apr}) / 100))) /{' '}
            {selectedCalc.termOption} = ${selectedCalc.monthlyPayment.toFixed(2)}
          </p>
          <p className="border border-white flex justify-center m-4 p-2 rounded">
            <strong className="mr-1">Monthly Payment:</strong>{' '}
            ${selectedCalc.monthlyPayment.toFixed(2)}
          </p>
          </div>
        )}
        </div>
      </div>
      )}
    </div>
  );
}