import { MigrationInterface, QueryRunner } from "typeorm";

export class createLoanAndInstallmentTables1662686646887 implements MigrationInterface {
    name = 'createLoanAndInstallmentTables1662686646887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "UQ_550a0b34a67551afb91fef25f00"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "UQ_550a0b34a67551afb91fef25f00" UNIQUE ("cpf")`);
    }

}
