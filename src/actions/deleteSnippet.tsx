import { db } from "@/db";

import { redirect } from "next/navigation";

import { revalidatePath } from "next/cache";

export default async function deleteSnippet(id: string): Promise<void> {
  "use server";
  await db.snippet.delete({
    where: {
      id: parseInt(id),
    },
  });
  revalidatePath("/");
  redirect("/");
}
