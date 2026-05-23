export function GalaxyBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-black">
      {/* ── Minimal clean dark gradient ── */}
      <div
        className="absolute inset-0 opacity-80"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(20,20,20,1) 0%, rgba(0,0,0,1) 80%)`,
        }}
      />
    </div>
  );
}
