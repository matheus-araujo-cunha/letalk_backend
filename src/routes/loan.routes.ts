import { Router } from "express";
import LoanController from "../controllers/loan.controller";
import validateSchema from "../middlewares/validateShema.middleware";
import verifyMinInstallmentValue from "../middlewares/verifyMinInstallmentValue.middleware";
import { createLoanSchema } from "../schemas/loan.schema";

const routes = Router();

export const LoanRoutes = () => {
  routes.post(
    "/loans",
    validateSchema(createLoanSchema),
    verifyMinInstallmentValue,
    LoanController.simulateLoan
  );

  return routes;
};
