import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-transparent py-12 md:py-24">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-6 md:flex-row">
        <span className="font-sans text-sm text-subtle tracking-wide">
          &copy; 2026 Emerson Domingo Jr
        </span>
        <Link 
          href="mailto:hi@emersonjr.com" 
          className="font-mono text-sm text-subtle hover:text-primary transition-colors duration-150"
        >
          hi@emersonjr.com
        </Link>
      </div>
    </footer>
  );
}
