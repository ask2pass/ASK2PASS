const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? 'http://10.77.170.252:3000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  token?: string;
};

export async function apiRequest<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(options.token
        ? { Authorization: `Bearer ${options.token}` }
        : {}),
    },
    ...(options.body !== undefined
      ? { body: JSON.stringify(options.body) }
      : {}),
  });

  const text = await response.text();

  let data: unknown = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    throw new Error(
      `API ${response.status}: ${
        typeof data === 'string' ? data : JSON.stringify(data)
      }`,
    );
  }

  return data as T;
}

export const apiGet = <T>(path: string, token?: string) =>
  apiRequest<T>(path, { method: 'GET', token });

export const apiPost = <T>(
  path: string,
  body?: unknown,
  token?: string,
) =>
  apiRequest<T>(path, {
    method: 'POST',
    body,
    token,
  });
