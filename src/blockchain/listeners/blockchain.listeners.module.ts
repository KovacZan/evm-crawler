import { Module } from "@nestjs/common";
import { BlockchainListener } from "./blockchain.listener";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [BlockchainListener],
    exports: [BlockchainListener],
})
export class BlockchainListenersModule {}
