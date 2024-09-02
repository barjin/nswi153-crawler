import { Graph } from "../components/Graph";
import { WebsiteRecordListVisualization } from "../components/WebsiteRecordListVisualization";

export function Visualization() {
    return (
        <>
        <div className="h-full grid grid-cols-3 grid-rows-[auto_auto_1fr_auto] gap-4">
            <div className="col-span-1 justify-self-stretch">
                Select Records to display
                <WebsiteRecordListVisualization/>
            </div>
            <div className="col-span-2">
                <Graph/>
            </div>
        </div>
        </>            
    );
}