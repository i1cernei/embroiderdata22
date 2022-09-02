import React, { useRef, useEffect } from 'react';
import Paper from 'paper';
import draw2 from '../drawings/draw2';

const Canvas = props => {

  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current;
    Paper.setup(canvas);
    draw2();
  }, []);

  return <canvas ref={canvasRef} {...props} id="canvas" resize="true" />
}

export default Canvas;