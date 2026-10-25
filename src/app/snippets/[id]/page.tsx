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
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet.title}</h1>
        <div className="flex gap-4">
          <button className="p-2 border rounded">
            <Link href={`/snippets/${snippet.id}/edit`}>Edit</Link>
          </button>
          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
}

export async function generateStaticParams() {
  const snippets = await db.snippet.findMany();
  return snippets.map((s) => ({ id: s.id.toString() }));
}
