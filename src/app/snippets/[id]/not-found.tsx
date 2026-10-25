export default function SnippetNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-emerald-400">
        404 · Not found
      </p>
      <h1 className="text-3xl font-bold tracking-tight text-white">
        Snippet not found
      </h1>
      <p className="mt-3 text-slate-400">
        Sorry, we couldn&apos;t find the snippet you&apos;re looking for.
      </p>
    </main>
  );
}
