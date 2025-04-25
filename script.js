function drawGraph() {
  const vertexCount = parseInt(document.getElementById("vertices").value);
  const edgeText = document.getElementById("edges").value.trim();

  if (!vertexCount || vertexCount <= 0) {
    alert("Please enter a valid number of vertices.");
    return;
  }

  // Create nodes with labels (id, label)
  const nodes = [];
  for (let i = 1; i <= vertexCount; i++) {
    nodes.push({
      id: i,
      label: `${i}`, // Display node number
      title: `This is Node ${i}`, // Hover over node will show more info
      shape: "circle", // Ensure nodes are circles
      size: 30, // Adjust size of nodes
      font: {
        color: "#ffffff", // White text color inside nodes
        size: 16, // Font size for node labels
        face: "Arial", // Font style for labels
        background: "transparent", // Transparent background for text
      },
    });
  }

  // Parse edges from user input (from-to)
  const edges = [];
  const edgeLines = edgeText.split("\n");
  edgeLines.forEach((line) => {
    const [from, to] = line.trim().split(" ").map(Number);
    if (!isNaN(from) && !isNaN(to)) {
      edges.push({ from, to });
    }
  });

  // Container for the graph visualization
  const container = document.getElementById("network");

  const data = {
    nodes: new vis.DataSet(nodes),
    edges: new vis.DataSet(edges),
  };

  const options = {
    nodes: {
      shape: "circle", // Nodes will be circular
      size: 30, // Size of the nodes
      font: {
        color: "#fff", // White font color for node labels
        size: 16, // Font size
        bold: true, // Bold font for node labels
      },
      borderWidth: 2, // Border width for nodes
      borderWidthSelected: 3, // Border width when node is selected
    },
    edges: {
      arrows: { to: { enabled: true, scaleFactor: 1 } }, // Arrow pointing towards the "to" node
      color: { color: "#888" },
      width: 2,
      smooth: { type: "dynamic" }, // Smooth edge animation
    },
    physics: {
      enabled: true,
      barnesHut: { gravitationalConstant: -8000, springLength: 95 },
    },
    interaction: {
      hover: true,
      navigationButtons: true,
    },
    layout: {
      improvedLayout: true,
    },
  };

  const network = new vis.Network(container, data, options);

  // Animate edges one by one as they are input
  let i = 0;
  const animateEdge = () => {
    if (i < edges.length) {
      data.edges.update({ ...edges[i], color: { color: "#28a745" }, width: 3 });
      i++;
      setTimeout(animateEdge, 500);
    }
  };
  animateEdge();
}
