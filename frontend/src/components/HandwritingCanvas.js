// Updated HandwritingCanvas.js - with grouped erasing for single-step undo
import React, { useRef, useEffect, useState, useCallback } from 'react';
import paper from 'paper';

const HandwritingCanvas = ({ isPenActive, isEraserActive, penThickness, penColor, setUndoHandler, setRedoHandler }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState(null);
  const [actionStack, setActionStack] = useState([]);  // Stack to track all actions (pen or eraser)
  const [redoStack, setRedoStack] = useState([]);  // Stack for undone actions
  const [path, setPath] = useState(null);  // Track the current path being drawn
  const [erasedItems, setErasedItems] = useState([]);  // Temporary array to hold erased items in a single action

  useEffect(() => {
    const canvas = canvasRef.current;
    paper.setup(canvas);

    const newTool = new paper.Tool();
    setTool(newTool);

    return () => {
      newTool.remove();
    };
  }, []);

  useEffect(() => {
    if (!tool) return;

    if (isPenActive) {
      tool.onMouseDown = (event) => {
        if (path) path.selected = false;

        const newPath = new paper.Path();
        newPath.strokeColor = penColor;
        newPath.strokeWidth = penThickness;
        newPath.fullySelected = false;

        setPath(newPath);
      };

      tool.onMouseDrag = (event) => {
        if (path) path.add(event.point);
      };

      tool.onMouseUp = () => {
        if (path) {
          path.simplify();
          path.fullySelected = false;

          setActionStack((prevActions) => [
            ...prevActions,
            { type: 'draw', item: path },
          ]);
          setRedoStack([]);
        }
      };
    } else if (isEraserActive) {
      tool.onMouseDown = (event) => {
        setErasedItems([]);  // Clear erased items at the start
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setErasedItems((prev) => [...prev, hitResult.item]);  // Add to erased items
        }
      };

      tool.onMouseDrag = (event) => {
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setErasedItems((prev) => [...prev, hitResult.item]);  // Continue adding erased items
        }
      };

      tool.onMouseUp = () => {
        // Push the entire erase action as a single action
        setActionStack((prevActions) => [
          ...prevActions,
          { type: 'erase', items: erasedItems },
        ]);
        setRedoStack([]);
      };
    } else {
      tool.onMouseDown = null;
      tool.onMouseDrag = null;
    }
  }, [isPenActive, isEraserActive, tool, path, penThickness, penColor, erasedItems]);

  const handleUndo = useCallback(() => {
    if (actionStack.length > 0) {
      const lastAction = actionStack[actionStack.length - 1];

      if (lastAction.type === 'draw') {
        lastAction.item.remove();
      } else if (lastAction.type === 'erase') {
        lastAction.items.forEach((item) => {
          item.addTo(paper.project);
        });
      }

      setRedoStack((prevRedoStack) => [...prevRedoStack, lastAction]);
      setActionStack((prevActions) => prevActions.slice(0, -1));
    }
  }, [actionStack]);

  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const lastUndoneAction = redoStack[redoStack.length - 1];

      if (lastUndoneAction.type === 'draw') {
        lastUndoneAction.item.addTo(paper.project);
      } else if (lastUndoneAction.type === 'erase') {
        lastUndoneAction.items.forEach((item) => {
          item.remove();
        });
      }

      setActionStack((prevActions) => [...prevActions, lastUndoneAction]);
      setRedoStack((prevRedoStack) => prevRedoStack.slice(0, -1));
    }
  }, [redoStack]);

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
