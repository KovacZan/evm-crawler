import { Injectable } from "@nestjs/common";
import { BlockchainListener } from "./blockchain/listeners/blockchain.listener";
import { CrawlerService } from "./blockchain/crawler/crawler.service";

@Injectable()
export class AppService {
    constructor(
        private readonly crawlerService: CrawlerService,
        private readonly blockchainListener: BlockchainListener,
    ) {}
    async start() {
        void this.crawlerService.startCrawling();
        void this.blockchainListener.startListening();
    }
}
