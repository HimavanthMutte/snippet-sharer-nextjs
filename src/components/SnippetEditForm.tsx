"use client";

import type { Snippet } from "@/generated/prisma";

import { Editor } from "@monaco-editor/react";

import { startTransition, useState } from "react";

type SnippetEditFormProps = {
  snippet: Snippet;
  onSubmit: (params: { id: number; code: string }) => Promise<void>;
};

export default function SnippetEditForm({
  snippet,
  onSubmit,
}: SnippetEditFormProps) {
  const [code, setCode] = useState(snippet.code);
  const handleEditorChange = (value: string = "") => {
    setCode(value);
  };

  const handleSubmit = () => {
    startTransition(async () => {
      await onSubmit({ id: snippet.id, code });
    });
  };

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Edit snippet
          </p>
          <h1 className="break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {snippet.title}
          </h1>
        </div>
        <button
          onClick={handleSubmit}
          className="shrink-0 rounded-lg bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          Save changes
        </button>
      </div>
      <div className="overflow-hidden rounded-xl border border-slate-800 shadow-2xl shadow-black/20">
        <Editor
          height="60vh"
          theme="vs-dark"
          language="javascript"
          defaultValue={snippet.code}
          options={{ minimap: { enabled: false } }}
          onChange={handleEditorChange}
        />
      </div>
    </section>
  );
}
