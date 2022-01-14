import CanvasBuilder from './CanvasBuilder';

describe('CanvasBuilder', () => {
  const canvasWidth = 200;
  const canvasHeight = 200;
  const pixelSize = 40;
  const dataInput = [
    [0x000, 0x000, 0x000, 0x000, 0x000],
    [0x000, 0x000, 0x000, 0x000, 0x000],
    [0x000, 0x000, 0x000, 0x000, 0x000],
    [0x000, 0x000, 0x000, 0x000, 0x000],
    [0x000, 0x000, 0x000, 0x000, 0x000],
  ];

  const canvasElement = document.createElement('canvas');
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
});
