import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("loans")
export class Loan {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({ unique: true })
  cpf: string;

  @Column()
  uf: string;

  @Column()
  birthdate: Date;

  @Column()
  total: number;

  @Column()
  valueByMonth: number;
}
