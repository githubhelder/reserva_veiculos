import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSpecificationsCars1645468298309 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "specifications_cars",
                columns: [
                    {
                        name: "car_id",
                        type: "UUID"   
                    },
                    {
                        name: "specification_id",
                        type: "UUID"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKSpecificationCars",
                referencedTableName: "specifications",
                referencedColumnNames: ["id"],
                columnNames: ["specification_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: "FKCarsSpecification",
                referencedTableName: "cars",
                referencedColumnNames: ["id"],
                columnNames: ["car_id"],
                onDelete: "SET NULL",
                onUpdate: "SET NULL",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            "specifications_cars",
            "FKCarsSpecification"
        );

        await queryRunner.dropForeignKey(
            "specifications_cars",
            "FKSpecificationCars"
        );

        await queryRunner.dropTable("specifications_cars");
    }

}
