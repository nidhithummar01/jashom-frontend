import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { JashomBrochure } from "./document";

export const dynamic = "force-dynamic";

export async function GET() {
  const buffer = await renderToBuffer(createElement(JashomBrochure));

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Jashom-Company-Brochure.pdf"',
      "Cache-Control": "no-store",
    },
  });
}
