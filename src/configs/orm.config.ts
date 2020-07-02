import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    username: 'postgres',
    password: '123',
    port: 5432,
    host: '127.0.0.1',
    database: 'fullstack_bd',
    synchronize: true,
    entities: ['dist/**/*.entity{.ts,.js}']
};