import React, { useRef, useEffect, useState} from 'react';
import paper from 'paper';

const HandwritingCanvas = ({ isPenActive, isEraserActive, penThickness, penColor, addActionToGlobalStack }) => {
  const canvasRef = useRef(null);
  const [scope, setScope] = useState(null);
  const [tool, setTool] = useState(null);
  const [path, setPath] = useState(null);
  const [erasedItems, setErasedItems] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const newScope = new paper.PaperScope();
    newScope.setup(canvas);
    setScope(newScope);

    const newTool = new newScope.Tool();
    setTool(newTool);

    return () => {
      newTool.remove();
      newScope.clear();
    };
  }, []);

  useEffect(() => {
    if (!tool || !scope) return;

    if (isPenActive) {
      tool.onMouseDown = (event) => {
        if (path) path.selected = false;
        const newPath = new scope.Path();
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
          addActionToGlobalStack({
            undo: () => path.remove(),
            redo: () => path.addTo(scope.project),
          });
        }
      };
    } else if (isEraserActive) {
      tool.onMouseDown = (event) => {
        setErasedItems([]);
        const hitResult = scope.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setErasedItems((prev) => [...prev, hitResult.item]);
        }
      };

      tool.onMouseDrag = (event) => {
        const hitResult = scope.project.hitTest(event.point, {
          stroke: true,
          tolerance: 10,
        });
        if (hitResult && hitResult.item) {
          hitResult.item.remove();
          setErasedItems((prev) => [...prev, hitResult.item]);
        }
      };

      tool.onMouseUp = () => {
        addActionToGlobalStack({
          undo: () => erasedItems.forEach((item) => item.addTo(scope.project)),
          redo: () => erasedItems.forEach((item) => item.remove()),
        });
      };
    } else {
      tool.onMouseDown = null;
      tool.onMouseDrag = null;
    }
  }, [isPenActive, isEraserActive, tool, path, penThickness, penColor, erasedItems, scope, addActionToGlobalStack]);

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
