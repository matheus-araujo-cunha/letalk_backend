const isDecimal = (value: number) =>
  parseInt(value.toString()) != parseFloat(value.toString());

const interestRateMap = {
  MG: 0.01,
  SP: 0.008,
  RJ: 0.009,
  ES: 0.0111,
};

const findInterestRate = (uf: string) => {
  const arrOfStates = Object.keys(interestRateMap);

  if (arrOfStates.includes(uf)) {
    const [state, interest] = Object.entries(interestRateMap).find(
      ([s, i]) => s === uf
    ) as string | number[];

    return interest as number;
  }

  return 0;
};

const calculateInterest = (capital: number, interestRate: number) => {
  return Number((capital * interestRate).toFixed(2));
};

const addMonth = (date: Date, quantity: number) => {
  date.setMonth(date.getMonth() + quantity);

  return date;
};

export { isDecimal, calculateInterest, findInterestRate, addMonth };
