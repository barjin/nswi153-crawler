import { useState } from 'react';
import { Graph } from "../components/Graph";
import { WebsiteRecordListVisualization } from "../components/WebsiteRecordListVisualization";


export function Visualization() {
    const [selectedOptionActivity, setSelectedActionOption] = useState('live');
    const handleActionOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedActionOption(event.target.value);
    };

    const [selectedOptionVis, setSelectedVisOption] = useState('websites');

    const handleVisOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedVisOption(event.target.value);
    };

    const [parameters, setParameters] = useState({
        selected: [],
        action: '',
        vis: '',
      });
    
    const GetSelected = () => {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const selectedParam = urlSearchParams.get('selected') || '';
        const s = selectedParam ? selectedParam.split(',') : []; // Split by comma to create an array
        setParameters({
            selected: s, 
            action: selectedOptionActivity, 
            vis: selectedOptionVis
        });
    };

    return (
        <>
        <div className="h-full grid grid-cols-3 gap-4">
            <div className="col-span-1">
                Select Records to display in Graph
                <WebsiteRecordListVisualization/>
            </div> 
                <div className="col-span-2">
                    <div className="grid grid grid-cols-3 gap-4">

                        <div className="col-span-1">
                            <input type="radio" value="live" checked={selectedOptionActivity === 'live'} onChange={handleActionOptionChange}/>
                            <label style={{ marginLeft: '20px' }}>Live</label>
                            <input type="radio" value="static" checked={selectedOptionActivity === 'static'}  onChange={handleActionOptionChange} style={{ marginLeft: '20px' }}/>
                            <label style={{ marginLeft: '20px' }}>Static</label>
                        </div>
                        <div className="col-span-1">
                            <input type="radio" value="websites" checked={selectedOptionVis === 'websites'} onChange={handleVisOptionChange}/>
                            <label style={{ marginLeft: '20px' }}>Websites</label>
                            <input type="radio" value="domains" checked={selectedOptionVis === 'domains'}  onChange={handleVisOptionChange} style={{ marginLeft: '20px' }}/>
                            <label style={{ marginLeft: '20px' }}>Domains</label>
                        </div>
                        <div className="col-span-1">
                            <button onClick={GetSelected}>Render</button>
                    </div>
                </div>
                <div className="col-start-2 col-span-2">
                    <Graph selected={parameters.selected} activity={parameters.action} vis={parameters.vis}/>
                </div>
            </div>
        </div>
        </>            
    );
}