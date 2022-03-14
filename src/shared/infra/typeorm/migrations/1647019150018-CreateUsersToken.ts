import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1647019150018 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'users_tokens',
                columns: [
                    {
                        name: 'id',
                        type: 'UUID',
                        isPrimary: true,
                    },
                    {
                        name: 'refresh_token',
                        type: 'varchar',
                    },
                    {
                        name: 'user_id',
                        type: 'UUID',
                    },
                    {
                        name: 'expiration_date',
                        type: 'timestamp',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
                foreignKeys: [
                    {
                        name: 'FKUserToken',
                        referencedTableName: 'users',
                        referencedColumnNames: ['id'],
                        columnNames: ['user_id'],
                        onDelete: 'CASCADE',
                        onUpdate: 'CASCADE',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
