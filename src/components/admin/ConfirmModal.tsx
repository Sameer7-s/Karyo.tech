import { AnimatePresence, motion } from "motion/react";
import { Trash2, X } from "lucide-react";

export function ConfirmModal({ open, loading, onClose, onConfirm }: { open: boolean; loading?: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[99990] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="w-full max-w-md rounded-lg border border-white/10 bg-[#111827] p-6 shadow-2xl"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-rose-500/10 text-rose-300">
                  <Trash2 className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold text-white">Delete record?</h3>
                <p className="mt-2 text-sm leading-6 text-white/55">Are you sure you want to delete this record? This action cannot be undone.</p>
              </div>
              <button onClick={onClose} className="rounded-md p-2 text-white/50 hover:bg-white/10 hover:text-white" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-end gap-3">
              <button onClick={onClose} className="rounded-md border border-white/10 px-4 py-2 text-sm text-white/70 hover:bg-white/10">Cancel</button>
              <button onClick={onConfirm} disabled={loading} className="rounded-md bg-rose-500 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-400 disabled:opacity-60">
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
