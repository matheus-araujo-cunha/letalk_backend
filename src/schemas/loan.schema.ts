import * as yup from "yup";

const createLoanSchema = yup.object().shape({
  cpf: yup.string().required(),
  uf: yup.string().uppercase().required(),
  birthdate: yup.date().required().min(50000),
  total: yup.number().positive(),
  valueByMonth: yup.number().positive(),
});

const retrieveLoanSchema = yup.object().shape({
  total: yup.number().required(),
  interestRate: yup.number().required(),
  valueByMonth: yup.number().required(),
  monthsToPay: yup.number().required(),
  totalInterest: yup.number().required(),
  installments: yup
    .array()
    .of(
      yup.object().shape({
        payable: yup.number().required(),
        interest: yup.number().required(),
        payableAdjusted: yup.number().required(),
        value: yup.number().required(),
        expiresIn: yup.date().required(),
      })
    )
    .required(),
});

export { createLoanSchema, retrieveLoanSchema };
