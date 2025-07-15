// utils/pdfCache.ts
import { pdf } from "@react-pdf/renderer";
import type { ReactElement } from "react";

const pdfCache: Record<string, Blob> = {};

import type { DocumentProps } from "@react-pdf/renderer";

export async function getOrGeneratePdfBlob(key: string, doc: ReactElement<DocumentProps>): Promise<Blob> {
  if (pdfCache[key]) {
    return pdfCache[key];
  }
  const instance = pdf(doc);
  const blob = await instance.toBlob();
  pdfCache[key] = blob;
  return blob;
}
