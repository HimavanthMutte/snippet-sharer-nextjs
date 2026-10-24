"use server";
import { db } from "@/db";

import { redirect } from "next/navigation";

export default async function createSnippet(
  formState: {
    message: string;
  },
  formData: FormData,
) {
  const title = formData.get("title");
  const code = formData.get("code");
  if (typeof title !== "string" || title.length < 3) {
    return {
      message: "Title must be atleast 3 characters long",
    };
  }
  if (typeof code !== "string" || code.length < 2) {
    return {
      message: "Code must be atleast 2 characters long",
    };
  }
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  redirect("/");
}
