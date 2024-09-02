import { useState } from "react";
import { useSearchParams } from "react-router-dom";

interface RecordRowProps {
  id: number;
  label: string;
  tags: string;
  periodicity: number;
  lastExecutionTime: string;
  lastExecutionStatus: string;
  isActive: boolean;
  canSelect: boolean;
}

export function RecordRow({
  id,
  label,
  tags,
  periodicity,
  lastExecutionTime,
  lastExecutionStatus,
  isActive,
  canSelect,
}: RecordRowProps) {
  let periodicityText = "";
  if (periodicity >= 86400) {
    const number = periodicity / 86400;
    periodicityText = `every ${number > 1 ? number : ""} day${number > 1 ? "s" : ""}`;
  } else if (periodicity >= 3600) {
    const number = periodicity / 3600;
    periodicityText = `every ${number > 1 ? number : ""} hour${number > 1 ? "s" : ""}`;
  } else if (periodicity >= 60) {
    const number = periodicity / 60;
    periodicityText = `every ${number > 1 ? number : ""} minute${number > 1 ? "s" : ""}`;
  }

  const time = lastExecutionTime?.split("T");
  const lastExecutionTimeText = `${time[0]} ${time[1].split(".")[0]}`;

  const [searchParams, setSearchParams] = useSearchParams();
  const selectionParams = searchParams.get("selected") || "";
  const selectedIds =
    selectionParams.length > 0 ? selectionParams.split(",") : [];
  const [isSelected, setSelected] = useState(
    selectedIds.includes(id.toString()),
  );

  const selectRow = (selected: boolean) => {
    setSelected(selected);

    const stringId = id.toString();

    if (selected) {
      selectedIds.push(stringId);
    } else {
      selectedIds.splice(selectedIds.indexOf(stringId), 1);
    }

    setSearchParams(
      (p) => {
        p.set("selected", selectedIds.join(","));
        return p;
      },
      { replace: false },
    );
  };

  let bgColor = "";
  if (isSelected) {
    bgColor = isActive ? "bg-green-400" : "bg-slate-400";
  } else {
    bgColor = isActive
      ? "bg-green-200 hover:bg-green-400"
      : "bg-slate-200 hover:bg-slate-400";
  }

  return (
    <div
      className={`
                flex
                flex-row
                items-center
                py-2
                pb-3
                px-4
                mb-2
                ${bgColor}
                cursor-pointer
                rounded
            `}
      onClick={() => {
        if (canSelect) selectRow(!isSelected);
      }}
    >
      <div className="flex flex-col flex-1">
        <span>
          <span className="font-bold">{label}</span>
          <span className="px-2 text-xs">(tags: {tags})</span>
        </span>
        <span className="text-xs">
          <span>{periodicityText}</span>
          &nbsp;|&nbsp;
          <span>
            Last Execution: {lastExecutionTimeText} ({lastExecutionStatus})
          </span>
        </span>
      </div>
    </div>
  );
}
