import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImage1606873053459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'image',
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
                    name: 'id_orphanage',
                    type: 'integer',
                },
                {
                    name: 'path',
                    type: 'varchar'
                },
            ],
            foreignKeys: [
                {
                    name: 'fk_image_orphanage',
                    columnNames: ['id_orphanage'],
                    referencedTableName: 'orphanage',
                    referencedColumnNames: ['id'],
                    onUpdate: 'CASCADE',
                    onDelete: 'CASCADE'
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('image')
    }

}
