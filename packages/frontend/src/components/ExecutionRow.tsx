import { Execution } from "../utils/ApiContext";

export function ExecutionRow({ execution }: { execution: Execution }) {
  let executionTimeText = "";
  const time = execution.executionTime?.split("T");
  if (time !== undefined) {
    executionTimeText = `${time[0]} ${time[1].split(".")[0]}`;
  }

  return (
    <div className="flex flex-row items-center py-2 pb-3 px-4 mb-2 bg-slate-200 rounded">
      <div className="flex flex-col flex-1">
        <span>
          <span className="font-bold">{execution.record?.label}</span>
        </span>
        <span className="text-xs">
          <span>{execution.status}</span>
          &nbsp;|&nbsp;
          <span>{executionTimeText}</span>
          &nbsp;|&nbsp;
          <span>{execution.stats?.nodesVisited ?? 0}</span> pages visited
        </span>
      </div>
    </div>
  );
}
