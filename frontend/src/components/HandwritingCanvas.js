import React, { useRef, useEffect, useState } from 'react';
import paper from 'paper';

const HandwritingCanvas = ({ isPenActive, isEraserActive }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    // Initialize Paper.js with the canvas once
    paper.setup(canvas);

    // Create a new tool for drawing/erasing
    const newTool = new paper.Tool();
    setTool(newTool);

    return () => {
      // Clean up on component unmount
      newTool.remove();
    };
  }, []);

  useEffect(() => {
    if (!tool) return;

    if (isPenActive) {
      // Drawing mode
      let path;
      tool.onMouseDown = (event) => {
        path = new paper.Path();
        path.strokeColor = 'black';
        path.strokeWidth = 2;
        path.add(event.point);
      };

      tool.onMouseDrag = (event) => {
        path.add(event.point);
      };
    } else if (isEraserActive) {
      // Erasing mode
      tool.onMouseDown = (event) => {
        // Try to hit-test the stroke more precisely
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,  // Focus on the stroke rather than segments
          tolerance: 10  // Increase tolerance to make hit detection more forgiving
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();  // Remove the entire stroke/path
        }
      };

      tool.onMouseDrag = (event) => {
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,  // Focus on the stroke rather than segments
          tolerance: 10  // Increase tolerance for dragging to erase
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();  // Continuously remove the path as the eraser is dragged
        }
      };
    } else {
      // Disable both drawing and erasing when neither tool is active
      tool.onMouseDown = null;
      tool.onMouseDrag = null;
    }
  }, [isPenActive, isEraserActive, tool]);

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
