use anchor_lang::prelude::*;

declare_id!("47YBnRTcL1rSLwiaShRtUbQoND3CZPkzZ2A4CdwMXGEP");

#[program]
pub mod todo {
    use super::*;

    pub fn intialize(
        ctx: Context<Intialaize>,
        id: u64,
        task_id: u64,
        message: String,
        title: String,
    ) -> Result<()> {
        let account = &mut ctx.accounts.accounts;

        account.id = id;

        account.task.push(Task {
            task_id,
            title,
            message,
            complete: false,
        });

        Ok(())
    }

    pub fn update(
        ctx: Context<Update>,
        id: u64,
        task_id: u64,
        message: String,
        title: String,
        complete: bool,
    ) -> Result<()> {
        let todo_list = &mut ctx.accounts.todo_list;

        require!(
            todo_list.id == id,
            TodoError::TodoListNotFound
        );

        for task in todo_list.task.iter_mut() {
            if task.task_id == task_id {
                task.title = title;
                task.message = message;
                task.complete = complete;

                return Ok(());
            }
        }

        err!(TodoError::TaskNotFound)
    }

    pub fn delete_todo_list(
        _ctx: Context<DeleteTodoList>,
        _id: u64,
    ) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct Intialaize<'info> {
    #[account(
        init,
        payer = signer,
        space = 8 + Todolist::INIT_SPACE,
        seeds = [
            b"todo",
            signer.key().as_ref(),
            &id.to_le_bytes(),
        ],
        bump
    )]
    pub accounts: Account<'info, Todolist>,

    #[account(mut)]
    pub signer: Signer<'info>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct Update<'info> {
    #[account(
        mut,
        seeds = [
            b"todo",
            signer.key().as_ref(),
            &id.to_le_bytes(),
        ],
        bump
    )]
    pub todo_list: Account<'info, Todolist>,

    pub signer: Signer<'info>,
}

#[derive(Accounts)]
#[instruction(id: u64)]
pub struct DeleteTodoList<'info> {
    #[account(
        mut,
        close = signer,
        seeds = [
            b"todo",
            signer.key().as_ref(),
            &id.to_le_bytes(),
        ],
        bump
    )]
    pub todo_list: Account<'info, Todolist>,

    #[account(mut)]
    pub signer: Signer<'info>,
}

#[account]
#[derive(InitSpace)]
pub struct Todolist {
    pub id: u64,

    #[max_len(100)]
    pub task: Vec<Task>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, InitSpace)]
pub struct Task {
    pub task_id: u64,

    #[max_len(15)]
    pub title: String,

    #[max_len(60)]
    pub message: String,

    pub complete: bool,
}

#[error_code]
pub enum TodoError {
    #[msg("Todo list ID does not exist.")]
    TodoListNotFound,

    #[msg("Task ID does not exist.")]
    TaskNotFound,

    #[msg("Task already exists.")]
    TaskAlreadyExists,

    #[msg("Maximum number of tasks reached.")]
    MaxTasksReached,

    #[msg("Title cannot be empty.")]
    EmptyTitle,

    #[msg("Message cannot be empty.")]
    EmptyMessage,

    #[msg("Unauthorized user.")]
    Unauthorized,
}