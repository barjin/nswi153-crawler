import { useParams } from "react-router-dom";

import { ExecutionList } from "../components/ExecutionList";
import { WebsiteRecordData } from "../components/WebsiteRecordData";

export function WebsiteRecord() {
  const { id: recordId } = useParams<{ id: string }>();

  return (
    <>
      <div className="grid grid-col-2">
        <div className="col-span-1">
          <WebsiteRecordData />
        </div>
        <div className="col-span-1">
          <button className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl">
            Execute
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-1 rounded-2xl">
            Delete
          </button>
        </div>
        <div className="col-span-2 border-4 border-blue-800 rounded-lg mt-10 px-2 py-4">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">Executions</h1>
          <ExecutionList recordId={parseInt(recordId!, 10)} pagination={true} />
        </div>
      </div>
    </>
  );
}
