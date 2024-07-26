import { OnEvent } from "@nestjs/event-emitter";
import { BlockNumberEvent } from "../events/BlockNumberEvent";
import { Injectable, Logger } from "@nestjs/common";
import { ProvidersService } from "../blockchain/providers/providers.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Blocks } from "../entities/Blocks";
import { Transactions } from "../entities/Transactions";

@Injectable()
export class BlockListeners {
    private readonly logger = new Logger(BlockListeners.name);

    private lastBlockNumber = 0;

    constructor(
        private readonly providersService: ProvidersService,
        @InjectRepository(Blocks)
        private blocksRepository: Repository<Blocks>,
        @InjectRepository(Transactions)
        private transactionsRepository: Repository<Transactions>,
    ) {}

    @OnEvent("blockchain.blocknumber")
    handleBlockNumber(payload: BlockNumberEvent) {
        if (!payload.crawling) {
            this.logger.log(`New Block Number: ${payload.blockNumber}`);
            if (this.lastBlockNumber >= payload.blockNumber) {
                this.logger.error("Block Number is not increasing!");
            }
            this.lastBlockNumber = payload.blockNumber;
        }
    }

    @OnEvent("blockchain.blocknumber", { async: true, promisify: true })
    async handleBlockNumberAndPullData(payload: BlockNumberEvent) {
        const block = await this.providersService
            .getProvider()
            .getBlock(payload.blockNumber, true);

        await this.blocksRepository.upsert(block, {
            conflictPaths: ["number"],
            skipUpdateIfNoValuesChanged: true,
        });

        const chainId = await this.providersService.getChainId();
        for (const [
            index,
            transaction,
        ] of block.prefetchedTransactions.entries()) {
            await this.transactionsRepository.upsert(
                {
                    ...transaction,
                    index,
                    chainId,
                    r: transaction.signature.r,
                    s: transaction.signature.s,
                    v: transaction.signature.v,
                    networkV: transaction.signature.networkV,
                },
                {
                    skipUpdateIfNoValuesChanged: true,
                    conflictPaths: ["hash"],
                },
            );
        }
    }
}
