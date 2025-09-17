import { MikroORM } from "@mikro-orm/core";
import { MySqlDriver } from "@mikro-orm/mysql";
import { SqlHighlighter } from "@mikro-orm/sql-highlighter";

export const orm = await MikroORM.init({
    entities: ['dist/**/*.entity.js'],
    entitiesTs: ['src/**/*.entity.ts'],
    dbName: 'ftdb',
    driver: MySqlDriver,
    clientUrl:'mysql://root:1234@localhost:3306/ftdb',
    highlighter: new SqlHighlighter(),
    debug: true,
    schemaGenerator:{
        disableForeignKeys: true,
        createForeignKeyConstraints: true,
        ignoreSchema:[],
    },
})

export const syncSchema = async () => {
    const generator = orm.getSchemaGenerator()
    await generator.dropSchema()
    await generator.createSchema()
    await generator.updateSchema()
}