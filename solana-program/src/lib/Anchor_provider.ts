import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection} from "@solana/web3.js";
import { AnchorWallet } from "@solana/wallet-adapter-react";


export function getProvider(
    connection: Connection,
    wallet: AnchorWallet
): AnchorProvider {
    return new AnchorProvider(connection, wallet, {
        commitment: "confirmed",
    });
}