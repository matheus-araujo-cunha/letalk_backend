import * as yup from "yup";

const createLoanSchema = yup.object().shape({
  cpf: yup.string().required(),
  uf: yup.string().uppercase().required(),
  birthdate: yup.date().required(),
  total: yup.number().positive().required().min(50000),
  valueByMonth: yup.number().positive().required(),
});

const retrieveLoanSchema = yup.object().shape({
  total: yup.number(),
  interestRate: yup.number(),
  valueByMonth: yup.number(),
  monthsToPay: yup.number(),
  totalInterest: yup.number(),
  installments: yup.array().of(
    yup.object().shape({
      payable: yup.number(),
      interest: yup.number(),
      payableAdjusted: yup.number(),
      value: yup.number(),
      expiresIn: yup.date(),
    })
  ),
});

export { createLoanSchema, retrieveLoanSchema };
