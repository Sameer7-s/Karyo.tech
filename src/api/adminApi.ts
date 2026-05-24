function normalizeApiBaseUrl(raw: string | undefined) {
  // Backend routes are mounted under `/api` (e.g. `/api/admin/login`).
  // In production, the frontend is typically served from the same origin as the backend,
  // so a relative `/api` base is the safest default.
  const fallback = import.meta.env.PROD ? "/api" : "http://localhost:5000/api";
  if (!raw) return fallback;

  const trimmed = raw.trim().replace(/\/+$/, "");
  if (!trimmed) return fallback;
  if (trimmed.endsWith("/api")) return trimmed;

  // If the caller provided only an origin (common misconfig: http://localhost:5000),
  // assume they meant the API root under `/api`.
  return `${trimmed}/api`;
}

const API_URL = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);
const TOKEN_KEY = "karyo_admin_token";

export type ApiListResponse<T> = {
  success: boolean;
  rows: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
};

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function clearToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export async function apiRequest<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type") && options.body) headers.set("Content-Type", "application/json");
  const token = getToken();
  if (token) headers.set("Authorization", `Bearer ${token}`);

  const url = `${API_URL}${path}`;
  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
      throw new Error("Unable to connect to the server. Please check your internet connection and try again.");
    }
    throw error;
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok || data.success === false) {
    throw new Error(data.message || "Something went wrong. Please try again.");
  }
  return data as T;
}

export function toQuery(params: Record<string, string | number | undefined>) {
  const search = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "" && value !== "all") search.set(key, String(value));
  });
  return search.toString();
}

export const adminApi = {
  login: (email: string, password: string) =>
    apiRequest<{ success: boolean; token: string; admin: AdminUser }>("/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  me: () => apiRequest<{ success: boolean; admin: AdminUser }>("/admin/me"),
  logout: () => apiRequest<{ success: boolean; message: string }>("/admin/logout", { method: "POST" }),
  dashboard: () => apiRequest<DashboardStats>("/admin/dashboard-stats"),
  list: <T>(path: string, params: Record<string, string | number | undefined>) =>
    apiRequest<ApiListResponse<T>>(`${path}?${toQuery(params)}`),
  patch: (path: string, body: unknown) =>
    apiRequest<{ success: boolean; message: string }>(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path: string) =>
    apiRequest<{ success: boolean; message: string }>(path, { method: "DELETE" }),
  updateSettings: (name: string) =>
    apiRequest<{ success: boolean; admin: AdminUser; message: string }>("/admin/settings", {
      method: "PATCH",
      body: JSON.stringify({ name }),
    }),
  changePassword: (currentPassword: string, newPassword: string) =>
    apiRequest<{ success: boolean; message: string }>("/admin/settings/password", {
      method: "PATCH",
      body: JSON.stringify({ currentPassword, newPassword }),
    }),
};

export async function submitContact(payload: Record<string, string>) {
  return apiRequest<{ success: boolean; message: string }>("/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: string;
  lastLogin?: string;
};

export type DashboardStats = {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  closedLeads: number;
  recentLeads: AdminRecord[];
  totalContacts: number;
  totalServiceRequests: number;
  totalProjectInquiries: number;
  totalSubscribers: number;
  totalFeedback: number;
  newMessages: number;
  pendingRequests: number;
  completedProjects: number;
  recentActivities: ActivityLog[];
  recentContacts: AdminRecord[];
  recentServiceRequests: AdminRecord[];
  monthlySubmissions: { month: string; total: number }[];
  statusDistribution: { status: string; total: number }[];
  serviceTypeDistribution: { name: string; total: number }[];
};

export type ActivityLog = {
  id: string;
  action: string;
  performedBy: string;
  recordType: string;
  recordId?: string;
  createdAt: string;
};

export type AdminRecord = Record<string, string | number | boolean | null | undefined> & { id: string };
