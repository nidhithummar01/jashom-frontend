const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://backend.jashom.com";

export interface Job {
  id: number;
  title: string;
  slug: string;
  department: string | null;
  location: string | null;
  employment_type: string | null;
  experience: string | null;
  salary_range: string | null;
  description: string | null;
  requirements: string | null;
  status: string;
  posted_at: string | null;
  closes_at: string | null;
}

export interface ApplicationPayload {
  jobId: number | null;
  jobTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  coverLetter?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export async function getPublishedJobs(): Promise<Job[]> {
  try {
    const res = await fetch(`${API_URL}/v1/admin/jobs?status=published&limit=100`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function submitApplication(payload: ApplicationPayload): Promise<void> {
  const res = await fetch(`${API_URL}/v1/applications`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Request failed (${res.status})`);
  }
}
