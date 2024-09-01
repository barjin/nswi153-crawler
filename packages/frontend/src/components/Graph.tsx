import { GraphData } from "./GraphData";

export const Graph = () => {
  const ids = ['1', '2', '3', '4', '5'];
  
  return (
    <div>
     <GraphData ids={ids}/>
    </div>
  );
};
