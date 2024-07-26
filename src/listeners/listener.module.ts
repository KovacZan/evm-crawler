import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Logs } from "../entities/Logs";
import { BlockListeners } from "./BlockListeners";
import { LogListeners } from "./LogListeners";
import { ProvidersModule } from "../blockchain/providers/providers.module";
import { Blocks } from "../entities/Blocks";
import { Transactions } from "../entities/Transactions";
import { ERC20Transfers } from "../entities/erc20/ERC20Transfers";

@Module({
    imports: [
        TypeOrmModule.forFeature([Blocks, Transactions, Logs, ERC20Transfers]),
        ProvidersModule,
    ],
    controllers: [],
    providers: [BlockListeners, LogListeners],
    exports: [BlockListeners, LogListeners],
})
export class ListenerModule {}
