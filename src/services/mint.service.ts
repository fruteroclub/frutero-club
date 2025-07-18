import { Hex } from "viem";
import { MEMBERSHIP_ABI } from "@/abis";
import { initializeNFTChainClients } from "@/app/api/config";

const { account, publicClient, walletClient } = initializeNFTChainClients();

export async function mintNFT(address: Hex) {
  const { request } = await publicClient.simulateContract({
    account,
    address: process.env.MEMBERSHIP_ADDRESS as Hex,
    abi: MEMBERSHIP_ABI,
    functionName: 'mint',
    args: [address]
  });
  
  const hash = await walletClient.writeContract(request);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  
  return { hash, blockNumber: receipt.blockNumber.toString() };
}
