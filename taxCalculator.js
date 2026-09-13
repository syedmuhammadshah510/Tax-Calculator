/**
 * Tax Calculator Business Logic
 * Implements progressive income tax brackets:
 *  - Up to $10,000: 0%
 *  - $10,001 to $50,000: 10%
 *  - $50,001 to $100,000: 20%
 *  - Over $100,000: 30%
 */

function calculateTax(income, deductions = 0) {
  const numericIncome = Number(income);
  const numericDeductions = Number(deductions);

  if (isNaN(numericIncome) || numericIncome < 0) {
    throw new Error('Gross income must be a non-negative number');
  }

  if (isNaN(numericDeductions) || numericDeductions < 0) {
    throw new Error('Deductions must be a non-negative number');
  }

  const taxableIncome = Math.max(0, numericIncome - numericDeductions);
  let remainingIncome = taxableIncome;
  let totalTax = 0;

  const bracketDefinitions = [
    { name: 'Standard Allowance', limit: 10000, rate: 0.0 },
    { name: 'Basic Rate', limit: 40000, rate: 0.10 },     // 10,001 to 50,000
    { name: 'Higher Rate', limit: 50000, rate: 0.20 },    // 50,001 to 100,000
    { name: 'Additional Rate', limit: Infinity, rate: 0.30 } // Above 100,000
  ];

  const breakdown = [];

  for (const bracket of bracketDefinitions) {
    if (remainingIncome <= 0) {
      breakdown.push({
        bracket: bracket.name,
        taxableAmount: 0,
        rate: bracket.rate,
        taxOwed: 0
      });
      continue;
    }

    const amountInBracket = Math.min(remainingIncome, bracket.limit);
    const taxForBracket = Math.round(amountInBracket * bracket.rate * 100) / 100;

    totalTax += taxForBracket;
    remainingIncome -= amountInBracket;

    breakdown.push({
      bracket: bracket.name,
      taxableAmount: amountInBracket,
      rate: bracket.rate,
      taxOwed: taxForBracket
    });
  }

  const netIncome = Math.round((numericIncome - totalTax) * 100) / 100;
  const effectiveRate = taxableIncome > 0 ? Math.round((totalTax / taxableIncome) * 10000) / 100 : 0;

  return {
    grossIncome: numericIncome,
    deductions: numericDeductions,
    taxableIncome,
    taxOwed: Math.round(totalTax * 100) / 100,
    netIncome,
    effectiveRate, // in percentage, e.g. 15.25%
    breakdown
  };
}

module.exports = { calculateTax };
