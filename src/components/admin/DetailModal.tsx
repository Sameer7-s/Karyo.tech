import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { formatDate } from "../../utils/formatDate";
import { AdminRecord } from "../../api/adminApi";

const dateKeys = new Set(["createdAt", "updatedAt", "subscribedAt", "lastLogin"]);

export function DetailModal({ record, onClose }: { record: AdminRecord | null; onClose: () => void }) {
  return (
    <AnimatePresence>
      {record && (
        <motion.div className="fixed inset-0 z-[99980] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            className="max-h-[88vh] w-full max-w-3xl overflow-hidden rounded-lg border border-white/10 bg-[#111827] shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <h3 className="font-semibold text-white">Record details</h3>
              <button onClick={onClose} className="rounded-md p-2 text-white/50 hover:bg-white/10 hover:text-white" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid max-h-[70vh] gap-4 overflow-y-auto p-5 sm:grid-cols-2">
              {Object.entries(record).map(([key, value]) => (
                <div key={key} className={String(value ?? "").length > 90 ? "sm:col-span-2" : ""}>
                  <p className="mb-1 text-xs uppercase tracking-wider text-white/35">{key}</p>
                  <p className="break-words rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-sm leading-6 text-white/75">
                    {dateKeys.has(key) ? formatDate(String(value)) : String(value ?? "-")}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
