import { ICONS } from "../../components/Icons.tsx";
import ChipDiagram from "../../components/ChipDiagram.tsx";

export default function HeroPage() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-[#F4F6FC]"
    >
      {/* =========================
          BACKGROUND
         ========================= */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, #C7CEDD 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* =========================
          HERO CONTENT
         ========================= */}

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-6 py-16 sm:px-8 md:grid-cols-2 md:gap-8 md:py-24 lg:px-10 lg:py-28">
        {/* =========================
            LEFT — HERO TEXT
           ========================= */}

        <div className="relative z-10 max-w-xl">
          {/* Eyebrow */}
          <div className="mb-5 flex items-center gap-2">
            <ICONS.dot
              className="text-blue-600"
              size={20}
            />

            <p className="text-sm font-medium text-blue-600">
              Brahman Institute of Computer Engineering Students
            </p>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[4.25rem]">
            Set your{" "}
            <span className="text-amber-400">
              Goals.
            </span>
            <br />

            Find{" "}
            <span className="text-emerald-500">
              Success.
            </span>
            <br />

            Here at{" "}
            <span className="text-blue-400">
              BICpES.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-[15px] leading-7 text-slate-500 sm:text-base">
            Everything BICpES runs, in one place. Find
            platforms, events and announcements for CpE
            students, all with one student account.
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              type="button"
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white shadow-sm shadow-blue-600/20 transition-all duration-200 hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/20 active:scale-[0.98]"
            >
              Access Hub
            </button>

            <button
              type="button"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:border-slate-400 hover:bg-slate-50 active:scale-[0.98]"
            >
              Explore Platforms
            </button>
          </div>

          {/* Connection Status */}
          <div className="mt-8 flex items-center gap-2 text-sm">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-emerald-500"
            />

            <span className="font-medium text-emerald-600">
              Connected
            </span>

            <span className="text-slate-500">
              Students, Platforms and Future.
            </span>
          </div>
        </div>

        {/* =========================
            RIGHT — CHIP DIAGRAM
           ========================= */}

        <div className="relative flex w-full items-center justify-center md:-mr-8 lg:-mr-12">
          {/* Decorative glow behind diagram */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/40 blur-3xl"
          />

          {/* Existing ChipDiagram */}
          <div className="relative z-10 w-full max-w-[700px] lg:max-w-[820px]">
            <ChipDiagram />
          </div>
        </div>
      </div>
    </section>
  );
}
