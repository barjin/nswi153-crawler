import { gql, useQuery } from '@apollo/client';

interface GraphDataProps {
    ids: string[];
    onDataFetched: (data: any) => void;
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

export function GraphData({ids, onDataFetched}: GraphDataProps) {
    const {loading, error, data} = useQuery(GET_NODES_BY_IDS, {
        variables: {ids},
        skip: ids.length === 0,
        onCompleted: (data) => {
            onDataFetched(data);
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return null;
}