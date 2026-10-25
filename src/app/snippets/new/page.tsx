"use client";

import { redirect } from "next/navigation";

import { db } from "@/db";

import createSnippet from "@/actions/createSnippet";

import { useActionState } from "react";

export default function SnippetCreatePage() {
  const [formState, action] = useActionState(createSnippet, {
    message: "",
  });
  return (
    <form
      action={action}
      className="mx-auto max-w-3xl rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-black/20 sm:p-8"
    >
      <div className="mb-7">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
          New snippet
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Create a Snippet
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          Save a piece of code to find and reuse later.
        </p>
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="title">
            Title
          </label>
          <input
            name="title"
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            id="title"
            placeholder="e.g. Fetch data from an API"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-slate-200" htmlFor="code">
            Code
          </label>
          <textarea
            name="code"
            className="min-h-64 w-full resize-y rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 font-mono text-sm leading-6 text-emerald-100 placeholder:font-sans placeholder:text-slate-500 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/20"
            id="code"
            placeholder="Paste your code here..."
          />
        </div>
        {formState.message && (
          <p className="rounded-lg border border-rose-800 bg-rose-950/60 px-4 py-3 text-sm text-rose-200">
            Error: {formState.message}
          </p>
        )}
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-lg bg-emerald-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          Create snippet
        </button>
      </div>
    </form>
  );
}
