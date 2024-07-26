export class LogEvent {
    public constructor(
        public readonly transactionHash: string,
        public readonly blockHash: string,
        public readonly blockNumber: number,
        public readonly removed: boolean,
        public readonly address: string,
        public readonly data: string,
        public readonly topics: string[],
        public readonly index: number,
        public readonly transactionIndex: number,
    ) {}
}
