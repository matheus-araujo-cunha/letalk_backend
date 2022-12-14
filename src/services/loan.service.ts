import { Request } from "express";
import { Installment } from "../entities/Installment";
import installmentRepository from "../repositories/installment.repository";
import loanRepository from "../repositories/loan.repository";
import { retrieveLoanSchema } from "../schemas/loan.schema";
import {
  addMonth,
  calculateInterest,
  findInterestRate,
  isDecimal,
} from "../utils";

class LoanService {
  simulateLoan = async ({ validated: requestLoan }: Request) => {
    const loan = await loanRepository.save(requestLoan);

    let monthsToPay = requestLoan.total / requestLoan.valueByMonth;

    if (isDecimal(monthsToPay)) {
      monthsToPay = parseInt(monthsToPay.toString()) + 1;
    }

    const interestRate = findInterestRate(requestLoan.uf);

    const installmentsOfLoan = [];

    let totalInterest = 0;

    for (let index = 1; index <= monthsToPay + 1; index++) {
      const currentTotal = Number(requestLoan.total.toFixed(2));

      if (currentTotal < 0) {
        continue;
      }

      let valueInstallment = requestLoan.valueByMonth;

      const interest = calculateInterest(requestLoan.total, interestRate);

      if (currentTotal < valueInstallment) {
        valueInstallment = currentTotal + interest;
      }

      totalInterest += interest;
      requestLoan.total += interest;
      const totalAdjusted = requestLoan.total;

      const currentDate = new Date();

      const expiresIn = addMonth(currentDate, index);

      const installment: Installment = {
        payable: currentTotal,
        interest,
        payableAdjusted: totalAdjusted,
        value: valueInstallment,
        expiresIn,
        loan,
      };

      installmentsOfLoan.push(installment);
      requestLoan.total -= requestLoan.valueByMonth;
    }

    const installments = await installmentRepository.save(installmentsOfLoan);

    const result = {
      ...loan,
      installments,
      monthsToPay,
      totalInterest,
      interestRate: interestRate * 100,
    };

    return await retrieveLoanSchema.validate(result, { stripUnknown: true });
  };
}

export default new LoanService();
