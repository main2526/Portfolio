export default function Ornament() {
  return (
    <div className="flex items-center gap-4" aria-hidden="true">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200 dark:to-slate-700" />
      <span className="h-2 w-2 rotate-45 bg-amber-500" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200 dark:to-slate-700" />
    </div>
  );
}
