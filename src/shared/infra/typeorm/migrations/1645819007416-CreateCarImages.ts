import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCarImages1645819007416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "cars_image",
                columns: [
                    {name: "id", type: "UUID", isPrimary: true},
                    {name: "car_id", type: "UUID"},
                    {name: "image_name", type: "varchar"},
                    {name: "created_at", type: "timestamp", default: "now()"}
                ],
                foreignKeys: [
                    {
                        name: "FKCarImage",
                        referencedTableName: "cars",
                        referencedColumnNames: ["id"],
                        columnNames: ["car_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("cars_image");
    }

}
