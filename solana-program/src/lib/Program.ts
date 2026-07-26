import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";

import idl from "@/idl/todo.json";

import type { Todo } from "./todo";


export function getProgram (
    provider : anchor.AnchorProvider
) : Program<Todo>{
    return new Program<Todo> (
        idl as Todo, 
        provider
    )

}