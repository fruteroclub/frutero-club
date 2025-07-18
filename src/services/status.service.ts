import { Hex } from "viem";
import { VAULT_ABI, MEMBERSHIP_ABI } from "@/abis";
import { initializeVaultChainClients, initializeNFTChainClients } from "@/api/config";

const { publicClient: vaultClient } = initializeVaultChainClients();
const { publicClient: nftClient } = initializeNFTChainClients();

type StakingInfo = { user: Hex, amount: bigint, startTime: bigint, claimed: boolean };

export async function checkStaking(address: Hex) {
  const stakedAmount = await vaultClient.readContract({
    address: process.env.VAULT_ADDRESS as Hex,
    abi: VAULT_ABI,
    functionName: "getStakingInfo",
    args: [address]
  }) as StakingInfo;
  return stakedAmount;
}

export async function hasNFT(address: Hex) {
  return await nftClient.readContract({
    address: process.env.MEMBERSHIP_ADDRESS as Hex,
    abi: MEMBERSHIP_ABI,
    functionName: 'hasValidToken',
    args: [address]
  }) as boolean;
} 
