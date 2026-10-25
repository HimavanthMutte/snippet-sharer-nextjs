export default function SnippetLoadingPage() {
  return (
    <div className="animate-pulse" role="status" aria-label="Loading snippet">
      <div className="mb-6 h-4 w-28 rounded bg-slate-800" />
      <div className="mb-8 h-9 w-2/3 rounded bg-slate-800" />
      <div className="h-64 rounded-xl border border-slate-800 bg-slate-900" />
    </div>
  );
}
