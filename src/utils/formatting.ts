export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value / 100);
};

export const parseCurrency = (valueString: string | number): number => {
  // Remove R$, dots, and convert comma to dot
  if (typeof valueString === 'number') return valueString;
  const cleanString = valueString.replace(/[R$\s.]/g, '').replace(',', '.');
  return parseFloat(cleanString) || 0;
};
