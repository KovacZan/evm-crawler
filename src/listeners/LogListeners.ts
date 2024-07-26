import { EventEmitter2, OnEvent } from "@nestjs/event-emitter";
import { Injectable, Logger } from "@nestjs/common";
import { LogEvent } from "../events/LogEvent";
import { InjectRepository } from "@nestjs/typeorm";
import { Logs } from "../entities/Logs";
import { Repository } from "typeorm";
import { ERC20Interface, TOPIC0_ERC20_TRANSFER } from "../utils/utils";
import { ERC20Transfers } from "../entities/erc20/ERC20Transfers";

@Injectable()
export class LogListeners {
    private readonly logger = new Logger(LogListeners.name);
    constructor(
        @InjectRepository(Logs)
        private logsRepository: Repository<Logs>,
        @InjectRepository(ERC20Transfers)
        private erc20TransferRepository: Repository<ERC20Transfers>,
        private eventEmitter: EventEmitter2,
    ) {}
    @OnEvent("blockchain.log", { async: true })
    async handleLog(payload: LogEvent) {
        await this.logsRepository.insert(payload);
        this.eventEmitter.emit(`blockchain.log.${payload.topics[0]}`, payload);
    }

    @OnEvent(`blockchain.log.${TOPIC0_ERC20_TRANSFER}`, { async: true })
    async handleERC20Transfer(payload: LogEvent) {
        try {
            const parsedLog = ERC20Interface.parseLog(payload);

            await this.erc20TransferRepository.insert({
                ...payload,
                from: parsedLog.args[0],
                to: parsedLog.args[1],
                value: parsedLog.args[2],
            });
            // NFT Transfer events has the same topic0 as ERC20 Transfer events
        } catch {}
    }
}
