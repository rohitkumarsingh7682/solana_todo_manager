import * as anchor from "@coral-xyz/anchor";
import { Todo } from "../target/types/todo";
import { Program } from "@coral-xyz/anchor";


describe("todod", () => {
    const provider = anchor.AnchorProvider.env();
    anchor.setProvider(provider);

    const program = anchor.workspace.Todo as Program<Todo>;
    const id = new anchor.BN(1);
    const taskId = new anchor.BN(1);
    const [TodoPda] = anchor.web3.PublicKey.findProgramAddressSync(
        [
            Buffer.from("todo"),
            provider.wallet.publicKey.toBuffer(),
            id.toArrayLike(Buffer, "le", 8),
        ],
        program.programId
    );

    it("Intilaize", async () => {
        await program.methods.intialize(id, taskId, "Learn Anchor ", "My first Todo").accountsPartial({
            accounts: TodoPda,
            signer: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
            .rpc();

    })
    it("Update", async () => {
        await program.methods.update(id, taskId, "update_anchor ", "anchor is updated ", true).accountsPartial({
            accounts: TodoPda,
            signer: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
            .rpc();
    })

    it('delete_todo_list' , async () => {
        await program.methods.deleteTodoList(id).accountsPartial({
            accounts : TodoPda, 
            signer: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId, 
            
        })

    })


})