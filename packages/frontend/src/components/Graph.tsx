/* eslint-disable */
import * as d3 from "d3";
import { useEffect, useState, useRef } from "react";

import { drawNetwork } from "./drawNetwork";
import { GraphData } from "./GraphData";

interface GraphProps {
  selected: string[];
  activity: string;
  vis: string;
}

export interface Node {
  id: string;
  url: string;
  title: string;
  crawlTime: string;
  links: string[]; // Links to other node IDs
  owner: {
    identifier: string;
    label: string;
  };
}

export interface Link {
  source: string;
  target: string;
}

export function Graph({ selected, vis }: GraphProps) {
  const [nodesData, setNodesData] = useState<Node[]>([]); // State to store the fetched data
  const [selectedNode, setSelectedNode] = useState<Node | null>(null); // State to store the selected node data
  const [popupPosition, setPopupPosition] = useState<{
    x: number;
    y: number;
  } | null>(null); // State for popup position

  const handleDataFetched = (data: any) => {
    if (data && data.nodes) {
      setNodesData(data.nodes); // Store the fetched nodes data
    }
  };

  const getNodesByDomains = (nodes: Node[]) => {
    // Create a map to store the highest crawlTime for each domain
    const domainMap = new Map<string, Node>();

    nodes.forEach((node) => {
      const domain = new URL(node.url).hostname; // Extract domain from URL
      if (
        !domainMap.has(domain) ||
        new Date(node.crawlTime) < new Date(domainMap.get(domain)!.crawlTime)
      ) {
        domainMap.set(domain, node); // Update if crawlTime is higher or if domain is not present
      }
    });

    return Array.from(domainMap.values()); // Convert map values to an array
  };

  // Function to generate links array with source-target pairs
  const generateLinks = (nodes: Node[]): Link[] => {
    const links: Link[] = [];

    nodes.forEach((node) => {
      node.links.forEach((targetId) => {
        links.push({ source: node.id, target: targetId });
      });
    });

    return links;
  };

  const generateDomainLinks = (
    nodesFiltered: Node[],
    inputNodes: Node[],
  ): Link[] => {
    const domainIdMap = new Map<string, string>();

    // creates map [domain, id]
    nodesFiltered.forEach((node) => {
      const domain = new URL(node.url).hostname;
      domainIdMap.set(domain, node.id);
    });

    // creates map [id, domain]
    const idNodeMap = new Map<string, string>();
    inputNodes.forEach((node) => {
      idNodeMap.set(node.id, new URL(node.url).hostname);
    });

    // creates map [domain, domain]
    const domainMap = new Map<string, Set<string>>();
    inputNodes.forEach((node) => {
      const from = idNodeMap.get(node.id);
      node.links.forEach((id) => {
        const to = idNodeMap.get(id);
        if (!domainMap.get(from!)) {
          domainMap.set(from!, new Set<string>());
        }
        const set = domainMap.get(from!);
        set?.add(to!);
      });
    });

    const links: Link[] = [];

    for (const [key, set] of domainMap.entries()) {
      for (const domain of set) {
        links.push({
          source: domainIdMap.get(key)!,
          target: domainIdMap.get(domain)!,
        });
      }
    }
    return links;
  };

  const exportGraph = (width: number, height: number, inputNodes: Node[]) => {
    const nodesRaw =
      vis === "websites" ? inputNodes : getNodesByDomains(inputNodes);
    const linksRaw =
      vis === "websites"
        ? generateLinks(nodesRaw)
        : generateDomainLinks(nodesRaw, inputNodes);
    const nodes = nodesRaw.map((node) => ({ ...node })); // Create a mutable copy of inputNodes
    const links: Link[] = linksRaw.map((link) => ({ ...link }));

    const canvasRef = useRef<HTMLCanvasElement>(null); // Define the canvas ref

    useEffect(() => {
      if (!canvasRef.current) return; // Return if the canvas ref is not set
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d"); // Get the 2D drawing context
      if (!context) return; // Return if the context is not available

      const handleClick = (event: MouseEvent) => {
        const [x, y] = d3.pointer(event, canvas); // Get the pointer position
        // Find the node that was clicked based on proximity to (x, y)
        const clickedNode = nodes.find(
          (node: any) => Math.hypot(node.x - x, node.y - y) < 10,
        ); // Adjust the threshold as needed
        if (clickedNode) {
          setSelectedNode(clickedNode); // Set the clicked node data to the state
          setPopupPosition({ x: event.clientX, y: event.clientY }); // Set popup position
        } else {
          setSelectedNode(null); // Hide popup if no node is clicked
          setPopupPosition(null); // Hide popup if no node is clicked
        }
      };

      canvas.addEventListener("click", handleClick); // Add event listener for clicks

      // Set up simulation for force-directed graph
      const simulation = d3
        .forceSimulation(nodes as any)
        .force(
          "link",
          d3.forceLink(links).id((d: any) => d.id), // Links
        )
        .force("charge", d3.forceManyBody().strength(-100)) // Node repulsion
        .force("center", d3.forceCenter(width / 2, height / 2)) // Centering force
        .force("x", d3.forceX(width / 2).strength(0.3)) // Keep nodes within the x bounds
        .force("y", d3.forceY(height / 2).strength(0.3))
        .on("tick", () => {
          drawNetwork(context, width, height, nodes, links);
        });
      const zoom = d3
        .zoom()
        .scaleExtent([0.1, 10]) // Allow zoom between 0.1x and 10x
        .on("zoom", (event: any) => {
          context.save();
          context.clearRect(0, 0, width, height);
          context.translate(event.transform.x, event.transform.y);
          context.scale(event.transform.k, event.transform.k);
          drawNetwork(context, width, height, nodes, links); // Redraw network with zoom
          context.restore();
        });

      d3.select(canvas)
        .call(zoom as any)
        .on("dblclick.zoom", null); // Attach zoom behavior to canvas

      // Set up drag behavior for nodes
      const drag = d3
        .drag()
        .on("start", (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0.3).restart(); // Restart simulation on drag
          d.fx = d.x; // Fix the position of the node being dragged
          d.fy = d.y;
        })
        .on("drag", (event: any, d: any) => {
          d.fx = event.x; // Update fixed position during drag
          d.fy = event.y;
        })
        .on("end", (event: any, d: any) => {
          if (!event.active) simulation.alphaTarget(0); // Stop simulation after dragging
          d.fx = null; // Release the fixed position
          d.fy = null;
        });

      // Apply drag behavior to nodes
      d3.select(canvas).call(drag as any);
    }, [width, height, nodes, links]); // Dependencies array

    return (
      <div>
        <canvas
          ref={canvasRef}
          style={{ width, height }}
          width={width}
          height={height}
        />
      </div>
    );
  };

  return (
    <div style={{ position: "relative" }}>
      <p>{selected && selected.length > 0 ? "" : "No items selected"}</p>
      <GraphData ids={selected} onDataFetched={handleDataFetched} />
      {exportGraph(700, 700, nodesData)}
      {selectedNode &&
        popupPosition && ( // Render the popup if a node is selected and a position is set
          <div
            style={{
              position: "absolute",
              left: popupPosition.x,
              top: popupPosition.y,
              backgroundColor: "white",
              border: "1px solid #ccc",
              padding: "10px",
              zIndex: 1000,
              pointerEvents: "none", // Makes sure the popup doesn't interfere with mouse events
            }}
          >
            <h3>Node Details</h3>
            <p>
              <strong>ID:</strong> {selectedNode.id}
            </p>
            <p>
              <strong>URL:</strong> {selectedNode.url}
            </p>
            <p>
              <strong>Title:</strong> {selectedNode.title}
            </p>
            <p>
              <strong>Crawl Time:</strong> {selectedNode.crawlTime}
            </p>
            <p>
              <strong>Owner:</strong> {selectedNode.owner.label} (
              {selectedNode.owner.identifier})
            </p>
            <p>
              <strong>Links:</strong> {selectedNode.links.join(", ")}
            </p>
          </div>
        )}
    </div>
  );
}
