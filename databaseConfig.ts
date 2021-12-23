import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

const config: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    username: 'root',
    password: 'Mohammad',
    database: 'mydb',
    entities: ['dist/**/*.entity{.ts ,.js}'],
    synchronize: true,
};

export default config;