import { MigrationInterface, QueryRunner } from "typeorm";

export class createLoanAndInstallmentsTables1662596970984 implements MigrationInterface {
    name = 'createLoanAndInstallmentsTables1662596970984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "installments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payable" numeric NOT NULL, "interest" numeric NOT NULL, "payableAdjusted" numeric NOT NULL, "value" numeric NOT NULL, "expiresIn" TIMESTAMP NOT NULL, "loanId" uuid, CONSTRAINT "PK_c74e44aa06bdebef2af0a93da1b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "loans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "cpf" character varying NOT NULL, "uf" character varying NOT NULL, "birthdate" TIMESTAMP NOT NULL, "total" integer NOT NULL, "valueByMonth" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_550a0b34a67551afb91fef25f00" UNIQUE ("cpf"), CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "installments" ADD CONSTRAINT "FK_b900fc2e2dd7f457a32fdd52850" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "installments" DROP CONSTRAINT "FK_b900fc2e2dd7f457a32fdd52850"`);
        await queryRunner.query(`DROP TABLE "loans"`);
        await queryRunner.query(`DROP TABLE "installments"`);
    }

}
