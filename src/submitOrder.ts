import { SignedOrder } from "0x.js";
import axios from "axios";



const order = { 
    chainId: 1,
    exchangeAddress: '0x61935cbdd02287b511119ddb11aeb42f1593b7ef',
    expirationTimeSeconds: 1610990518,
    feeRecipientAddress: '0x0000000000000000000000000000000000000000',
    makerAddress: '0x17525e4f4af59fbc29551bc4ece6ab60ed49ce31',
    makerAssetAmount: 100000000000000000,
    makerAssetData:
     '0xf47261b0000000000000000000000000c011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f',
    makerFee: 0,
    makerFeeAssetData: '0x00',
    senderAddress: '0x0000000000000000000000000000000000000000',
    takerAddress: '0x0000000000000000000000000000000000000000',
    takerAssetAmount: 100000000000000000,
    takerAssetData:
     '0xf47261b00000000000000000000000008798249c2e607446efb7ad49ec89dd1865ff4272',
    takerFee: 0,
    takerFeeAssetData: '0x00',
    salt: 1610986918754600,
    signature: '0x06' }


const apiUrl = "https://api.0x.org/sra/v3";
const instance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
});

async function postOrder() {
    try {
        const result = await instance.post("/order", order);
        console.log(result);
    } catch (error) {
        console.log(JSON.stringify(error));
    }
    
    
}


postOrder();
