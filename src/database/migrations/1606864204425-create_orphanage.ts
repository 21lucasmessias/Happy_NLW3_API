import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createOrphanage1606864204425 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'orphanage',
            columns: [
                {
                    name: 'id',
                    type: 'integer',
                    unsigned: true,
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'latitude',
                    type: 'decimal',
                },
                {
                    name: 'longitude',
                    type: 'decimal',
                },
                {
                    name: 'number',
                    type: 'varchar',
                },
                {
                    name: 'about',
                    type: 'text',
                },
                {
                    name: 'instructions',
                    type: 'text',
                },
                {
                    name: 'schedule',
                    type: 'text',
                },
                {
                    name: 'weekend',
                    type: 'boolean',
                    default: false,
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('orphanage');
    }

}
