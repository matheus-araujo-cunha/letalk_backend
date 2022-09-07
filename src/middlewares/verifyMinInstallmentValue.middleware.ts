import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../errors/errorHandler";

const verifyMinInstallmentValue = (
  { validated }: Request,
  res: Response,
  next: NextFunction
) => {
  const totalLoan = validated.total as number;

  const payToMonth = validated.valueByMonth as number;

  const minimalInstallment = (1 / 100) * totalLoan;

  if (payToMonth < minimalInstallment) {
    throw new ErrorHandler(
      422,
      "The minimum amount of an installment must be 1% of the loan!"
    );
  }

  return next();
};

export default verifyMinInstallmentValue;
