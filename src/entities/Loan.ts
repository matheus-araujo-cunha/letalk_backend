import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Installment } from "./Installment";

@Entity("loans")
export class Loan {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column()
  cpf: string;

  @Column()
  uf: string;

  @Column()
  birthdate: Date;

  @Column()
  total: number;

  @Column()
  valueByMonth: number;

  @CreateDateColumn()
  createdAt?: Date;

  @OneToMany((type) => Installment, (installment) => installment.loan, {
    eager: true,
  })
  installments: Installment[];
}
