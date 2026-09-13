const { calculateTax } = require('../taxCalculator');

describe('Tax Calculator Logic', () => {
  it('should return zero tax when income is 0', () => {
    const result = calculateTax(0);
    expect(result.taxOwed).toBe(0);
    expect(result.taxableIncome).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });

  it('should calculate 0 tax for income within personal allowance ($10,000)', () => {
    const result = calculateTax(8000);
    expect(result.taxOwed).toBe(0);
    expect(result.taxableIncome).toBe(8000);
  });

  it('should calculate 10% tax for income in basic rate bracket ($30,000)', () => {
    const result = calculateTax(30000);
    expect(result.taxOwed).toBe(2000);
    expect(result.taxableIncome).toBe(30000);
    expect(result.netIncome).toBe(28000);
  });

  it('should calculate tax correctly for income spanning multiple brackets ($70,000)', () => {
    const result = calculateTax(70000);
    expect(result.taxOwed).toBe(8000);
    expect(result.netIncome).toBe(62000);
  });

  it('should calculate top bracket tax for high income ($150,000)', () => {
    const result = calculateTax(150000);
    expect(result.taxOwed).toBe(29000);
    expect(result.netIncome).toBe(121000);
  });

  it('should deduct allowable deductions from gross income accurately', () => {
    const result = calculateTax(50000, 10000);
    expect(result.taxableIncome).toBe(40000);
    expect(result.taxOwed).toBe(3000);
  });

  it('should throw an error for negative or invalid income values', () => {
    expect(() => calculateTax(-500)).toThrowError('Gross income must be a non-negative number');
  });
});
