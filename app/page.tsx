'use client';
import { useState, useEffect } from 'react';
//
import Advanced from './components/advanced';
import FormData from './components/formData';
import PaymentChart from './components/paymentChart';

export default function Home() {
  // Form states
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
  const [financeTaxRate, setFinanceTaxRate] = useState(6.875);

  // Table states (finance calc)
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
    <div className="p-2 md:p-8 font-sans">
      <Advanced
        showAdditionalSettings={showAdditionalSettings}
        setShowAdditionalSettings={setShowAdditionalSettings}
        financeTaxRate={financeTaxRate}
        setFinanceTaxRate={setFinanceTaxRate}
      />

      
      <h1 className="flex w-full justify-center font-bold text-3xl">Vehicle Payment Calculator</h1>
      <p className="text-center text-gray-700 mb-4">Created by Logan Nelsen</p>

      <FormData
        carPrice={carPrice}
        setCarPrice={setCarPrice}
        accessories={accessories}
        setAccessories={setAccessories}
        serviceContract={serviceContract}
        setServiceContract={setServiceContract}
        gap={gap}
        setGap={setGap}
        cashDown={cashDown}
        setCashDown={setCashDown}
        tradeIn={tradeIn}
        setTradeIn={setTradeIn} 
        budget={budget}
        setBudget={setBudget}
        baseTotal={baseTotal}
        sliderMax={sliderMax}
        setSliderMax={setSliderMax}
        tradeSliderMax={tradeSliderMax}
        setTradeSliderMax={setTradeSliderMax}
        showSliderAdjust={showSliderAdjust}
        setShowSliderAdjust={setShowSliderAdjust}
        showTradeSliderAdjust={showTradeSliderAdjust}
        setShowTradeSliderAdjust={setShowTradeSliderAdjust}
        tradeInVal={tradeInVal}
      />

      <PaymentChart
        paymentType={paymentType}
        tableTermOptions={tableTermOptions}
        tableCashDownOptions={tableCashDownOptions}
        termAPRs={termAPRs}
        setTermAPRs={setTermAPRs}
        selectedCalc={selectedCalc}
        setSelectedCalc={setSelectedCalc}
        showBaseBreakdown={showBaseBreakdown}
        setShowBaseBreakdown={setShowBaseBreakdown}
        priceVal={priceVal}
        accVal={accVal}
        svcVal={svcVal}
        gapVal={gapVal} 
        tradeInVal={tradeInVal}
        baseTotal={baseTotal}
        budget={budget}
        financeTaxRate={financeTaxRate}
      />
    </div>
  );
}