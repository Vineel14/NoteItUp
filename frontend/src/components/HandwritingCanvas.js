import React, { useRef, useEffect, useState } from 'react';
import paper from 'paper';

const HandwritingCanvas = ({ isPenActive }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    
    // Initialize Paper.js with the canvas once
    paper.setup(canvas);

    // Create a new tool for drawing and set it only once
    const newTool = new paper.Tool();
    setTool(newTool);

    return () => {
      // Clean up on component unmount
      newTool.remove();
    };
  }, []);

  useEffect(() => {
    if (!tool) return;  // Ensure the tool exists

    if (isPenActive) {
      // Enable drawing functionality when the pen is active
      let path;
      tool.onMouseDown = (event) => {
        path = new paper.Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;  // You can adjust stroke width for smoother lines
        path.add(event.point);
      };

      tool.onMouseDrag = (event) => {
        path.add(event.point);  // Add points to the path as the mouse drags
      };
    } else {
      // Disable drawing but keep the tool registered
      tool.onMouseDown = null;
      tool.onMouseDrag = null;
    }
  }, [isPenActive, tool]);  // Only update the tool when isPenActive or tool changes

  return (
    <canvas
      ref={canvasRef}
      resize="true"
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default HandwritingCanvas;
