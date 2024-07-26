import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class Logs {
    @PrimaryColumn()
    transactionHash: string;

    @Column()
    blockHash: string;

    @Column()
    blockNumber: number;

    @Column({ default: false })
    removed: boolean;

    @Column()
    address: string;

    @Column()
    data: string;

    @Column("jsonb")
    topics: string[];

    @PrimaryColumn()
    index: number;

    @Column()
    transactionIndex: number;
}
