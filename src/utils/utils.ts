import { ethers } from "ethers";
import * as ERC20AbiImport from "./abis/erc20.json";

export const ERC20Abi = ERC20AbiImport;
export const ERC20Interface = new ethers.Interface(ERC20Abi);

export const TOPIC0_ERC20_TRANSFER = ethers.id(
    "Transfer(address,address,uint256)",
);
export const TOPIC0_ERC721_TRANSFER = ethers.id(
    "Transfer(address,address,uint256)",
);
