import { Injectable, Logger } from "@nestjs/common";
import { ProvidersService } from "../providers/providers.service";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { BlockNumberEvent } from "../../events/BlockNumberEvent";

@Injectable()
export class CrawlerService {
    private readonly logger = new Logger(CrawlerService.name);

    constructor(
        private readonly providersService: ProvidersService,
        private readonly eventEmitter: EventEmitter2,
    ) {}

    public async startCrawling() {
        this.logger.log("Starting crawler");

        const currentBlock = await this.providersService
            .getProvider()
            .getBlockNumber();

        for (
            let blockNumber = 18000000;
            blockNumber < currentBlock + 5;
            blockNumber++
        ) {
            this.logger.log("Crawling block " + blockNumber);

            await this.eventEmitter.emitAsync(
                "blockchain.blocknumber",
                new BlockNumberEvent(blockNumber, true),
            );
        }
    }
}
