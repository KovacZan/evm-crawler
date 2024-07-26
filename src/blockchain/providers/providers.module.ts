import { Module } from "@nestjs/common";
import { ProvidersService } from "./providers.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [ConfigModule],
    providers: [ProvidersService],
    exports: [ProvidersService],
})
export class ProvidersModule {}
