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
    <div>
      <Editor
        height="40vh"
        theme="vs-dark"
        language="javascript"
        defaultValue={snippet.code}
        options={{ minimap: { enabled: false } }}
        onChange={handleEditorChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
