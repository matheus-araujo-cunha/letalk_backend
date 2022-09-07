import { Loan } from "../../src/entities/Loan";

declare global {
  namespace Express {
    interface Request {
      validated: Loan;
    }
  }
}
