import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UserModule} from './user/user.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            password: 'root',
            database: 'api-database',
            username: 'admin',
            port: 5432,
            host: 'api_database',
            entities: ['dist/**/*.entity.js'],
            synchronize: true,
        }),
        UserModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
