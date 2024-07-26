import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { CrawlerService } from "./crawler.service";
import { ProvidersModule } from "../providers/providers.module";

@Module({
    imports: [ConfigModule, ProvidersModule],
    providers: [CrawlerService],
    exports: [CrawlerService],
})
export class CrawlerModule {}
