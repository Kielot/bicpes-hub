import { useState } from "react";
import { ICONS } from "./Icons";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Platforms", href: "#platforms" },
  { label: "News & Events", href: "#news" },
];

interface NavBarProps {
  dark?: boolean;
  onToggleTheme?: (dark: boolean) => void;
}

export default function NavBar({ dark = false, onToggleTheme = () => {} }: NavBarProps) {
  const [open, setOpen] = useState(false);
  
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-[#F4F6FC]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Wordmark */}
        <a href="#home" className="flex items-center gap-1 text-lg font-semibold tracking-tight text-slate-900">
          BIC
          <span className="text-blue-600">p</span>
          ES
        </a>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right side controls */}
        <div className="hidden items-center gap-3 md:flex">
          <div className="flex items-center overflow-hidden rounded-full border border-slate-200 bg-white">
            <button
              type="button"
              onClick={() => onToggleTheme(false)}
              aria-label="Light mode"
              aria-pressed={!dark}
              className={`flex h-9 w-9 items-center justify-center transition-colors ${
                !dark ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <ICONS.sun size={16} />
            </button>
            <button
              type="button"
              onClick={() => onToggleTheme(true)}
              aria-label="Dark mode"
              aria-pressed={dark}
              className={`flex h-9 w-9 items-center justify-center transition-colors ${
                dark ? "bg-slate-900 text-white" : "text-slate-400 hover:text-slate-600"
              }`}
            >
              <ICONS.moon size={16} />
            </button>
          </div>

          <button
            type="button"
            className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
          >
            Login
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <ICONS.cancel size={18} /> : <ICONS.menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-[#F4F6FC] px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-600 hover:text-slate-900"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              className="mt-2 w-full rounded-full bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}