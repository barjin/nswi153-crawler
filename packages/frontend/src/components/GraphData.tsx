import { gql, useQuery } from '@apollo/client';

interface GraphDataProps {
    ids: string[]
};

// Define your GraphQL query with a variable for IDs
const GET_NODES_BY_IDS = gql`
  query GetDataByIds($ids: [ID!]! ) {
    nodes (webPages: $ids){
        id
        url
        title
        crawlTime
        links
        owner{
            identifier
    	    label
        }
    }
  }
`;

export function GraphData({ids}: GraphDataProps) {
    const {loading, error, data} = useQuery(GET_NODES_BY_IDS, {
        variables: {ids},
        skip: ids.length === 0,
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h3>Data</h3>
            <ul>
                {data === undefined ? "Nothing to show - no webpages selected" : data.nodes.map((node: any) => (
                    <li>{node.id}, {node.url}, {node.owner.identifier}</li>
                ))}
            </ul>
        </div>
    );
}