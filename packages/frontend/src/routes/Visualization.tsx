import { useState } from "react";

import { Graph } from "../components/Graph";
import { WebsiteRecordListVisualization } from "../components/WebsiteRecordListVisualization";

export function Visualization() {
  const [selectedOptionActivity, setSelectedActionOption] = useState("live");
  const handleActionOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedActionOption(event.target.value);
  };

  const [selectedOptionVis, setSelectedVisOption] = useState("websites");

  const handleVisOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSelectedVisOption(event.target.value);
  };

  const [selected, setSelected] = useState<string[]>([]);

  const GetSelected = () => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const selectedParam = urlSearchParams.get("selected") || "";
    const s = selectedParam ? selectedParam.split(",") : []; // Split by comma to create an array
    setSelected(s);
  };

  return (
    <>
      <div className="h-full grid grid-cols-4 gap-4">
        <div className="col-span-1 justify-self-stretch">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">
            Website records
          </h1>
        </div>
        <div className="col-span-1">
          <div className="bg-blue-200 flex flex-row items-center py-2 pb-3 px-4 mb-2 rounded">
            <input
              type="radio"
              value="live"
              checked={selectedOptionActivity === "live"}
              onChange={handleActionOptionChange}
            />
            <label className="ms-5">Live</label>
            <input
              className="ms-5"
              type="radio"
              value="static"
              checked={selectedOptionActivity === "static"}
              onChange={handleActionOptionChange}
            />
            <label className="ms-5">Static</label>
          </div>
        </div>
        <div className="col-span-1">
          <div className="bg-blue-200 flex flex-row items-center py-2 pb-3 px-4 mb-2 rounded">
            <input
              type="radio"
              value="websites"
              checked={selectedOptionVis === "websites"}
              onChange={handleVisOptionChange}
            />
            <label className="ms-5">Websites</label>
            <input
              className="ms-5"
              type="radio"
              value="domains"
              checked={selectedOptionVis === "domains"}
              onChange={handleVisOptionChange}
            />
            <label className="ms-5">Domains</label>
          </div>
        </div>
        <div className="col-span-1">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl"
            onClick={GetSelected}
          >
            Render graph
          </button>
        </div>
        <div className="col-span-1">
          <WebsiteRecordListVisualization />
        </div>
        <div className="col-start-2 col-span-3">
          <Graph
            selected={selected}
            activity={selectedOptionActivity}
            vis={selectedOptionVis}
          />
        </div>
      </div>
    </>
  );
}
