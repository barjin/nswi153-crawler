import { Execution } from "../utils/ApiContext";

export function ExecutionRow({ execution }: { execution: Execution }) {
  return (
    <div className="flex flex-row items-center py-2 pb-3 px-4 mb-2 bg-slate-200 rounded">
      <div className="flex flex-col flex-1">
        <div className="font-bold">{execution.record?.label}</div>
        <div>
          <span className="font-sm">{execution.status} | {execution.executionTime}</span>
        </div>
      </div>
    </div>
  );
}
