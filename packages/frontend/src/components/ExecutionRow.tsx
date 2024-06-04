export function ExecutionRow({ label }: { label: string }) {
  return (
    <div className="flex flex-row items-center py-2 pb-3 px-4 mb-2 bg-slate-200 rounded">
      <div className="flex flex-col flex-1">
        <span>
          <span className="font-bold">{label}</span>
        </span>
      </div>
    </div>
  );
}
