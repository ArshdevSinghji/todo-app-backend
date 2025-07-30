import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1753881883610 implements MigrationInterface {
    name = 'Init1753881883610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("taskId" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying NOT NULL, "startTime" TIMESTAMP NOT NULL, "endTime" TIMESTAMP NOT NULL, "createdBy" integer, CONSTRAINT "PK_c5a68aa4b5c8d38a06f8e8d4c57" PRIMARY KEY ("taskId"))`);
        await queryRunner.query(`CREATE TYPE "public"."assigned_task_iscompleted_enum" AS ENUM('true', 'false')`);
        await queryRunner.query(`CREATE TABLE "assigned_task" ("assignedTaskId" SERIAL NOT NULL, "isCompleted" "public"."assigned_task_iscompleted_enum" NOT NULL, "userId" integer, "taskId" integer, CONSTRAINT "PK_bec2bfef092845199e9b5fb076b" PRIMARY KEY ("assignedTaskId"))`);
        await queryRunner.query(`CREATE TABLE "user" ("uid" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_df955cae05f17b2bcf5045cc021" PRIMARY KEY ("uid"))`);
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "FK_0d5ad69a41a534dea0c786e7a6f" FOREIGN KEY ("createdBy") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_5af6792f046edad23ec78db9326" FOREIGN KEY ("userId") REFERENCES "user"("uid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "assigned_task" ADD CONSTRAINT "FK_683d1140bf462110686c80f33e1" FOREIGN KEY ("taskId") REFERENCES "task"("taskId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_683d1140bf462110686c80f33e1"`);
        await queryRunner.query(`ALTER TABLE "assigned_task" DROP CONSTRAINT "FK_5af6792f046edad23ec78db9326"`);
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "FK_0d5ad69a41a534dea0c786e7a6f"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "assigned_task"`);
        await queryRunner.query(`DROP TYPE "public"."assigned_task_iscompleted_enum"`);
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
