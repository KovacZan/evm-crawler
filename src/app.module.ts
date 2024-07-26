import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import configurations from "./config/configurations";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ListenerModule } from "./listeners/listener.module";
import { BlockchainListenersModule } from "./blockchain/listeners/blockchain.listeners.module";

@Module({
    imports: [
        ConfigModule.forRoot({
            load: [configurations],
        }),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: configurations().database.host,
            port: configurations().database.port,
            username: configurations().database.username,
            password: configurations().database.password,
            database: configurations().database.databaseName,
            // dropSchema: true,
            autoLoadEntities: true,
            synchronize: true,
        }),
        EventEmitterModule.forRoot(),
        BlockchainListenersModule,
        ListenerModule,
    ],
    controllers: [],
    providers: [AppService],
})
export class AppModule {}
