export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.svg"
      alt="HireASub"
      width={358}
      height={59}
      className={`w-auto ${className}`}
    />
  );
}
