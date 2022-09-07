import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Loan } from "../entities/Loan";

interface ILoanRepo {
  save: (loan: Partial<Loan>) => Promise<Loan>;
  //   retrieve: () => Promise<any>;
}

class LoanRepository implements ILoanRepo {
  private loanRepo: Repository<Loan>;

  constructor() {
    this.loanRepo = AppDataSource.getRepository(Loan);
  }

  save = async (loan: Partial<Loan>) => await this.loanRepo.save({ ...loan });

  //   retrieve = async () => await
}

export default new LoanRepository();
