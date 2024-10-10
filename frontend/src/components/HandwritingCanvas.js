import React, { useRef, useEffect } from 'react';
import paper from 'paper';

const HandwritingCanvas = ({ isPenActive }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Create a unique Paper.js instance for each canvas
    const scope = new paper.PaperScope();
    scope.setup(canvas);

    // Create a tool to handle pen drawing
    const tool = new scope.Tool();
    let path;

    tool.onMouseDown = (event) => {
      if (isPenActive) {
        path = new scope.Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.add(event.point);
      }
    };

    tool.onMouseDrag = (event) => {
      if (isPenActive && path) {
        path.add(event.point);
      }
    };

    return () => {
      // Clean up tool when the component unmounts
      tool.remove();
      scope.remove();
    };
  }, [isPenActive]);

  useEffect(() => {
    // Resize the canvas explicitly to match the A4 dimensions
    const canvas = canvasRef.current;
    canvas.width = 794;
    canvas.height = 1123;
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100%',
        height: '100%',
        display: 'block',
      }}
    />
  );
};

export default HandwritingCanvas;
