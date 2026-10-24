import { db } from "@/db";

import { notFound } from "next/navigation";

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

  return (
    <div>
      <h2>Show a Snippet - {id}</h2>
      <p>{snippet.title}</p>
      <p>{snippet.code}</p>
    </div>
  );
}
