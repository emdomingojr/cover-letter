import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-start justify-center gap-4">
      <p className="font-mono text-xs uppercase tracking-widest text-muted">404</p>
      <h1 className="font-serif text-3xl font-semibold text-heading">Page not found.</h1>
      <Link
        href="/envato"
        className="font-mono text-sm text-muted transition-colors duration-150 hover:text-accent"
      >
        ← Back
      </Link>
    </div>
  );
}
