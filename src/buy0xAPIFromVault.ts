require("dotenv").config();

import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import erc20ABI from "./abis/erc20.json";
import experiPieABI from "./abis/experiPie.json";

const axios = require('axios');

const baseUrl = 'https://api.0x.org/swap/v1/'
const slippage = 1;

const buyToken = "0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f";
const sellToken = "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2";

const sellAmount = parseEther("0.1").toString();

console.log( process.env.INFURA_API_KEY);

const provider = new ethers.providers.InfuraProvider("homestead", process.env.INFURA_API_KEY);
const wallet = new ethers.Wallet(process.env.MAINNET_PRIVATE_KEY, provider);
wallet.connect(provider);

async function main() {
    const callUrl = `${baseUrl}quote?sellAmount=${sellAmount}&buyToken=${buyToken}&sellToken=${sellToken}&slippagePercentage=${slippage/100}`;

    const quote = (await axios.get(callUrl)).data;

    console.log(quote);

    const targets: string[] = [];
    const data: string[] = [];

    const sellTokenContract = new ethers.Contract(sellToken, erc20ABI, wallet);
    const experiPie = new ethers.Contract("0x992e9f1d29e2fdb57a9e09a78e122fafe3720cc5", experiPieABI, wallet);

    const approvalTX = await sellTokenContract.populateTransaction.approve(quote.allowanceTarget, ethers.constants.MaxUint256);

    //Allowance
    targets.push(sellToken);
    data.push(approvalTX.data)


    //swap
    targets.push(quote.to);
    data.push(quote.data);
    
    await experiPie.callNoValue(targets, data, { gasLimit: 3000000});

}

main();