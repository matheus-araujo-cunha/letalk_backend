import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Loan } from "./Loan";

@Entity("installments")
export class Installment {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ type: "numeric" })
  payable: number;

  @Column({ type: "numeric" })
  interest: number;

  @Column({ type: "numeric" })
  payableAdjusted: number;

  @Column({ type: "numeric" })
  value: number;

  @Column()
  expiresIn: Date;

  @ManyToOne((type) => Loan, (loan) => loan.installments)
  loan: Loan;
}
