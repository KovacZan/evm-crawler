import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { WebSocketProvider } from "ethers";

@Injectable()
export class ProvidersService {
    private readonly provider: WebSocketProvider;
    private chainId: bigint;
    constructor(private configService: ConfigService) {
        this.provider = new WebSocketProvider(
            this.configService.get<string>("wsUrl"),
        );
    }

    public getProvider(): WebSocketProvider {
        return this.provider;
    }

    public async getChainId(): Promise<bigint> {
        if (!this.chainId) {
            this.chainId = await this.provider
                .getNetwork()
                .then((network) => network.chainId);
        }
        return this.chainId;
    }
}
