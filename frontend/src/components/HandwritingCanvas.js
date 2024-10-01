import React, { useRef, useEffect, useState, useCallback } from 'react';
import paper from 'paper';

const HandwritingCanvas = ({ isPenActive, isEraserActive, penThickness, setUndoHandler, setRedoHandler }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState(null);
  const [actionStack, setActionStack] = useState([]);  // Stack to track all actions (pen or eraser)
  const [redoStack, setRedoStack] = useState([]);  // Stack for undone actions
  const [path, setPath] = useState(null);  // Track the current path being drawn

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
      tool.onMouseDown = (event) => {
        // Deselect previous path
        if (path) {
          path.selected = false;
        }

        // Create a new path
        const newPath = new paper.Path();
        newPath.strokeColor = 'blue';
        newPath.strokeWidth = penThickness;  // Set the pen stroke thickness
        newPath.fullySelected = false;

        setPath(newPath);  // Update the current path reference
      };

      tool.onMouseDrag = (event) => {
        // Add a segment to the path at the current mouse position
        if (path) {
          path.add(event.point);
        }
      };

      tool.onMouseUp = (event) => {
        if (path) {
          const segmentCount = path.segments.length;

          // Simplify the path to remove unnecessary segments and smooth the stroke
          path.simplify();

          path.fullySelected = false;

          const newSegmentCount = path.segments.length;
          const difference = segmentCount - newSegmentCount;
          const percentage = 100 - Math.round((newSegmentCount / segmentCount) * 100);
          console.log(`${difference} of ${segmentCount} segments were removed, saving ${percentage}%`);

          // Record the draw action
          setActionStack((prevActions) => [
            ...prevActions,
            { type: 'draw', item: path },
          ]);
          setRedoStack([]);  // Clear the redo stack when a new action is performed
        }
      };
    } else if (isEraserActive) {
      // Erasing mode
      tool.onMouseDown = (event) => {
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setActionStack((prevActions) => [
            ...prevActions,
            { type: 'erase', item: hitResult.item },
          ]);
          setRedoStack([]);  // Clear the redo stack when a new action is performed
        }
      };

      tool.onMouseDrag = (event) => {
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setActionStack((prevActions) => [
            ...prevActions,
            { type: 'erase', item: hitResult.item },
          ]);
        }
      };
    } else {
      // Disable both drawing and erasing when neither tool is active
      tool.onMouseDown = null;
      tool.onMouseDrag = null;
    }
  }, [isPenActive, isEraserActive, tool, path, penThickness]);

  // Memoize the undo handler to avoid re-renders
  const handleUndo = useCallback(() => {
    if (actionStack.length > 0) {
      const lastAction = actionStack[actionStack.length - 1];

      if (lastAction.type === 'draw') {
        // Remove the last drawing
        lastAction.item.remove();
      } else if (lastAction.type === 'erase') {
        // Reapply all the erased items
        lastAction.item.addTo(paper.project);
      }

      setRedoStack((prevRedoStack) => [...prevRedoStack, lastAction]);  // Push the undone action to the redo stack
      setActionStack((prevActions) => prevActions.slice(0, -1));  // Remove the last action from the action stack
    }
  }, [actionStack]);

  // Memoize the redo handler to avoid re-renders
  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const lastUndoneAction = redoStack[redoStack.length - 1];

      if (lastUndoneAction.type === 'draw') {
        // Reapply the drawing
        lastUndoneAction.item.addTo(paper.project);
      } else if (lastUndoneAction.type === 'erase') {
        // Remove all the erased items again (redo the erasure)
        lastUndoneAction.item.remove();
      }

      setActionStack((prevActions) => [...prevActions, lastUndoneAction]);  // Add the action back to the action stack
      setRedoStack((prevRedoStack) => prevRedoStack.slice(0, -1));  // Remove the action from the redo stack
    }
  }, [redoStack]);

  // Pass undo/redo handlers to parent
  useEffect(() => {
    setUndoHandler(() => handleUndo);
    setRedoHandler(() => handleRedo);
  }, [handleUndo, handleRedo, setUndoHandler, setRedoHandler]);

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
