export class BlockNumberEvent {
    constructor(
        public readonly blockNumber: number,
        public readonly crawling: boolean = false,
    ) {}
}
