"use client";

import type { Snippet } from "@/generated/prisma";

type SnippetEditFormProps = {
  snippet: Snippet;
};

export default function SnippetEditForm({ snippet }: SnippetEditFormProps) {
  return <div>Client Componet with - {snippet.title}</div>;
}
