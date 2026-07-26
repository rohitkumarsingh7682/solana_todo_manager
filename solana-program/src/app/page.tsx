"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import * as anchor from "@coral-xyz/anchor";
import { useTodo } from "@/hook/Todohook";
import { connection } from "@/lib/connection";
import { getTodoPda } from "@/lib/pda";

const WalletButton = dynamic(
  () => import("@/componets /ButtonProvider").then((mod) => mod.WalletButton),
  { ssr: false }
);

export default function Home() {
  const todo = useTodo();

  // Create Form State
  const [createId, setCreateId] = useState(1);
  const [createTaskId, setCreateTaskId] = useState(1);
  const [createTitle, setCreateTitle] = useState("");
  const [createMessage, setCreateMessage] = useState("");

  // Update Form State
  const [updateId, setUpdateId] = useState(1);
  const [updateTaskId, setUpdateTaskId] = useState(1);
  const [updateTitle, setUpdateTitle] = useState("");
  const [updateMessage, setUpdateMessage] = useState("");
  const [updateComplete, setUpdateComplete] = useState(false);

  // Fetch State
  const [fetchId, setFetchId] = useState(1);

  // Delete State
  const [deleteId, setDeleteId] = useState(1);

  // Loaded Account
  const [todoAccount, setTodoAccount] = useState<any>(null);

  if (!todo) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white p-6 relative overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center gap-6 text-center max-w-sm">
          <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
            <WalletButton />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Connect Your Wallet</h2>
            <p className="text-sm text-zinc-400">
              Please connect your Solana wallet to interact with your on-chain Todo program.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const handleInitialize = async () => {
    await todo.initialize(
      new anchor.BN(createId),
      new anchor.BN(createTaskId),
      createTitle,
      createMessage
    );
  };

  const handleUpdate = async () => {
    await todo.update(
      new anchor.BN(updateId),
      new anchor.BN(updateTaskId),
      updateTitle,
      updateMessage,
      updateComplete
    );
  };

  const handleDelet = async () => {
    await todo.close(new anchor.BN(deleteId));
  };

  const getdetails = async () => {
    const account = await todo.getTodo(new anchor.BN(fetchId));
    setTodoAccount(account);
    console.log(account);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-zinc-950 text-zinc-100 p-4 sm:p-8 relative overflow-hidden font-sans">
      {/* Background Gradients */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-5xl space-y-8 relative z-10">

        {/* TOP BAR / HEADER */}
        <header className="relative flex flex-col sm:flex-row items-center justify-between p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-2xl shadow-2xl shadow-black/60 gap-4 overflow-hidden group">

          {/* Ambient Subtle Glow Behind Header */}
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-500/15 rounded-full blur-2xl pointer-events-none transition-all duration-500 group-hover:bg-indigo-500/25" />
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-purple-500/15 rounded-full blur-2xl pointer-events-none transition-all duration-500 group-hover:bg-purple-500/25" />

          {/* Brand & Network Indicator */}
          <div className="relative z-10 flex items-center gap-3.5 text-center sm:text-left">
            {/* Logo Badge Icon */}
            <div className="hidden sm:flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white shadow-lg shadow-indigo-500/20 ring-1 ring-white/20">
              <span className="text-xl">⚡</span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-lg sm:text-xl font-black tracking-wider uppercase text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                  Solana Todo Manager
                </h1>

                {/* Network Status Badge */}
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-950">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  Devnet
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-medium">Manage on-chain task accounts</p>
            </div>
          </div>

          {/* Wallet & Quick Info Actions */}
          <div className="relative z-10 flex items-center gap-3 w-full sm:w-auto justify-end">

            {/* Solana Network Chip */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/60 border border-zinc-800/80 text-xs font-medium text-zinc-400 shadow-inner">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>Solana</span>
            </div>

            {/* Enhanced Wallet Button Wrapper */}
            <div className="p-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-zinc-700/60 shadow-lg shadow-indigo-500/5 hover:border-indigo-500/50 hover:shadow-indigo-500/20 transition-all duration-300">
              <div className="bg-zinc-950/80 rounded-xl p-0.5 backdrop-blur-md">
                <WalletButton />
              </div>
            </div>

          </div>
        </header>

        {/* 2x2 ACTION DASHBOARD GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* CARD 1: CREATE TODO */}
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 hover:border-zinc-700/80 transition-all">
            <div className="space-y-4">
              <div className="border-b border-zinc-800/80 pb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <span>✨</span> Create Todo
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Todo ID
                  </label>
                  <input
                    type="number"
                    value={createId}
                    onChange={(e) => setCreateId(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Task ID
                  </label>
                  <input
                    type="number"
                    value={createTaskId}
                    onChange={(e) => setCreateTaskId(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={createTitle}
                  onChange={(e) => setCreateTitle(e.target.value)}
                  placeholder="Task title..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  value={createMessage}
                  onChange={(e) => setCreateMessage(e.target.value)}
                  placeholder="Task details..."
                  rows={2}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleInitialize}
              className="w-full rounded-xl bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              Create
            </button>
          </section>

          {/* CARD 2: FETCH TODO */}
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 hover:border-zinc-700/80 transition-all">
            <div className="space-y-4">
              <div className="border-b border-zinc-800/80 pb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-sky-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🔍</span> Fetch Todo
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Todo ID
                </label>
                <input
                  type="number"
                  value={fetchId}
                  onChange={(e) => setFetchId(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                />
              </div>

              <div className="p-4 rounded-xl border border-sky-900/30 bg-sky-950/10 text-sky-300 text-xs leading-relaxed">
                Enter your registered Todo account ID above to retrieve and display all saved tasks on-chain.
              </div>
            </div>

            <button
              onClick={getdetails}
              className="w-full rounded-xl bg-sky-600 hover:bg-sky-500 active:bg-sky-700 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-600/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              Fetch Todo
            </button>
            <p> see the down ward </p>
          </section>

          {/* CARD 3: UPDATE TASK */}
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 hover:border-zinc-700/80 transition-all">
            <div className="space-y-4">
              <div className="border-b border-zinc-800/80 pb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🔄</span> Update Task
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Todo ID
                  </label>
                  <input
                    type="number"
                    value={updateId}
                    onChange={(e) => setUpdateId(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                    Task ID
                  </label>
                  <input
                    type="number"
                    value={updateTaskId}
                    onChange={(e) => setUpdateTaskId(Number(e.target.value))}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={updateTitle}
                  onChange={(e) => setUpdateTitle(e.target.value)}
                  placeholder="Updated title..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  value={updateMessage}
                  onChange={(e) => setUpdateMessage(e.target.value)}
                  placeholder="Updated details..."
                  rows={2}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all resize-none"
                />
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xl border border-zinc-800/80 bg-zinc-950/60">
                <input
                  type="checkbox"
                  id="updateComplete"
                  checked={updateComplete}
                  onChange={(e) => setUpdateComplete(e.target.checked)}
                  className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
                />
                <label htmlFor="updateComplete" className="text-xs font-medium text-zinc-300 cursor-pointer select-none">
                  Status: Mark task as finished
                </label>
              </div>
            </div>

            <button
              onClick={handleUpdate}
              className="w-full rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 py-2.5 text-sm font-semibold text-white shadow-lg shadow-emerald-600/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              Update
            </button>
          </section>

          {/* CARD 4: DELETE TODO */}
          <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between space-y-5 hover:border-zinc-700/80 transition-all">
            <div className="space-y-4">
              <div className="border-b border-zinc-800/80 pb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-rose-400 uppercase tracking-wider flex items-center gap-2">
                  <span>🗑️</span> Delete Todo
                </h2>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">
                  Todo ID
                </label>
                <input
                  type="number"
                  value={deleteId}
                  onChange={(e) => setDeleteId(Number(e.target.value))}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:border-rose-500 focus:ring-1 focus:ring-rose-500 transition-all"
                />
              </div>

              <div className="p-4 rounded-xl border border-rose-900/40 bg-rose-950/20 text-rose-300 text-xs space-y-1">
                <p className="font-semibold text-rose-400 flex items-center gap-1">
                  <span>⚠️</span> Permanent Delete
                </p>
                <p className="leading-relaxed">
                  Closing this account will remove storage on Solana and refund the rent back to your connected wallet.
                </p>
              </div>
            </div>

            <button
              onClick={handleDelet}
              className="w-full rounded-xl bg-rose-600 hover:bg-rose-500 active:bg-rose-700 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/20 transition-all cursor-pointer hover:scale-[1.01]"
            >
              Delete
            </button>
          </section>

        </div>

        {/* ON-CHAIN TODO ACCOUNT DISPLAY */}
        <section className="rounded-2xl border border-zinc-800/90 bg-zinc-900/80 backdrop-blur-xl shadow-2xl overflow-hidden">
          <div className="border-b border-zinc-800 bg-gradient-to-r from-indigo-950/50 via-purple-950/30 to-zinc-900 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">Account State</span>
              <h2 className="text-2xl font-black text-white mt-0.5">
                ON-CHAIN TODO ACCOUNT
              </h2>
            </div>
            {todoAccount && (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 self-start sm:self-auto">
                Todo #{todoAccount.id.toString()}
              </span>
            )}
          </div>

          <div className="p-6">
            {!todoAccount ? (
              <div className="text-center py-12 space-y-2">
                <p className="text-zinc-400 text-sm">No account loaded yet.</p>
                <p className="text-xs text-zinc-600">Use the <strong className="text-sky-400">Fetch Todo</strong> card above to load your on-chain tasks.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {todoAccount.task.map((task: any) => (
                  <div
                    key={task.taskId.toString()}
                    className="rounded-xl border border-zinc-800 bg-zinc-950/70 p-5 flex flex-col justify-between space-y-3 transition-all hover:border-zinc-700 hover:shadow-lg"
                  >
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base font-bold text-white tracking-tight">
                          {task.title}
                        </h3>
                        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold border ${task.complete
                            ? "bg-emerald-950/60 border-emerald-800/60 text-emerald-400"
                            : "bg-rose-950/60 border-rose-800/60 text-rose-400"
                          }`}>
                          {task.complete ? "✅ Done" : "❌ Pending"}
                        </span>
                      </div>

                      <p className="text-xs text-zinc-400 leading-relaxed break-words">
                        {task.message}
                      </p>
                    </div>

                    <div className="border-t border-zinc-800/80 pt-2.5 flex items-center justify-between text-[11px] text-zinc-500 font-mono">
                      <span>Task #{task.taskId.toString()}</span>
                      <span className="text-zinc-400">{task.complete ? "Completed" : "In Progress"}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pt-4 border-t border-zinc-800/80 text-center space-y-2">
          <p className="text-xs font-semibold text-zinc-400">© Rohit Kumar Singh</p>
          <p className="text-xs text-zinc-500 font-mono">Solana • Rust • Anchor • Next.js</p>
          <div>
            <a
              href="mailto:rohitkumarsingh7682@gmail.com"
              className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              📧 rohitkumarsingh7682@gmail.com
            </a>
          </div>
        </footer>

      </div>
    </main>
  );
}