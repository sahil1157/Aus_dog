export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://127.0.0.1:8000/api";

export type ApiError = {
  detail?: string;
} & Record<string, unknown>;

export async function apiFetch<T>(
  path: string,
  opts: RequestInit & { token?: string } = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(opts.headers);
  headers.set("Accept", "application/json");
  if (!(opts.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  if (opts.token) {
    headers.set("Authorization", `Bearer ${opts.token}`);
  }

  const res = await fetch(url, { ...opts, headers });
  if (!res.ok) {
    let payload: ApiError | null = null;
    try {
      payload = (await res.json()) as ApiError;
    } catch {
      // ignore
    }
    const message =
      payload?.detail ??
      `Request failed (${res.status} ${res.statusText})`;
    const err = new Error(message) as Error & { payload?: ApiError; status?: number };
    err.payload = payload ?? undefined;
    err.status = res.status;
    throw err;
  }
  return (await res.json()) as T;
}

