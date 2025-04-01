import React from "react";

interface FormDataProps {
    carPrice: number;
    setCarPrice: (value: number) => void;
    accessories: number;
    setAccessories: (value: number) => void;
    serviceContract: boolean;
    setServiceContract: (value: boolean) => void;
    gap: boolean;
    setGap: (value: boolean) => void;
    cashDown: number;
    setCashDown: (value: number) => void;
    tradeIn: number;
    setTradeIn: (value: number) => void;
    budget: number;
    setBudget: (value: number) => void;
    baseTotal: number;
    sliderMax: number;
    setSliderMax: (value: number) => void;
    tradeSliderMax: number;
    setTradeSliderMax: (value: number) => void;
    showSliderAdjust: boolean;
    setShowSliderAdjust: (value: boolean) => void;
    showTradeSliderAdjust: boolean;
    setShowTradeSliderAdjust: (value: boolean) => void;
    tradeInVal: number;
}

export default function FormData({carPrice, setCarPrice, accessories, setAccessories, serviceContract, setServiceContract, gap, setGap, cashDown, setCashDown, tradeIn, setTradeIn, budget, setBudget, baseTotal, sliderMax, setSliderMax, tradeSliderMax, setTradeSliderMax, showSliderAdjust, setShowSliderAdjust, showTradeSliderAdjust, setShowTradeSliderAdjust, tradeInVal}: FormDataProps) {
  return (

<form className="flex w-full justify-center">
  <div className="flex flex-col items-center bg-gray-200 p-4 rounded-lg shadow-md mb-4 text-black w-fit ">

      {/*//?  +  */}
      <div className="border border-red-500/20 p-2 rounded-lg shadow-md shadow-red-500/20 mb-4 w-full mx-4 mt-2">
        {/*//?  + Sum  */}
        <div className="relative group">
          <button
            type="button"
            className="cursor-help absolute -top-7 left-1/2 transform -translate-x-1/2 m-2 px-2 h-5 rounded-full bg-red-400 text-white shadow-md text-xs w-[25vw] md:w-[15vw]"
          >
            <span className="font-extrabold">+&nbsp;</span> {(baseTotal).toLocaleString(undefined)}
          </button>
        {/*//?  Tooltip  */}
          <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
            <span>includes title/license ($500)</span>
          </div>
        </div>


        <div className="flex flex-col w-full md:flex-row md:items-center md:space-x-10 space-y-5">
          <div className="flex flex-col justify-center items-center">
            <div className="w-52 flex items-center justify-center ">
              <label>
                <span className="font-semibold">Vehicle&nbsp;</span>
              </label>
              <span>
                ${carPrice ? Number(carPrice).toLocaleString() : (30000).toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              className="cursor-grab active:cursor-grabbing w-full"
              min={0}
              max={60000}
              step={200}
              value={carPrice ? Number(carPrice) : 30000}
              onChange={(e) => setCarPrice(Number(e.target.value))}
              required
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <div className="w-40 flex items-center justify-center">
              <label>
                <span className="font-semibold">Accessories&nbsp;</span>
              </label>
              <span>
                ${accessories ? Number(accessories).toLocaleString() : 0}
              </span>
            </div>
            <input
              type="range"
              className="cursor-grab active:cursor-grabbing w-full"
              min="0"
              max="5000"
              step="100"
              value={accessories ? Number(accessories) : 0}
              onChange={(e) => setAccessories(Number(e.target.value))}
            />
          </div>
          <div className="p-4 rounded-lg w-full bg-gray-50/30 border border-white/30 flex md:flex-col justify-around">
            <div className="flex align-middle">
              <input
                className="mr-1 cursor-pointer"
                type="checkbox"
                checked={serviceContract}
                onChange={(e) => setServiceContract(e.target.checked)}
              />
              <label>Service Contract</label>
            </div>
            <div className="flex align-middle ">
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


    {/*//?  -  */}
    <div className="border border-green-500/20 shadow-green-500/20 p-4 rounded-lg shadow-md mb-4 w-fit mt-2">
      {/* <div className="relative">
        <button
          type="button"
          className="absolute -top-8 -left-8 m-2 w-5 h-5 rounded-full bg-red-400 text-white flex items-center justify-center shadow-md"
        >
          <span className="font-extrabold">-&nbsp;</span>
        </button>
      </div> */}
      <div className="relative">
        <button
          type="button"
          className="absolute -top-9 left-[50%] transform -translate-x-1/2 m-2 px-2 h-5 rounded-full bg-green-400 text-white flex items-center justify-center shadow-md text-xs w-[25vw] md:w-[15vw]"
        >
          <span className="font-extrabold">-&nbsp;</span> {(cashDown + tradeInVal).toLocaleString(undefined)}
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
              {showSliderAdjust ? "▼" : "▶"}
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
              {showTradeSliderAdjust ? "▼" : "▶"}
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
      <div className="font-bold space-x-2">
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
)}