import React from 'react';
import {render} from '@testing-library/react';
import PixelCanvas from '.';

describe('PixelCanvas', () => {
  let {container} = render(<PixelCanvas />);
  let pixelCanvas = container.querySelector('.pixel-canvas');

  it('should be truthy', () => {
    expect(pixelCanvas).toBeTruthy();
  });
});
