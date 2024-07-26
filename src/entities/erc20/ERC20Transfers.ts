import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class ERC20Transfers {
    @PrimaryColumn()
    transactionHash: string;

    @PrimaryColumn()
    index: number;

    @Column()
    transactionIndex: number;

    @Column()
    blockHash: string;

    @Column()
    blockNumber: number;

    @Column()
    address: string;

    @Column()
    data: string;

    @Column("jsonb")
    topics: string[];

    // CORE
    @Column()
    from: string;

    @Column()
    to: string;

    @Column({ type: "numeric" })
    value: bigint;
}
