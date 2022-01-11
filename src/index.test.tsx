import React from 'react';
import {render} from '@testing-library/react';
import PixelCanvas from '.';

describe('PixelCanvas', () => {
  let {container} = render(<PixelCanvas />);
  let pixelCanvas = container.querySelector('.pixel-canvas');

  it('should be truthy', () => {
    expect(pixelCanvas).toBeTruthy();
  });

  it('should have a minimum 40x40 size', () => {
    expect(pixelCanvas).toHaveStyle('width: 40px');
    expect(pixelCanvas).toHaveStyle('height: 40px');
  });
});
