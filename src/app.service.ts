import { Injectable } from "@nestjs/common";
import { BlockchainListener } from "./blockchain/listeners/blockchain.listener";

@Injectable()
export class AppService {
    constructor(
        private readonly blockchainListener: BlockchainListener,
    ) {}
    async start() {
        void this.blockchainListener.startListening();
    }
}
