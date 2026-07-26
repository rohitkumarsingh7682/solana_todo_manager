"use client";

import * as anchor from "@coral-xyz/anchor";
import { SystemProgram } from "@solana/web3.js";
import {
    useAnchorWallet,
    useConnection,
} from "@solana/wallet-adapter-react";

import { getProvider } from "@/lib/Anchor_provider";
import { getProgram } from "@/lib/Program";
import { getTodoPda } from "@/lib/pda";

export function useTodo() {
    const { connection } = useConnection();
    const wallet = useAnchorWallet();

    if (!wallet) {
        return null;
    }

    const provider = getProvider(connection, wallet);
    const program = getProgram(provider);

    const initialize = async (
        id: anchor.BN,
        taskId: anchor.BN,
        title: string,
        message: string
    ) => {
        const [todoPda] = getTodoPda(
            program.programId,
            wallet.publicKey,
            id
        );

        await program.methods
            .intialize(id, taskId, message, title)
            .accountsPartial({
                accounts: todoPda,
                signer: wallet.publicKey,
                systemProgram: SystemProgram.programId,
            })
            .rpc();
    };

    const update = async (
        id: anchor.BN,
        taskId: anchor.BN,
        title: string,
        message: string,
        complete: boolean
    ) => {
        const [todoPda] = getTodoPda(
            program.programId,
            wallet.publicKey,
            id
        );

        await program.methods
            .update(id, taskId, message, title, complete)
            .accountsPartial({
                todoList: todoPda,
                signer: wallet.publicKey,
            })
            .rpc();
    };

    const close = async (id: anchor.BN) => {
        const [todoPda] = getTodoPda(
            program.programId,
            wallet.publicKey,
            id
        );

        await program.methods
            .deleteTodoList(id)
            .accountsPartial({
                todoList: todoPda,
                signer: wallet.publicKey,
            })
            .rpc();
    };

    const getTodo = async (id: anchor.BN) => {
        const [todoPda] = getTodoPda(
            program.programId,
            wallet.publicKey,
            id
        );

        return await program.account.todolist.fetch(todoPda);
    };

    return {
        initialize,
        update,
        close,
        getTodo,
    };
}