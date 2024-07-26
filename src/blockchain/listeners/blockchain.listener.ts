import { Injectable } from "@nestjs/common";
import { WebSocketProvider } from "ethers";
import { ConfigService } from "@nestjs/config";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { BlockNumberEvent } from "../../events/BlockNumberEvent";
import { LogEvent } from "../../events/LogEvent";

@Injectable()
export class BlockchainListener {
    public readonly provider: WebSocketProvider;

    constructor(
        private eventEmitter: EventEmitter2,
        private configService: ConfigService,
    ) {
        this.provider = new WebSocketProvider(
            this.configService.get<string>("wsUrl"),
        );
    }
    async startListening() {
        // On all events
        void this.provider.on([], (log) => {
            this.eventEmitter.emit(
                "blockchain.log",
                new LogEvent(
                    log.transactionHash,
                    log.blockHash,
                    log.blockNumber,
                    log.removed,
                    log.address,
                    log.data,
                    log.topics,
                    log.index,
                    log.transactionIndex,
                ),
            );
        });

        void this.provider.on("block", (blockNumber) => {
            this.eventEmitter.emit(
                "blockchain.blocknumber",
                new BlockNumberEvent(blockNumber),
            );
        });

        setTimeout(() => {}, Math.pow(2, 31) - 1);
    }
}
