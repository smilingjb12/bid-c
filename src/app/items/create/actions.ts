"use server";

import { auth } from "@/auth";
import { db } from "@/db/database";
import { items } from "@/db/schema";
import { getSignedUrlForS3Object } from "@/lib/s3";
import { redirect } from "next/navigation";

async function createUploadUrl(key: string, type: string) {
  return await getSignedUrlForS3Object(key, type);
}

async function createItem({
  fileName,
  name,
  startingPrice,
}: {
  fileName: string;
  name: string;
  startingPrice: number;
}) {
  const session = await auth();

  if (!session) {
    throw new Error("Not authenticated");
  }

  await db.insert(items).values({
    name,
    fileKey: fileName,
    userId: session!.user!.id as string,
    startingPrice: String(startingPrice),
    currentPrice: String(startingPrice),
  });

  redirect("/");
}

export async function createItemAction(formData: FormData) {
  const file = formData.get("file") as File;
  const uploadUrl = await createUploadUrl(file.name, file.type);

  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  await createItem({
    name: formData.get("name") as string,
    startingPrice: Number(formData.get("startingPrice")),
    fileName: file.name,
  });

  redirect("/");
}
