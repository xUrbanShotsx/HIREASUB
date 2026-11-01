export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-display font-extrabold tracking-tight ${className}`}
    >
      <svg viewBox="0 0 64 64" className="h-[1.15em] w-[1.15em]" aria-hidden="true">
        <rect width="64" height="64" rx="14" fill="var(--accent)" />
        <path
          d="M20 16v32M44 16v32M20 32h24"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      <span className="text-[1.1em] leading-none">
        HireA<span className="text-accent">Sub</span>
      </span>
    </span>
  );
}
