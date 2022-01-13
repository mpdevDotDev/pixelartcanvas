import React from 'react';
import styled from 'styled-components';

interface WrapperProps {
  width?: string;
  height?: string;
}

const Wrapper = styled.div<WrapperProps>`
  min-width: 40px;
  min-height: 40px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
`;

const PixelCanvas = ({width, height}: {width?: string, height?: string}) => {
  return <Wrapper
    className='pixel-canvas'
    width={width}
    height={height}
  >
    <canvas width={width} height={height}></canvas>
  </Wrapper>;
};

PixelCanvas.defaultProps = {
  width: '40px',
  height: '40px',
};

export default PixelCanvas;
