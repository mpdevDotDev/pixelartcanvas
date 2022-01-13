import CanvasBuilder from './CanvasBuilder';

describe('CanvasBuilder', () => {
  const canvasElement = document.createElement('canvas');
  canvasElement.setAttribute('width', '300px');
  canvasElement.setAttribute('height', '200px');

  const canvasBuilder = new CanvasBuilder({canvasElement});

  it('should store the received canvas element', () => {
    expect(canvasBuilder.canvasElement).toEqual(canvasElement);
  });

  it('should get canvas 2d context', () => {
    expect(canvasBuilder.ctx).toBeTruthy;
  });
});
