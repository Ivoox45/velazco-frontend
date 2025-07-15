// utils/pdfCache.ts
import { pdf } from "@react-pdf/renderer";
import type { ReactElement } from "react";

const pdfCache: Record<string, Blob> = {};

export async function getOrGeneratePdfBlob(key: string, doc: ReactElement): Promise<Blob> {
  if (pdfCache[key]) {
    return pdfCache[key];
  }
  const instance = pdf(doc);
  const blob = await instance.toBlob();
  pdfCache[key] = blob;
  return blob;
}
