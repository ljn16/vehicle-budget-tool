import React from 'react';

interface AdvancedProps {
  showAdditionalSettings: boolean;
  setShowAdditionalSettings: (show: boolean) => void;
  financeTaxRate: number;
  setFinanceTaxRate: (rate: number) => void;
}

export default function Advanced({
    showAdditionalSettings,
    setShowAdditionalSettings,
    financeTaxRate,
    setFinanceTaxRate
}: AdvancedProps) {
  return (
    <div className="absolute top-0 right-0 md:right-auto md:left-0 m-4 z-10">
        <button
        type="button"
        onClick={() => setShowAdditionalSettings(!showAdditionalSettings)}
        className="bg-gray-500 text-white px-2 py-1 rounded hover:cursor-pointer hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 "
        >
        {showAdditionalSettings ? '▼ Advanced' : '▶ Advanced'}
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
  );
}