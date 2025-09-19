// src/App.jsx
import React, { useMemo, useState } from "react";

/* ------------ constants ------------ */
const WINDOWS_INSTALLER =
  "https://github.com/David-Pjs/setupexeforlaunch/releases/download/0.1.1/Benkyoo-0.1.5-benkyo.exe";

/* ------------ helpers ------------ */
const cn = (...a) => a.filter(Boolean).join(" ");

function detectOS() {
  const uaData = navigator.userAgentData;
  const plat = (uaData?.platform || navigator.platform || "").toLowerCase();
  const ua = (navigator.userAgent || "").toLowerCase();
  if (plat.includes("win") || ua.includes("windows")) return "windows";
  if (plat.includes("mac") || ua.includes("mac os") || ua.includes("macintosh")) return "mac";
  if (plat.includes("linux") || ua.includes("linux")) return "linux";
  return "other";
}

/* ------------ tiny UI atoms ------------ */
const Card = ({ title, children }) => (
  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 shadow-xl shadow-black/30">
    <div className="mb-2 text-base font-semibold">{title}</div>
    <div className="text-sm text-slate-300">{children}</div>
  </div>
);

const AlertPill = ({ children }) => (
  <div className="mb-4 inline-flex w-full items-center gap-2 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-amber-200">
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 9v4m0 4h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
    <span className="text-sm">
      <b>Only the Windows installer</b> is available right now. macOS &amp; Linux are coming soon.
    </span>
  </div>
);

/* ------------ download block ------------ */
function SmartDownloadArea() {
  const os = useMemo(() => detectOS(), []);
  const isWindows = os === "windows";
  const [showSmart, setShowSmart] = useState(false);

  return (
    <div>
      <a
        href={WINDOWS_INSTALLER}
        rel="noopener"
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold",
          "bg-indigo-700/80 text-white ring-1 ring-inset ring-white/15 shadow-md hover:bg-indigo-600/90",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
        )}
      >
        <svg viewBox="0 0 24 24" className="mr-2 h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="select-none">Download for Windows (.exe)</span>
      </a>

      {!isWindows && (
        <div className="mt-3 text-xs text-slate-400">Windows build available now. macOS &amp; Linux coming soon.</div>
      )}

      {/* SmartScreen helper */}
      <div className="mt-4 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-slate-300">Windows SmartScreen may appear for unsigned apps during launch.</p>
          <button
            onClick={() => setShowSmart((s) => !s)}
            className="text-xs font-semibold text-indigo-300 underline decoration-indigo-700/40 hover:decoration-indigo-300"
          >
            {showSmart ? "Hide steps" : "See how to run anyway"}
          </button>
        </div>
        {showSmart && (
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-xs text-slate-300">
            <li>When Windows says “Windows protected your PC,” click <b>More info</b>.</li>
            <li>Confirm the publisher is unknown (expected for early beta).</li>
            <li>Click <b>Run anyway</b> to start Benkyoo Setup.</li>
            <li>After install, launch from Start Menu → <b>Benkyoo</b>.</li>
          </ol>
        )}
      </div>
    </div>
  );
}

