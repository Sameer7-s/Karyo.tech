import { statusTone } from "../../utils/statusColors";

export function StatusBadge({ value }: { value: string | number | boolean | null | undefined }) {
  const label = typeof value === "boolean" ? (value ? "Approved" : "Hidden") : String(value ?? "-");
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusTone(label)}`}>
      {label}
    </span>
  );
}
