import React from "react";

interface PaymentChartProps {
  paymentType: string;
  tableTermOptions: number[];
  tableCashDownOptions: number[];
  termAPRs: { [term: number]: number };
  setTermAPRs: (termAPRs: { [term: number]: number }) => void;
  selectedCalc: {
    cashDownOption: number;
    termOption: number;
    apr: number;
    financeTaxRate: number;
    baseTotal: number;
    adjustedTotal: number;
    monthlyPayment: number;
  } | null;
  setSelectedCalc: (selectedCalc: {
    cashDownOption: number;
    termOption: number;
    apr: number;
    financeTaxRate: number;
    baseTotal: number;
    adjustedTotal: number;
    monthlyPayment: number;
  } | null) => void;
  showBaseBreakdown: boolean;
  setShowBaseBreakdown: (updateFn: (prev: boolean) => boolean) => void;
  priceVal: number;
  accVal: number;
  svcVal: number;
  gapVal: number;
  tradeInVal: number;
  baseTotal: number;
  budget: number;
  financeTaxRate: number;
}

export default function PaymentChart({ /* paymentType, */ tableTermOptions, tableCashDownOptions, termAPRs, setTermAPRs, selectedCalc, setSelectedCalc, showBaseBreakdown, setShowBaseBreakdown, priceVal, accVal, svcVal, gapVal, tradeInVal, baseTotal, budget, financeTaxRate }: PaymentChartProps) {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
        <div className="flex flex-col items-center mt-2 justify-center md:px-[30vw]">
          {/*//?  *  */}

          <div className="relative group">
            <button
              type="button"
              className="cursor-help absolute -top-3 left-[50%] transform -translate-x-1/2 m-2 px-2 h-5 rounded-full bg-red-400 text-white flex flex-row items-center justify-center shadow-md text-xs w-[25vw] md:w-[15vw]"
            >
              <span className='font-extrabold'>x&nbsp;</span> {(((selectedCalc?.apr) ?? 0) + financeTaxRate).toLocaleString(undefined)}%
            </button>

            {/*//?  Tooltip  */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded px-2 py-1 whitespace-nowrap">
              APR + Sales Tax (MN)
            </div>
          </div>
  

            {/*//?  Table  */}
            <div className="mt-2">
            <div className="overflow-x-auto w-full">
                <table className="w-full table-fixed border-collapse">
                <thead className="">
                    <tr className="">
                    <th className="border border-gray-300 p-2 italic font-thin">
                        Cash Down<br />▼
                    </th>
                    {tableTermOptions.map((termOption) => (
                        <th
                        key={termOption}
                        className="border border-gray-300 p-1 pt-2 whitespace-nowrap"
                        >
                            <>
                            
                            
                        {isMobile ? (
                            <div className="flex flex-col items-center">
                                <span>{termOption}m</span>
                                <span className="font-normal opacity-50">
                                    ({(termOption / 12).toFixed(0)}y)
                                </span>
                            </div>
                        ) : (
                            <>
                                <span>{termOption}m&nbsp;&nbsp;&nbsp;</span>
                                <span className="font-normal opacity-50">
                                    ({(termOption / 12).toFixed(0)}y)
                                </span>
                            </>
                        )}


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
                            className={`${isMobile ? "w-8" : "w-12"} text-xs`}
                        />
                        <span className="text-xs">%</span>
                        </>
                        </th>
                    ))}
                    </tr>
                </thead>
                <tbody>
                    {tableCashDownOptions.map((cdOption) => (
                    <tr key={cdOption}>
                        <td className="border border-gray-300 p-2">
                        ${isMobile ? (cdOption / 1000).toFixed(1) + "k" : cdOption.toLocaleString(undefined)}
                        </td>
                        {tableTermOptions.map((termOption) => {
                        const apr = termAPRs[termOption] || 0;
                        const adjustedTotal = baseTotal - cdOption - tradeInVal;
                        const monthlyPayment =
                            (adjustedTotal * (1 + (financeTaxRate + apr) / 100)) /
                            termOption;
                        return (
                            <td
                            key={termOption}
                            className={`border border-gray-300 p-2 text-center cursor-cell bg-gray-500/50 ${
                                monthlyPayment <= budget ? "text-green-500" : ""
                            } ${
                                selectedCalc &&
                                selectedCalc.cashDownOption === cdOption &&
                                selectedCalc.termOption === termOption
                                ? "bg-yellow-300/50"
                                : ""
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
                            ${isMobile ? monthlyPayment.toFixed(0) : monthlyPayment.toFixed(2)}
                            </td>
                        );
                        })}
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>



          {!selectedCalc && (
            <p className="mt-1 italic text-gray-500/50">* Select cell to see calculation details.</p>
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
              <p><strong>Cash Down:</strong>{' '} ${selectedCalc.cashDownOption.toLocaleString(undefined)}</p>
              <p><strong>Trade-In Value:</strong> ${tradeInVal.toLocaleString(undefined)}</p>
              <p className='bg-gray-500/30'><strong>Adjusted Total:</strong>{' '} ${selectedCalc.adjustedTotal.toLocaleString(undefined)}</p>
              <p><strong>Sales Tax Rate (MN):</strong>{' '} {selectedCalc.financeTaxRate}%</p>
              <p><strong>APR:</strong> {selectedCalc.apr}%</p>
              {/* <p><strong>Cumulative Rate:</strong>{' '} {selectedCalc.financeTaxRate + selectedCalc.apr}%</p> */}
              <p><strong>Term:</strong> {selectedCalc.termOption} months</p>
            </div>
  
            <div className="my-2 opacity-30"><hr /></div>
              <p>
                <strong>Calculation:</strong>
                <div className="flex flex-col items-center my-4">
                  {/* Numerator */}
                  <div className="text-center">
                    ({selectedCalc.baseTotal.toLocaleString(undefined)} - {' '}
                    {selectedCalc.cashDownOption.toLocaleString(undefined)} - {' '}
                    {tradeInVal.toLocaleString(undefined)}) * (100% + {selectedCalc.financeTaxRate}% + {selectedCalc.apr}%)
                  </div>
                  <div className="w-full border-t border-gray-400 my-1"></div>  {/* Fraction line */}
                  <div className="text-center">{selectedCalc.termOption}</div> {/* Denominator */}
                </div>
  
                <p className="border border-white flex justify-center m-4 p-2 rounded">
                  <strong className="mr-1">Monthly Payment:</strong> ${selectedCalc.monthlyPayment.toFixed(2)}
                </p>
              </p>
            </div>
          )}
          </div>
        </div>
)}