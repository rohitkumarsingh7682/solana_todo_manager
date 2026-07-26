export interface Task {
    taskId: number; 
    title: string; 
    message: string; 
    complete: boolean;
}


export interface Todo{
    id: number;
    signer: string; 
    tasks: Task[]; 

}