import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "./Loan";

Entity("installments");
export class Installment {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  payable: number;

  @Column()
  interest: number;

  @Column()
  payableAdjusted: number;

  @Column()
  value: number;

  @Column()
  expiresIn: Date;

  @ManyToOne((type) => Loan, (loan) => loan.installments)
  loan: Loan;
}
