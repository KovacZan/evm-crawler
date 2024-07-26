import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Transactions {
    @Column()
    blockNumber: number;

    @Column()
    blockHash: string;

    @Column()
    index: number;

    @PrimaryColumn()
    hash: string;

    @Column()
    type: number;

    @Column({ nullable: true })
    to: null | string;

    @Column()
    from: string;

    @Column()
    nonce: number;

    @Column({ type: "numeric" })
    gasLimit: bigint;

    @Column({ type: "numeric" })
    gasPrice: bigint;

    @Column({ type: "numeric", nullable: true })
    maxPriorityFeePerGas: null | bigint;

    @Column({ type: "numeric", nullable: true })
    maxFeePerGas!: null | bigint;

    @Column()
    data: string;

    @Column({ type: "numeric" })
    value: bigint;

    @Column({ type: "numeric" })
    chainId: bigint;

    @Column()
    r: string;

    @Column()
    s: string;

    @Column()
    v: number;

    @Column({ type: "numeric", nullable: true })
    networkV: null | bigint;

    @Column({ type: "jsonb", nullable: true })
    accessList: null | { address: string; storageKeys: string[] }[];
}
