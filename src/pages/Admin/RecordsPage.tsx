import { useCallback, useEffect, useMemo, useState } from "react";
import { Download, Eye, RefreshCw, Search, Trash2 } from "lucide-react";
import { adminApi, AdminRecord } from "../../api/adminApi";
import { ConfirmModal } from "../../components/admin/ConfirmModal";
import { DetailModal } from "../../components/admin/DetailModal";
import { Pagination } from "../../components/admin/Pagination";
import { StatusBadge } from "../../components/admin/StatusBadge";
import { EmptyState, SkeletonRows } from "../../components/common/Loader";
import { useToast } from "../../components/common/Toast";
import { useDebounce } from "../../hooks/useDebounce";
import { exportCsv } from "../../utils/exportCsv";
import { formatDate } from "../../utils/formatDate";

export type RecordsConfig = {
  title: string;
  apiPath: string;
  deletePath: (id: string) => string;
  columns: { key: string; label: string; type?: "status" | "date" | "boolean" }[];
  searchPlaceholder: string;
  filters?: { key: string; label: string; options: string[] }[];
  statusOptions?: string[];
  statusPath?: (id: string) => string;
  priorityOptions?: string[];
  priorityPath?: (id: string) => string;
  approvePath?: (id: string) => string;
  csvName: string;
};

export function RecordsPage({ config }: { config: RecordsConfig }) {
  const { showToast } = useToast();
  const [rows, setRows] = useState<AdminRecord[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState<AdminRecord | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filterParams = useMemo(() => Object.fromEntries(Object.entries(filters).filter(([, value]) => value && value !== "all")), [filters]);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await adminApi.list<AdminRecord>(config.apiPath, {
        page,
        limit: 10,
        search: debouncedSearch,
        sort,
        dateFrom,
        dateTo,
        ...filterParams,
      });
      setRows(response.rows);
      setTotal(response.total);
      setPages(response.pages);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  }, [config.apiPath, dateFrom, dateTo, debouncedSearch, filterParams, page, showToast, sort]);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    setPage(1);
  }, [dateFrom, dateTo, debouncedSearch, filters, sort]);

  async function patch(path: string, body: unknown) {
    try {
      const response = await adminApi.patch(path, body);
      showToast(response.message || "Record updated successfully", "success");
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Update failed", "error");
    }
  }

  async function confirmDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const response = await adminApi.delete(config.deletePath(deleteId));
      showToast(response.message || "Record deleted successfully", "success");
      setDeleteId(null);
      load();
    } catch (err) {
      showToast(err instanceof Error ? err.message : "Delete failed", "error");
    } finally {
      setDeleting(false);
    }
  }

  function renderCell(row: AdminRecord, column: RecordsConfig["columns"][number]) {
    const value = row[column.key];
    if (column.type === "status") return <StatusBadge value={value} />;
    if (column.type === "boolean") return <StatusBadge value={Boolean(value)} />;
    if (column.type === "date") return formatDate(String(value || row.subscribedAt || row.createdAt || ""));
    return <span className="line-clamp-2 text-white/75">{String(value ?? "-")}</span>;
  }

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-white/10 bg-[#111827] p-4">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">{config.title}</h2>
            <p className="mt-1 text-sm text-white/45">Search, filter, update, delete, and export real database records.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex min-w-[220px] items-center gap-2 rounded-md border border-white/10 bg-black/20 px-3 py-2">
              <Search className="h-4 w-4 text-white/35" />
              <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={config.searchPlaceholder} className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/25" />
            </div>
            {config.filters?.map((filter) => (
              <select
                key={filter.key}
                value={filters[filter.key] || "all"}
                onChange={(event) => setFilters((current) => ({ ...current, [filter.key]: event.target.value }))}
                className="rounded-md border border-white/10 bg-[#0B0F19] px-3 py-2 text-sm text-white/70 outline-none"
              >
                <option value="all">{filter.label}: All</option>
                {filter.options.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            ))}
            <input
              type="date"
              value={dateFrom}
              onChange={(event) => setDateFrom(event.target.value)}
              className="rounded-md border border-white/10 bg-[#0B0F19] px-3 py-2 text-sm text-white/70 outline-none"
              aria-label="Filter from date"
            />
            <input
              type="date"
              value={dateTo}
              onChange={(event) => setDateTo(event.target.value)}
              className="rounded-md border border-white/10 bg-[#0B0F19] px-3 py-2 text-sm text-white/70 outline-none"
              aria-label="Filter to date"
            />
            <select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-md border border-white/10 bg-[#0B0F19] px-3 py-2 text-sm text-white/70 outline-none">
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
            </select>
            <button onClick={load} className="rounded-md border border-white/10 p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button onClick={() => exportCsv(config.csvName, rows)} className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-semibold text-black hover:bg-gray-200">
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border border-white/10 bg-[#111827]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-white/10 bg-white/[0.03] text-xs uppercase tracking-wider text-white/40">
              <tr>
                {config.columns.map((column) => <th key={column.key} className="whitespace-nowrap px-4 py-3 font-medium">{column.label}</th>)}
                <th className="whitespace-nowrap px-4 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <SkeletonRows rows={8} cols={config.columns.length + 1} />
              ) : rows.map((row) => (
                <tr key={row.id} className="border-b border-white/5 transition hover:bg-white/[0.03]">
                  {config.columns.map((column) => <td key={column.key} className="max-w-[260px] px-4 py-3 align-top">{renderCell(row, column)}</td>)}
                  <td className="px-4 py-3 align-top">
                    <div className="flex flex-wrap items-center gap-2">
                      <button onClick={() => setDetail(row)} className="rounded-md border border-white/10 p-2 text-white/60 hover:bg-white/10 hover:text-white" aria-label="View record">
                        <Eye className="h-4 w-4" />
                      </button>
                      {config.statusOptions && config.statusPath && (
                        <select value={String(row.status || "New")} onChange={(event) => patch(config.statusPath!(row.id), { status: event.target.value })} className="rounded-md border border-white/10 bg-[#0B0F19] px-2 py-2 text-xs text-white/70 outline-none">
                          {config.statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                      )}
                      {config.priorityOptions && config.priorityPath && (
                        <select value={String(row.priority || "Medium")} onChange={(event) => patch(config.priorityPath!(row.id), { priority: event.target.value })} className="rounded-md border border-white/10 bg-[#0B0F19] px-2 py-2 text-xs text-white/70 outline-none">
                          {config.priorityOptions.map((priority) => <option key={priority} value={priority}>{priority}</option>)}
                        </select>
                      )}
                      {config.approvePath && (
                        <button onClick={() => patch(config.approvePath!(row.id), { approved: !Boolean(row.approved) })} className="rounded-md border border-white/10 px-3 py-2 text-xs text-white/70 hover:bg-white/10">
                          {row.approved ? "Hide" : "Approve"}
                        </button>
                      )}
                      <button onClick={() => setDeleteId(row.id)} className="rounded-md border border-rose-400/20 p-2 text-rose-300 hover:bg-rose-500/10" aria-label="Delete record">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && !rows.length && <div className="p-4"><EmptyState message={error || "No records found."} /></div>}
        <Pagination page={page} pages={pages} total={total} onPage={setPage} />
      </div>

      <DetailModal record={detail} onClose={() => setDetail(null)} />
      <ConfirmModal open={Boolean(deleteId)} loading={deleting} onClose={() => setDeleteId(null)} onConfirm={confirmDelete} />
    </section>
  );
}
