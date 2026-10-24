import { db } from "@/db";

import { notFound } from "next/navigation";

import type { Snippet } from "@/generated/prisma";

import { redirect } from "next/navigation";

import SnippetEditForm from "@/components/SnippetEditForm";

type SnippetEditPageProps = {
  params: Promise<{
    id: string;
  }>;
};

type updateSnippetParams = Omit<Snippet, "title">;

export default async function SnippetEditPage(props: SnippetEditPageProps) {
  async function updateSnippet({
    id,
    code,
  }: updateSnippetParams): Promise<void> {
    "use server";
    await db.snippet.update({
      where: {
        id,
      },
      data: {
        code,
      },
    });
    redirect(`/snippets/${id}`);
  }

  const { id } = await props.params;

  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });

  if (!snippet) return notFound();

  return (
    <div>
      <SnippetEditForm snippet={snippet} onSubmit={updateSnippet} />
    </div>
  );
}
