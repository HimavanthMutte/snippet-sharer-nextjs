import { db } from "@/db";

import Link from "next/link";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderedSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippets/${snippet.id}`}
        className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/70 px-5 py-4 transition hover:border-emerald-500/60 hover:bg-slate-900"
      >
        <div className="font-medium text-slate-100 transition group-hover:text-emerald-300">
          {snippet.title}
        </div>
        <div className="text-sm font-medium text-slate-400 transition group-hover:text-emerald-300">
          View <span aria-hidden="true">→</span>
        </div>
      </Link>
    );
  });

  return (
    <main>
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
            Your workspace
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Snippets
          </h1>
        </div>
        <Link
          href="/snippets/new"
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
        >
          <span aria-hidden="true" className="text-lg leading-none">+</span>
          New snippet
        </Link>
      </div>
      <div className="flex flex-col gap-3">{renderedSnippets}</div>
    </main>
  );
}
