import { BigNumber, getContractAddressesForChainOrThrow, SignedOrder } from "0x.js";
// import ethers from "ethers";
import { parseEther } from "ethers/lib/utils";

import { orderCalculationUtils, assetDataUtils, signatureUtils, rateUtils, orderHashUtils, Order } from "@0x/order-utils";

const contractAddresses = getContractAddressesForChainOrThrow(1);
const order: Order = {
    chainId: 1,
    exchangeAddress: contractAddresses.exchange,
    expirationTimeSeconds: new BigNumber(Math.floor(Date.now() / 1000 + 3600)),
    feeRecipientAddress: "0x0000000000000000000000000000000000000000",
    makerAddress: "0x17525e4f4af59fbc29551bc4ece6ab60ed49ce31",
    makerAssetAmount: new BigNumber(parseEther("0.1").toString()),
    makerAssetData: assetDataUtils.encodeERC20AssetData("0xc011a73ee8576fb46f5e1c5751ca3b9fe0af2a6f"),
    makerFee: new BigNumber(0),
    makerFeeAssetData: "0x00",
    senderAddress: "0x0000000000000000000000000000000000000000",
    takerAddress: "0x0000000000000000000000000000000000000000",
    takerAssetAmount: new BigNumber(parseEther("0.1").toString()),
    takerAssetData: assetDataUtils.encodeERC20AssetData("0x8798249c2E607446EfB7Ad49eC89dD1865Ff4272"),
    takerFee: new BigNumber(0),
    takerFeeAssetData: "0x00",
    salt: new BigNumber(Math.floor(Date.now() * 1000 + 3600))
}

const signature = "0x06";

console.log("Order:")
console.log(order);


const orderHash = orderHashUtils.getOrderHash(order);

const signedOrder: SignedOrder = {
    ...order,
    signature
}

console.log("signedOrder");
console.log(signedOrder);

console.log("OrderHash:", orderHash);

