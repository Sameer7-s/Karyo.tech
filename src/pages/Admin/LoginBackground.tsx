export function LoginBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-black">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.04) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}
