import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { env } from "../../env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getImageUrl(fileKey: string) {
  return `${env.NEXT_PUBLIC_BUCKET_URL}/${fileKey}`;
}
