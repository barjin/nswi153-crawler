import { GraphData } from "./GraphData";

interface GraphProps {
  selected: string[],
  activity: string,
  vis: string,
};

export function Graph ({selected, activity, vis}: GraphProps) {
  
  return (
    <div>
      <p>Yala: {selected && selected.length > 0
            ? selected.join(', ')
            : 'No items selected'}</p>
      <p>Activity: {activity}</p>
      <p>Vis: {vis}</p>
     <GraphData ids={selected}/>
    </div>
  );
};
