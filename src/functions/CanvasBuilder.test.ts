import CanvasBuilder from './CanvasBuilder';
import 'jest-canvas-mock';
import userEvent from '@testing-library/user-event';

describe('CanvasBuilder', () => {
  const canvasWidth = 200;
  const canvasHeight = 200;
  const pixelSize = 40;
  const dataInput = [
    ['000', '888', 'aaa', 'ccc', 'eee'],
    ['000', '880000', 'aa0000', 'cc0000', 'ee0000'],
    ['000', '008800', '00aa00', '00cc00', '00ee00'],
    ['000', '000088', '0000aa', '0000cc', '0000ee'],
    ['000', '000', '000', '000', 'cc88cc'],
  ];

  const canvasElement = document.createElement('canvas');
  const ctx = canvasElement.getContext('2d');
  canvasElement.setAttribute('width', `${canvasWidth}px`);
  canvasElement.setAttribute('height', `${canvasHeight}px`);

  const canvasBuilder = new CanvasBuilder({canvasElement, pixelSize});

  const update = jest.spyOn(canvasBuilder, 'update');

  it('should store the received canvas element and pixelSize', () => {
    expect(canvasBuilder.canvasElement).toEqual(canvasElement);
    expect(canvasBuilder.pixelSize).toEqual(pixelSize);
  });

  it('shold determine width, height, horizontal and vertical pixels', () => {
    expect(canvasBuilder.widht).toEqual(canvasWidth);
    expect(canvasBuilder.height).toEqual(canvasHeight);
    expect(canvasBuilder.horizontalPixels).toEqual(canvasWidth / pixelSize);
    expect(canvasBuilder.verticalPixels).toEqual(canvasHeight / pixelSize);
  });

  it('should get canvas 2d context', () => {
    expect(canvasBuilder.ctx).toBeTruthy;
  });

  it('should call \'update\' when inputData is changed', () => {
    canvasBuilder.inputData = dataInput;
    expect(update).toBeCalled();
  });

  it('should match ctx snapshot', () => {
    const ctxDrawCalls = ctx.__getDrawCalls();
    expect(ctxDrawCalls).toMatchSnapshot();
  });

  it('should match ctx.fillStyle with last dataInput color', () => {
    const lastLine = dataInput[dataInput.length -1];
    const lastPixel = lastLine[lastLine.length -1];
    expect(ctx.fillStyle).toEqual(`#${lastPixel.padEnd(6, '0')}`);
  });

  it('should select first pixel when clicking over it', () => {
    userEvent.pointer([
      {keys: '[MouseLeft]', target: canvasElement, coords: {x: 0, y: 0}},
    ]);
    const ctxDrawCalls = ctx.__getDrawCalls();
    expect(canvasBuilder.selectedPixel).toEqual([0, 0]);

    expect(ctxDrawCalls).toMatchSnapshot();
  });

  it('should select last pixel when clicking over it', () => {
    const x = (dataInput.length - 1) * pixelSize;
    const y = (dataInput[0].length - 1) * pixelSize;
    userEvent.pointer([
      {
        keys: '[MouseLeft]',
        target: canvasElement,
        coords: {x, y}},
    ]);
    const ctxDrawCalls = ctx.__getDrawCalls();
    expect(canvasBuilder.selectedPixel).toEqual([
      dataInput.length - 1,
      dataInput[0].length - 1,
    ]);

    expect(ctxDrawCalls).toMatchSnapshot();
  });

  it('should deselect last selected pixel when clicking over it', () => {
    const x = (dataInput.length - 1) * pixelSize;
    const y = (dataInput[0].length - 1) * pixelSize;
    userEvent.pointer([
      {
        keys: '[MouseLeft]',
        target: canvasElement,
        coords: {x, y}},
    ]);
    const ctxDrawCalls = ctx.__getDrawCalls();
    expect(canvasBuilder.selectedPixel).toBeUndefined();

    expect(ctxDrawCalls).toMatchSnapshot();
  });
});
