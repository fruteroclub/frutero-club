import { createPublicClient, createWalletClient, http } from 'viem';
import { mainnet, anvil } from 'viem/chains';
import { privateKeyToAccount } from 'viem/accounts';

export function isValidEthereumAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function getConfig() {
  return {
    port: process.env.PORT || 3000,
    vaultContractAddress: process.env.VAULT_CONTRACT_ADDRESS as `0x${string}`,
    membershipContractAddress: process.env.MEMBERSHIP_CONTRACT_ADDRESS as `0x${string}`,
    minimumStakeAmount: BigInt(process.env.MINIMUM_STAKE_AMOUNT || '0')
  };
}

// Chain configuration for vault and token (same chain)
export function initializeVaultChainClients() {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
  const isDev = process.env.NODE_ENV === "development";
  const publicClient = createPublicClient({
    chain: isDev ? anvil : mainnet,
    transport: isDev ? http(process.env.VAULT_CHAIN_RPC_URL || process.env.ANVIL_RPC) : http(process.env.VAULT_CHAIN_RPC_URL || process.env.ETHEREUM_RPC_URL),
  });

  const walletClient = createWalletClient({
    account,
    chain: isDev ? anvil : mainnet,
    transport: isDev ? http(process.env.VAULT_CHAIN_RPC_URL || process.env.ANVIL_RPC) : http(process.env.VAULT_CHAIN_RPC_URL || process.env.ETHEREUM_RPC_URL)
  });

  return { account, publicClient, walletClient };
}

// Chain configuration for NFT (separate chain)
export function initializeNFTChainClients() {
  const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`);
  const isDev = process.env.NODE_ENV === "development";
  const publicClient = createPublicClient({
    chain: isDev ? anvil : mainnet,
    transport: isDev ? http(process.env.NFT_CHAIN_RPC_URL) : http(process.env.NFT_CHAIN_RPC_URL || process.env.ETHEREUM_RPC_URL),
  });

  const walletClient = createWalletClient({
    account,
    chain: isDev ? anvil : mainnet,
    transport: isDev ? http(process.env.NFT_CHAIN_RPC_URL) : http(process.env.NFT_CHAIN_RPC_URL || process.env.ETHEREUM_RPC_URL)
  });

  return { account, publicClient, walletClient };
}
