import React from 'react';
import {render} from '@testing-library/react';
import PixelCanvas from '.';

describe('PixelCanvas', () => {
  let {container} = render(<PixelCanvas />);
  let pixelCanvas = container.querySelector('.pixel-canvas');
  let innerCanvas;

  it('should be truthy', () => {
    expect(pixelCanvas).toBeTruthy();
  });

  it('should have a minimum / default 40x40 size', () => {
    expect(pixelCanvas).toHaveStyle({
      width: '40px',
      height: '40px',
      minWidth: '40px',
      minHeight: '40px',
    });
  });

  it('should be resizeable', () => {
    ({container} = render(<PixelCanvas width="300px" height="200px" />));
    pixelCanvas = container.querySelector('.pixel-canvas');
    innerCanvas = pixelCanvas.querySelector('canvas');

    expect(pixelCanvas).toHaveStyle({
      width: '300px',
      height: '200px',
    });
  });

  it('should contain a canvas element with same wrapper\'s size', () => {
    expect(innerCanvas).toBeTruthy();
    expect(innerCanvas).toHaveAttribute('width', '300px');
    expect(innerCanvas).toHaveAttribute('height', '200px');
  });
});
