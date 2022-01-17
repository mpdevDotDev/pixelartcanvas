import React from 'react';
import {render} from '@testing-library/react';
import PixelCanvas from '.';
import CanvasBuilder from './functions/CanvasBuilder';

jest.mock('./functions/CanvasBuilder');
Object.defineProperty(CanvasBuilder.prototype, 'inputData', {
  set: jest.fn(),
});

describe('PixelCanvas', () => {
  const width = 300;
  const height = 200;
  const dataInput = [
    ['000', '888', 'aaa', 'ccc', 'eee'],
    ['000', '880000', 'aa0000', 'cc0000', 'ee0000'],
    ['000', '008800', '00aa00', '00cc00', '00ee00'],
    ['000', '000088', '0000aa', '0000cc', '0000ee'],
    ['000', '000', '000', '000', '000'],
  ];

  let canvasBuilder;
  const setCanvasBuilder = jest.fn((canvasBuilderInstance) => {
    canvasBuilder = canvasBuilderInstance.constructor.name;
  });
  const CanvasBuilderInputData = jest.spyOn(
      CanvasBuilder.prototype, 'inputData', 'set');
  let {container} = render(<PixelCanvas inputData={dataInput} />);
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
    ({container} = render(
        <PixelCanvas
          width={`${width}px`}
          height={`${height}px`}
          inputData={dataInput}
          setCanvasBuilder={setCanvasBuilder}
        />,
    ));
    pixelCanvas = container.querySelector('.pixel-canvas');
    innerCanvas = pixelCanvas.querySelector('canvas');

    expect(pixelCanvas).toHaveStyle({
      width: `${width}px`,
      height: `${height}px`,
    });
  });

  it('should contain a canvas element with same wrapper\'s size', () => {
    expect(innerCanvas).toBeTruthy();
    expect(innerCanvas).toHaveAttribute('width', `${width}px`);
    expect(innerCanvas).toHaveAttribute('height', `${height}px`);
  });

  it('should instantiate CanvasBuilder with innerCanvas', () => {
    expect(CanvasBuilder).toHaveBeenCalled();
    expect(CanvasBuilder).toBeCalledWith({
      canvasElement: innerCanvas,
      pixelSize: 40,
    });
  });

  it('should set CanvasBuilder.inputData', () => {
    expect(CanvasBuilderInputData).toHaveBeenCalled();
  });

  it('should call setCanvasBuilder with CanvasBuilder instance', () => {
    expect(canvasBuilder).toEqual(CanvasBuilder.prototype.constructor.name);
  });
});
