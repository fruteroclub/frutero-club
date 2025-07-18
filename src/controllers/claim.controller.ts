import { Hex } from "viem";
import { isValidEthereumAddress } from "@/api/config";
import { checkStaking, hasNFT } from "@/services/status.service";
import { mintNFT } from "@/services/mint.service";

export async function claimController(req: Request) {
  try {
    const { address } = await req.json() as { address: Hex};

    if (!address || !isValidEthereumAddress(address)) {
      return Response.json({ error: 'Invalid address'}, { status: 400 });
    }

    if (await hasNFT(address)) {
      return Response.json({ error: 'Already has NFT' }, { status: 400 });
    }

    const stakingInfo = await checkStaking(address);
    if (stakingInfo.amount == BigInt(0)) {
      return Response.json({ error: 'Need to stake on PulpaStaking' }, { status: 400 });
    } else if (stakingInfo.startTime > 0 && !stakingInfo.claimed) {
      return Response.json({ error: 'Need to claim the staking first' }, { status: 400 });
    } 

    const result = await mintNFT(address);
    return Response.json({ success: true, transaction: result });
  } catch (error) {
    if (error instanceof Error) 
      return Response.json({ error: error.message }, { status: 500 });
    else
      return Response.json({ error: "Unexpected error" }, { status: 500 });
  }
}
