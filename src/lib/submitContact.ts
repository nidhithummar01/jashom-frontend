const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://backend.jashom.com";

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function submitContactForm(
  payload: ContactPayload
): Promise<void> {
  const res = await fetch(`${API_URL}/v1/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
}
