import { db } from "@/db";

import { notFound } from "next/navigation";

import Link from "next/link";

import deleteSnippet from "@/actions/deleteSnippet";
import { startTransition } from "react";

type SnippetShowPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) notFound();

  const deleteSnippetAction = deleteSnippet.bind(null, id);

  return (
    <main>
      <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <Link
            href="/"
            className="mb-3 inline-flex text-sm text-slate-400 transition hover:text-emerald-300"
          >
            <span aria-hidden="true" className="mr-2">←</span> All snippets
          </Link>
          <h1 className="break-words text-2xl font-bold tracking-tight text-white sm:text-3xl">
            {snippet.title}
          </h1>
        </div>
        <div className="flex gap-3">
          <button className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-slate-500 hover:bg-slate-900">
            <Link href={`/snippets/${snippet.id}/edit`}>Edit</Link>
          </button>
          <form action={deleteSnippetAction}>
            <button className="rounded-lg border border-rose-900/80 px-4 py-2 text-sm font-medium text-rose-300 transition hover:border-rose-700 hover:bg-rose-950/50">
              Delete
            </button>
          </form>
        </div>
      </div>
      <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-900 p-5 text-sm leading-7 text-emerald-100 shadow-2xl shadow-black/20 sm:p-6">
        <code className="font-mono">{snippet.code}</code>
      </pre>
    </main>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((s) => ({ id: s.id.toString() }));
}
