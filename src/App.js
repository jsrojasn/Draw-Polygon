import React, { useRef, useEffect, useState } from "react";

const Canvas = () => {
  const canvasRef = useRef(null);
  let ctx = useRef(null);
  const [points, setPoints] = useState([]);
  const [isDrawing, setIsDrawing] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
  }, []);

  useEffect(() => {
    if (!isDrawing) return;

    const { width, height } = canvasRef.current.getBoundingClientRect();
    const { devicePixelRatio: ratio = 1 } = window;
    canvasRef.current.width = width * ratio;
    canvasRef.current.height = height * ratio;
    ctx.current.scale(ratio, ratio);
    ctx.current.fillStyle = "#f00";
    ctx.current.beginPath();

    if (points.length === 2) {
      ctx.current.arc(points[0], points[1], 3, 0, 2 * Math.PI, true);
      ctx.current.fill();
    } else {
      ctx.current.moveTo(points[0], points[1]);
      for (let item = 2; item < points.length - 1; item += 2) {
        ctx.current.lineTo(points[item], points[item + 1]);
        ctx.current.strokeStyle = "red";
        ctx.current.lineWidth = "3";
        ctx.current.stroke();
      }
    }
  }, [points, isDrawing]);

  return (
    <div className="screen-container">
      <canvas
        onClick={(e) => {
          setPoints((prevPoints) => [
            ...prevPoints,
            parseInt(
              e.clientX - canvasRef.current.getBoundingClientRect().left
            ),
            parseInt(e.clientY - canvasRef.current.getBoundingClientRect().top),
          ]);
        }}
        className="canvas-container"
        ref={canvasRef}
      />
      <div className="buttons-container">
        <div
          onClick={() => {
            if (points.length < 6 || !isDrawing) return;
            ctx.current.lineTo(points[0], points[1]);
            ctx.current.strokeStyle = "red";
            ctx.current.lineWidth = "3";
            ctx.current.stroke();
            setIsDrawing(false);
          }}
          className="button-item"
        >
          <p>Complete Polygon</p>
        </div>
        <div
          onClick={() => {
            setPoints([]);
            ctx.current.clearRect(
              0,
              0,
              canvasRef.current.width,
              canvasRef.current.height
            );
            setIsDrawing(true);
          }}
          className="button-item"
        >
          <p>Reset</p>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
