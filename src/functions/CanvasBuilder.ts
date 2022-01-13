export interface CanvasBuilderProps {
  canvasElement: HTMLCanvasElement;
};

class CanvasBuilder {
  #canvasElement: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;

  get canvasElement(): HTMLCanvasElement {
    return this.#canvasElement;
  }

  get ctx():CanvasRenderingContext2D {
    return this.#ctx;
  }

  constructor({canvasElement}: CanvasBuilderProps) {
    this.#canvasElement = canvasElement;
    this.#ctx = this.#canvasElement.getContext('2d');
  }
};

export default CanvasBuilder;