/* ------------ page ------------ */
export default function App() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      {/* Decorative glow */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-64 w-[42rem] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-purple-600/10 blur-2xl" />
      </div>

      {/* NAV */}
      <header className="mx-auto flex w-full items-center justify-between px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-2xl bg-indigo-600 font-bold">B</div>
          <div className="text-lg font-semibold">Benkyoo</div>
        </div>
        <nav className="hidden gap-6 text-sm text-slate-300 md:flex">
          <a href="#features" className="hover:text-white">Features</a>
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
      </header>

      {/* HERO */}
      <section className="w-full px-6 lg:px-14">
        <div className="mx-auto grid min-h-[calc(100vh-96px)] w-full grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="max-w-none">
            {/* Windows-only callout */}
            <AlertPill>
              Only the Windows installer is available right now. macOS &amp; Linux are coming soon.
            </AlertPill>

            <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight lg:text-5xl">
              Focus-first study manager.
            </h1>

            <p className="mt-4 max-w-2xl text-slate-300">
              Plan goals, read PDFs, create <b>flashcards</b> &amp; <b>notes</b>, and record <b>voice memos</b>. Local-first and
              offline.
            </p>

            <div className="mt-6">
              <SmartDownloadArea />
            </div>

            {/* Share & review ask */}
     <p className="mt-3 max-w-2xl text-sm text-slate-400">
  Like Benkyoo? Please <b>share it with a friend</b> and leave a short review with the Benkyoo team you can reach from the app's <b>Settings</b>. Your feedback helps us reach more people and improve faster.
</p>

          </div>

          {/* Mock screen */}
          <div className="relative">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4 shadow-2xl shadow-black/50">
              <div className="mb-3 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-green-500/70" />
                <span className="ml-3 text-xs text-slate-400">Benkyoo — Dashboard</span>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                <div className="rounded-xl bg-slate-800/60 p-4">
                  <div className="text-sm font-semibold">Goals</div>
                  <ul className="mt-2 space-y-1 text-xs text-slate-300">
                    <li>• Finish Chapter 5</li>
                    <li>• Practice 20 flashcards</li>
                    <li>• Review notes (15m)</li>
                  </ul>
                </div>
                <div className="rounded-xl bg-slate-800/60 p-4">
                  <div className="text-sm font-semibold">Pomodoro</div>
                  <div className="mt-2 text-3xl font-bold">25:00</div>
                  <div className="mt-1 text-xs text-slate-400">Work session</div>
                </div>
                <div className="rounded-xl bg-slate-800/60 p-4 lg:col-span-2">
                  <div className="text-sm font-semibold">Reader Progress</div>
                  <div className="mt-2 h-2 w-full rounded bg-slate-800">
                    <div className="h-2 w-2/3 rounded bg-indigo-500" />
                  </div>
                  <div className="mt-2 text-xs text-slate-400">64% of "Linear Algebra Notes.pdf"</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="w-full px-6 py-14 lg:px-14">
        <h2 className="mb-6 text-2xl font-bold">What you can do</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card title="Organize goals">Break work into trackable goals with due dates and reminders.</Card>
          <Card title="PDF reader">Pick up where you left off. Last page &amp; zoom are remembered.</Card>
          <Card title="Flashcards">Create flashcards, drill daily, and track progress.</Card>
          <Card title="Notes">Write quick notes alongside your PDFs and goals.</Card>
          <Card title="Voice recordings">Record voice memos for ideas and explanations.</Card>
          <Card title="Pomodoro focus">Stay on task with work/break timers and gentle notifications.</Card>
          <Card title="Local-first">Everything is saved on your device. No sign-up required.</Card>
          <Card title="Backup &amp; restore">Export all data to JSON; import it later on any machine.</Card>
          <Card title="Lightweight">Fast, small download. Works offline after install.</Card>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="w-full px-6 py-12 lg:px-14">
        <h2 className="mb-4 text-2xl font-bold">How it works</h2>
        <ol className="space-y-3 text-slate-300">
          <li>1. Click <b>Download for Windows (.exe)</b> above.</li>
          <li>2. If SmartScreen shows, click <b>More info → Run anyway</b> (unsigned during launch).</li>
          <li>3. Open <b>Benkyoo</b> from the Start Menu. Add goals, create flashcards &amp; notes, and start a 25-minute focus session.</li>
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="w-full px-6 py-12 lg:px-14">
        <h2 className="mb-4 text-2xl font-bold">FAQ</h2>
        <div className="space-y-4 text-slate-300">
          <div>
            <div className="font-semibold">Where is my data stored?</div>
            <p className="text-sm">Locally on your device. Use Settings → Export to back up a JSON file.</p>
          </div>
          <div>
            <div className="font-semibold">Will my data follow me to a new PC?</div>
            <p className="text-sm">Each device starts fresh. Export on the old PC and Import on the new one to carry your data over.</p>
          </div>
          <div>
            <div className="font-semibold">How can I support the project?</div>
            <p className="text-sm">
              Share Benkyoo with friends and leave a quick review or star the repo after trying it. Early feedback helps us grow.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800 py-8">
        <div className="mx-auto flex w-full flex-col items-center justify-between gap-3 px-6 text-sm text-slate-400 md:flex-row lg:px-14">
          <div>© {new Date().getFullYear()} Benkyoo</div>
          <div className="flex items-center gap-4">
            <a href="#features" className="hover:text-slate-200">Features</a>
            <a href="#how" className="hover:text-slate-200">How it works</a>
            <a href="#faq" className="hover:text-slate-200">FAQ</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
