export const RADIUS = 7;

export const drawNetwork = (
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  nodes: any[],
  links: any[],
) => {
  context.clearRect(0, 0, width, height); // Clear the canvas

  // Draw links
  context.globalAlpha = 0.6;
  context.strokeStyle = "#999";
  context.lineWidth = 1;
  links.forEach((link) => {
    context.beginPath();
    context.moveTo(link.source.x, link.source.y);
    context.lineTo(link.target.x, link.target.y);
    context.stroke();
  });

  // Draw nodes
  nodes.forEach((node) => {
    if (!node.x || !node.y) {
      return;
    }
    context.beginPath();
    context.moveTo(node.x + 5, node.y);
    context.arc(node.x, node.y, 5, 0, 2 * Math.PI);
    context.fillStyle = node.title === null ? "red" : "blue"; // Different color if title is null
    context.fill(); // Fill the node
    context.strokeStyle = "#fff"; // Node border color
    context.stroke(); // Stroke the border
  });
};
