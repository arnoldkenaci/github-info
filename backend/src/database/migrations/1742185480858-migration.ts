import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742185480858 implements MigrationInterface {
    name = 'Migration1742185480858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "githubId" character varying NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "name" character varying, "avatarUrl" character varying, "accessToken" character varying, CONSTRAINT "UQ_0d84cc6a830f0e4ebbfcd6381dd" UNIQUE ("githubId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "commits" ("id" SERIAL NOT NULL, "sha" character varying NOT NULL, "date" TIMESTAMP NOT NULL, "repositoryId" integer, CONSTRAINT "PK_87adcaf9b8d0f42fee0481c0917" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "repositories" ("id" SERIAL NOT NULL, "githubId" character varying NOT NULL, "name" character varying NOT NULL, "owner" character varying NOT NULL, "url" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_ef0c358c04b4f4d29b8ca68ddff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "commits" ADD CONSTRAINT "FK_442f37e28b7b5ae536a98546c88" FOREIGN KEY ("repositoryId") REFERENCES "repositories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "repositories" ADD CONSTRAINT "FK_2f29c355d9fefd2d8cf3bd79803" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "repositories" DROP CONSTRAINT "FK_2f29c355d9fefd2d8cf3bd79803"`);
        await queryRunner.query(`ALTER TABLE "commits" DROP CONSTRAINT "FK_442f37e28b7b5ae536a98546c88"`);
        await queryRunner.query(`DROP TABLE "repositories"`);
        await queryRunner.query(`DROP TABLE "commits"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
