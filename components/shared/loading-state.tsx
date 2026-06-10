export function LoadingState() {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-28 animate-pulse rounded-2xl bg-slate-200" />
      ))}
    </div>
  );
}
