import { Hex } from "viem";
import { checkStaking, hasNFT } from "@/services/status.service";
import { isValidEthereumAddress } from "@/api/config";

export async function getStatusController(
  _: Request,
  { params }: { params: Promise<{ address: Hex }> }
) {
  try {
    const { address } = await params;
    if (!address || !isValidEthereumAddress(address)) {
      return Response.json({ message: "Invalid Ethereum address" }, { status: 400 });
    }
    const stakingInfo = await checkStaking(address);
    const nft = await hasNFT(address);
    const canClaimNFT = !nft && stakingInfo.claimed;
    return Response.json({
      user: stakingInfo.user,
      stakedAmount: stakingInfo.amount.toString(),
      stakingStartTime: stakingInfo.startTime.toString(),
      stakingClaimed: stakingInfo.claimed,
      canClaimNFT: canClaimNFT,
      hasValidNFT: nft,
    });
  } catch (error) {
    if (error instanceof Error) 
      return Response.json({ error: error.message }, { status: 500 });
    else
      return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
} 
