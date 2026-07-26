import * as anchor from "@coral-xyz/anchor";

export const getTodoPda = (
    programId: anchor.web3.PublicKey,
    user: anchor.web3.PublicKey,
    id: anchor.BN
) => {
    return anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("todo"),
            user.toBuffer(),
            id.toArrayLike(Buffer, "le", 8),
        ],
        programId
    );
};