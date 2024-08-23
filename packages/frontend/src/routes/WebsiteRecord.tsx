import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ExecutionList } from "../components/ExecutionList";
import { WebsiteRecordData } from "../components/WebsiteRecordData";
import { useClient } from "../utils/ApiContext";

export function WebsiteRecord() {
  const { id: recordId } = useParams<{ id: string }>();
  const api = useClient();
  const navigate = useNavigate();

  const deleteRecord = useCallback(async () => {
    try {
      await api?.DELETE("/api/records/{recordId}", {
        params: {
          path: {
            recordId: parseInt(recordId!, 10),
          },
        },
      });

      navigate("/website-records");
    } catch (e) {
      console.error(e);
    }
  }, [api, recordId]);

  const executeRecord = useCallback(async () => {
    try {
      await api?.POST("/api/records/{recordId}/run", {
        params: {
          path: {
            recordId: parseInt(recordId!, 10),
          },
        },
      });

      navigate("/website-records");
    } catch (e) {
      console.error(e);
    }
  }, [api, recordId]);

  return (
    <>
      <div className="grid grid-col-2">
        <div className="col-span-1">
          <WebsiteRecordData />
        </div>
        <div className="col-span-1">
          <button
            className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded-2xl"
            onClick={executeRecord}
          >
            Execute
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-1 rounded-2xl"
            onClick={deleteRecord}
          >
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
