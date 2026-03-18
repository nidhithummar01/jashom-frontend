const API_PROXY_PREFIX = '/api';

function getBaseUrl(): string {
  if (import.meta.env.VITE_USE_API_PROXY === 'true') {
    return typeof window !== 'undefined' ? window.location.origin + API_PROXY_PREFIX : API_PROXY_PREFIX;
  }
  const url = import.meta.env.VITE_API_URL;
  if (url) return String(url).replace(/\/$/, '');
  /* Local dev: frontend and API are different ports */
  if (typeof window !== 'undefined' && /^(localhost|127\.0\.0\.1)$/i.test(window.location.hostname)) {
    return 'http://localhost:5000';
  }
  const isLive = typeof window !== 'undefined' && !/localhost|127\.0\.0\.1/.test(window.location.origin);
  if (import.meta.env.PROD || isLive) {
    return (url ? String(url) : 'https://backend.jashom.com').replace(/\/$/, '');
  }
  return typeof window !== 'undefined' ? window.location.origin : '';
}

export interface ContactPayload {
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

/** Read first non-empty string field from FormData (supports name OR fullName, etc.). */
function fdGetString(fd: FormData, ...keys: string[]): string {
  for (const k of keys) {
    const v = fd.get(k);
    if (v != null && typeof v === 'string' && v.trim() !== '') return v.trim();
  }
  return '';
}

/**
 * Build the contact API payload from the real form DOM (FormData).
 * Matches what works for the Contact modal — avoids React state / field-name mismatches.
 */
export function buildContactPayloadFromForm(form: HTMLFormElement, sourceLine: string): ContactPayload {
  const fd = new FormData(form);
  const fullName = fdGetString(fd, 'fullName');
  const email = fdGetString(fd, 'email');
  const phone = fdGetString(fd, 'phone');
  const company = fdGetString(fd, 'company');
  const body = fdGetString(fd, 'message');

  const service = fdGetString(fd, 'service');
  const hiringModel = fdGetString(fd, 'hiringModel');
  const position = fdGetString(fd, 'position');
  const coverLetter = fdGetString(fd, 'coverLetter');
  const linkedIn = fdGetString(fd, 'linkedIn');

  const lines: string[] = [sourceLine];
  if (service) lines.push(`Service interest: ${service}`);
  if (hiringModel) lines.push(`Preferred hiring model: ${hiringModel}`);
  if (position) lines.push(`Position: ${position}`);
  if (linkedIn) lines.push(`LinkedIn: ${linkedIn}`);
  if (coverLetter) {
    lines.push('');
    lines.push('Cover letter:');
    lines.push(coverLetter);
  }
  lines.push('');
  lines.push(body || '(No message body)');

  const resume = fd.get('resume');
  if (resume instanceof File && resume.name) {
    lines.push('');
    lines.push(`Resume file: ${resume.name} (attach file storage not enabled — follow up with applicant for CV)`);
  }

  return {
    fullName,
    email,
    phone: phone || undefined,
    company: company || undefined,
    message: lines.join('\n'),
  };
}

/** Build payload from React state (avoids FormData gaps with controlled inputs / motion buttons on long pages). */
export function buildContactPayloadFromState(
  data: {
    fullName: string;
    email: string;
    phone?: string;
    company?: string;
    message: string;
    service?: string;
    hiringModel?: string;
  },
  sourceLine: string
): ContactPayload {
  const lines: string[] = [sourceLine];
  const s = (v: string | undefined) => (v != null ? String(v).trim() : '');
  if (s(data.service)) lines.push(`Service interest: ${s(data.service)}`);
  if (s(data.hiringModel)) lines.push(`Preferred hiring model: ${s(data.hiringModel)}`);
  lines.push('');
  lines.push(s(data.message) || '(No message body)');
  return {
    fullName: s(data.fullName),
    email: s(data.email),
    phone: s(data.phone) || undefined,
    company: s(data.company) || undefined,
    message: lines.join('\n'),
  };
}

const CONTACT_TIMEOUT_MS = 20000;

/** Every contact form must use these JSON keys (matches backend). */
export const CONTACT_API_FIELDS = ['fullName', 'email', 'phone', 'company', 'message'] as const;

function parseErrorMessage(text: string, res: Response): string {
  try {
    const json = JSON.parse(text);
    return (json?.error ?? res.statusText) ?? 'Request failed';
  } catch {
    return res.statusText ?? 'Request failed';
  }
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  const body: ContactPayload = {
    fullName: String(payload.fullName ?? '').trim(),
    email: String(payload.email ?? '').trim(),
    phone: payload.phone?.trim() ?? undefined,
    company: payload.company?.trim() ?? undefined,
    message: String(payload.message ?? '').trim(),
  };
  if (!body.fullName || !body.email || !body.message) {
    throw new Error('Please fill in name, email, and message.');
  }

  const base = getBaseUrl();
  const url = base + '/v1/contact';
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), CONTACT_TIMEOUT_MS);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await res.text();
    if (!res.ok) throw new Error(parseErrorMessage(text, res));
  } catch (e) {
    if (e instanceof Error) {
      if (e.name === 'AbortError') throw new Error('Request timed out. Please try again.');
      if (e.message.includes('fetch') || e.message.includes('NetworkError') || e.message === 'Failed to fetch') {
        throw new Error('Cannot reach server. Check your connection and that the backend is running, then try again.');
      }
      throw e;
    }
    throw new Error('Something went wrong. Please try again.');
  } finally {
    clearTimeout(timeoutId);
  }
}

