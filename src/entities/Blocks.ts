import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Blocks {
    @PrimaryColumn()
    number: number;

    @Column()
    hash: string;

    @Column()
    timestamp: number;

    @Column()
    parentHash: string;

    @Column()
    nonce: string;

    @Column({ type: "numeric" })
    difficulty: bigint;

    @Column({ type: "numeric" })
    gasLimit: bigint;

    @Column({ type: "numeric" })
    gasUsed: bigint;

    @Column()
    miner: string;

    @Column()
    extraData: string;

    @Column({ type: "numeric", nullable: true })
    baseFeePerGas: null | bigint;
}
