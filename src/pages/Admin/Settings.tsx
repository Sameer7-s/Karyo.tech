import { FormEvent, useState } from "react";
import { adminApi } from "../../api/adminApi";
import { useToast } from "../../components/common/Toast";
import { useAuth } from "../../hooks/useAuth";
import { formatDate } from "../../utils/formatDate";

export default function Settings() {
  const { admin, refreshAdmin, logout } = useAuth();
  const { showToast } = useToast();
  const [name, setName] = useState(admin?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);

  async function updateProfile(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await adminApi.updateSettings(name);
      refreshAdmin(response.admin);
      showToast(response.message, "success");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Profile update failed", "error");
    } finally {
      setSaving(false);
    }
  }

  async function updatePassword(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    try {
      const response = await adminApi.changePassword(currentPassword, newPassword);
      setCurrentPassword("");
      setNewPassword("");
      showToast(response.message, "success");
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Password update failed", "error");
    } finally {
      setSaving(false);
    }
  }

  async function handleLogout() {
    await logout();
    showToast("Logout successful", "success");
    window.location.href = "/admin/login";
  }

  return (
    <section className="grid gap-4 xl:grid-cols-2">
      <div className="rounded-lg border border-white/10 bg-[#111827] p-5">
        <h2 className="text-lg font-semibold text-white">Admin profile</h2>
        <div className="mt-5 space-y-3 rounded-lg border border-white/10 bg-white/[0.03] p-4 text-sm text-white/60">
          <p><span className="text-white/35">Email:</span> {admin?.email}</p>
          <p><span className="text-white/35">Role:</span> {admin?.role}</p>
          <p><span className="text-white/35">Last login:</span> {formatDate(admin?.lastLogin)}</p>
        </div>
        <form onSubmit={updateProfile} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Name</span>
            <input value={name} onChange={(event) => setName(event.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none focus:border-[#9D80CB]" />
          </label>
          <button disabled={saving} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 disabled:opacity-60">Update profile</button>
        </form>
      </div>

      <div className="rounded-lg border border-white/10 bg-[#111827] p-5">
        <h2 className="text-lg font-semibold text-white">Security</h2>
        <form onSubmit={updatePassword} className="mt-5 space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">Current password</span>
            <input type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none focus:border-[#9D80CB]" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-white/60">New password</span>
            <input type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-3 text-sm text-white outline-none focus:border-[#9D80CB]" />
          </label>
          <div className="flex flex-wrap gap-3">
            <button disabled={saving} className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-black hover:bg-gray-200 disabled:opacity-60">Change password</button>
            <button type="button" onClick={handleLogout} className="rounded-md border border-rose-400/20 px-4 py-2 text-sm font-semibold text-rose-200 hover:bg-rose-500/10">Logout</button>
          </div>
        </form>
      </div>
    </section>
  );
}
