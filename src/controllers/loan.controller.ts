import { Request, Response } from "express";
import LoanService from "../services/loan.service";

class LoanController {
  simulateLoan = async (req: Request, res: Response) => {
    const loanSimulated = await LoanService.simulateLoan(req);

    return res.status(201).json(loanSimulated);
  };
}

export default new LoanController();
