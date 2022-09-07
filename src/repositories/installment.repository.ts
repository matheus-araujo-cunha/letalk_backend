import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Installment } from "../entities/Installment";

interface IInstallmentRepo {
  save: (installments: Partial<Installment>[]) => Promise<Installment[]>;
  findOne: (installmentId: string) => Promise<Installment | null>;
}

class InstallmentRepository implements IInstallmentRepo {
  private installmentRepo: Repository<Installment>;

  constructor() {
    this.installmentRepo = AppDataSource.getRepository(Installment);
  }

  save = async (installments: Partial<Installment>[]) => {
    const insertedInstallments = await this.installmentRepo
      .createQueryBuilder()
      .insert()
      .values(installments)
      .execute();

    const returnInstallments: Installment[] = [];

    for (let { id } of insertedInstallments.generatedMaps) {
      const currentInstallment = (await this.findOne(id)) as Installment;
      returnInstallments.push(currentInstallment);
    }

    return returnInstallments;
  };

  findOne = async (installmentId: string) =>
    await this.installmentRepo.findOneBy({ id: installmentId });
}

export default new InstallmentRepository();
