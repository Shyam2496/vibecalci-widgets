import React, { useState } from 'react';
import { Calculator, Sparkles, TrendingDown, DollarSign, Percent, Calendar, Minus, Plus, FileText } from 'lucide-react';

export default function EMICalculator() {
  const [loanAmount, setLoanAmount] = useState('150000');
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(15);
  const [tenureType, setTenureType] = useState('years');
  const [showSchedule, setShowSchedule] = useState(false);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount) || 0;
    const ratePerMonth = interestRate / 12 / 100;
    const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure;

    if (principal <= 0 || tenureMonths <= 0) {
      return { emi: 0, totalInterest: 0, totalAmount: 0 };
    }

    const emi = (principal * ratePerMonth * Math.pow(1 + ratePerMonth, tenureMonths)) / 
                (Math.pow(1 + ratePerMonth, tenureMonths) - 1);
    
    const totalAmount = emi * tenureMonths;
    const totalInterest = totalAmount - principal;

    return {
      emi: isFinite(emi) ? emi : 0,
      totalInterest: isFinite(totalInterest) ? totalInterest : 0,
      totalAmount: isFinite(totalAmount) ? totalAmount : 0
    };
  };

  const { emi, totalInterest, totalAmount } = calculateEMI();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const handleTenureChange = (delta) => {
    const newTenure = Math.max(1, tenure + delta);
    setTenure(newTenure);
  };

  const generatePaymentSchedule = () => {
    const principal = parseFloat(loanAmount) || 0;
    const ratePerMonth = interestRate / 12 / 100;
    const tenureMonths = tenureType === 'years' ? tenure * 12 : tenure;
    const schedule = [];
    let balance = principal;

    for (let month = 1; month <= tenureMonths; month++) {
      const interestPayment = balance * ratePerMonth;
      const principalPayment = emi - interestPayment;
      balance -= principalPayment;

      schedule.push({
        month,
        emi: emi,
        principal: principalPayment,
        interest: interestPayment,
        balance: Math.max(0, balance)
      });
    }

    return schedule;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 flex items-center justify-center">
      <div className="flex w-full max-w-[576px] flex-col items-start gap-6 rounded-2xl bg-white px-8 py-8 shadow-[0px_20px_60px_-15px_rgba(0,0,0,0.3),0px_10px_20px_-5px_rgba(0,0,0,0.1)] border border-neutral-200/50 backdrop-blur-sm" style={{
        boxShadow: '0px 20px 60px -15px rgba(0,0,0,0.3), 0px 10px 20px -5px rgba(0,0,0,0.1), 0px 0px 0px 1px rgba(0,0,0,0.05)'
      }}>
        {/* Header */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500">
              <Calculator className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-slate-900">
              EMI Calculator
            </span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-green-100 px-3 py-1.5">
            <Sparkles className="h-4 w-4 text-green-600" />
            <span className="text-sm font-semibold text-green-700">Premium</span>
          </div>
        </div>

        {/* EMI Result Card */}
        <div style={{
          boxShadow: 'inset 0px 1px 6px 0px rgb(0 0 0)'
        }} className="flex w-full flex-col items-start gap-4 rounded-xl px-6 py-6 bg-gradient-to-r from-neutral-50 via-neutral-100 to-neutral-200">
          <div className="flex w-full items-center justify-between">
            <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
              Monthly EMI Payment
            </span>
            <div className="flex items-center gap-2 rounded-full bg-white px-3 py-1 bg-opacity-60">
              <TrendingDown className="h-4 w-4 text-neutral-700" />
              <span className="text-xs font-bold text-neutral-700">
                Low Rate
              </span>
            </div>
          </div>
          <div className="flex w-full gap-2 items-baseline">
            <span className="text-4xl font-bold text-green-400">
              {formatCurrency(emi)}
            </span>
            <span className="text-base font-semibold text-neutral-600">
              / month
            </span>
          </div>
          <div className="flex w-full items-center gap-4 border-t border-dashed border-neutral-300 pt-4">
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
              <span className="text-sm text-neutral-600">
                Total Interest
              </span>
              <span className="text-base font-bold text-neutral-900">
                {formatCurrency(totalInterest)}
              </span>
            </div>
            <div className="flex h-10 w-px flex-none flex-col items-center gap-2 bg-neutral-300" />
            <div className="flex grow shrink-0 basis-0 flex-col items-start gap-1">
              <span className="text-sm text-neutral-600">
                Total Amount
              </span>
              <span className="text-base font-bold text-neutral-900">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Schedule */}
        {showSchedule && (
          <div className="w-full mt-4 rounded-xl border-2 border-slate-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-400 to-orange-500 px-4 py-3">
              <h3 className="text-lg font-bold text-white">Payment Schedule</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full">
                <thead className="bg-slate-100 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-slate-700">Month</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-700">EMI</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-700">Principal</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-700">Interest</th>
                    <th className="px-4 py-3 text-right text-xs font-bold text-slate-700">Balance</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {generatePaymentSchedule().map((row, idx) => (
                    <tr key={idx} className="border-t border-slate-200 hover:bg-slate-50">
                      <td className="px-4 py-2 text-sm text-slate-900">{row.month}</td>
                      <td className="px-4 py-2 text-sm text-right text-slate-900">{formatCurrency(row.emi)}</td>
                      <td className="px-4 py-2 text-sm text-right text-green-600">{formatCurrency(row.principal)}</td>
                      <td className="px-4 py-2 text-sm text-right text-red-600">{formatCurrency(row.interest)}</td>
                      <td className="px-4 py-2 text-sm text-right text-slate-900 font-semibold">{formatCurrency(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}