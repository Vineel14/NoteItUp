import React, { useRef, useEffect, useState, useCallback } from 'react';
import paper from 'paper';

const HandwritingCanvas = ({ isPenActive, isEraserActive, setUndoHandler, setRedoHandler }) => {
  const canvasRef = useRef(null);
  const [tool, setTool] = useState(null);
  const [actionStack, setActionStack] = useState([]);  // Stack to track all actions (pen or eraser)
  const [redoStack, setRedoStack] = useState([]);  // Stack for undone actions
  const [erasedItems, setErasedItems] = useState([]);  // Temporary array to hold erased items

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

      tool.onMouseUp = () => {
        setActionStack((prevActions) => [
          ...prevActions,
          { type: 'draw', item: path },  // Record the draw action
        ]);
        setRedoStack([]);  // Clear the redo stack when a new action is performed
      };
    } else if (isEraserActive) {
      // Erasing mode
      tool.onMouseDown = (event) => {
        setErasedItems([]);  // Clear the temporary erased items array at the start
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setErasedItems((prevErased) => [...prevErased, hitResult.item]);  // Add the erased item to the temporary array
        }
      };

      tool.onMouseDrag = (event) => {
        const hitResult = paper.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setErasedItems((prevErased) => [...prevErased, hitResult.item]);  // Continue adding erased items during drag
        }
      };

      tool.onMouseUp = () => {
        // After the mouse is released, record the entire erasing operation as one action
        setActionStack((prevActions) => [
          ...prevActions,
          { type: 'erase', items: erasedItems },  // Record the entire erasing action as a single item
        ]);
        setRedoStack([]);  // Clear the redo stack when a new action is performed
      };
    } else {
      // Disable both drawing and erasing when neither tool is active
      tool.onMouseDown = null;
      tool.onMouseDrag = null;
    }
  }, [isPenActive, isEraserActive, tool, erasedItems]);

  // Memoize the undo handler to avoid re-renders
  const handleUndo = useCallback(() => {
    if (actionStack.length > 0) {
      const lastAction = actionStack[actionStack.length - 1];

      if (lastAction.type === 'draw') {
        // Remove the last drawing
        lastAction.item.remove();
      } else if (lastAction.type === 'erase') {
        // Reapply all the erased items
        lastAction.items.forEach((item) => {
          item.addTo(paper.project);
        });
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
        lastUndoneAction.items.forEach((item) => {
          item.remove();
        });
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
