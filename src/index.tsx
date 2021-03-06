import React, {useRef, useEffect} from 'react';
import styled from 'styled-components';
import CanvasBuilder from './functions/CanvasBuilder';
import type {color} from './functions/CanvasBuilder';

interface WrapperProps {
  width?: string;
  height?: string;
}

interface PixelartCanvasProps extends WrapperProps {
  pixelSize?: number;
  inputData: color[][];
  setCanvasBuilder?: (CanvasBuilder: CanvasBuilder) => void;
}

const Wrapper = styled.div<WrapperProps>`
  min-width: 40px;
  min-height: 40px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const PixelartCanvas = ({
  width,
  height,
  pixelSize,
  inputData,
  setCanvasBuilder,
}: PixelartCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  let canvasBuilder;

  useEffect(() => {
    canvasBuilder = new CanvasBuilder({
      canvasElement: canvasRef.current,
      pixelSize,
    });

    if (setCanvasBuilder) {
      setCanvasBuilder(canvasBuilder);
    }
  }, [canvasRef]);

  useEffect(() => {
    canvasBuilder.inputData = inputData;
  }, [inputData]);

  return <Wrapper
    className='pixel-canvas'
    width={width}
    height={height}
  >
    <canvas ref={canvasRef} width={width} height={height} />
  </Wrapper>;
};

PixelartCanvas.defaultProps = {
  width: '40px',
  height: '40px',
  pixelSize: 40,
};

export default PixelartCanvas;
