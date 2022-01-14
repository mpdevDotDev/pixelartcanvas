import {Subject} from 'rxjs';

export type color = string;
export interface CanvasBuilderProps {
  canvasElement: HTMLCanvasElement;
  pixelSize: number;
};

class CanvasBuilder {
  #canvasElement: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #pixelSize: number;
  #width: number;
  #height: number;
  #horizontalPixels: number;
  #verticalPixels: number;
  #inputDataObserver: Subject<color[][]>;
  #inputData: color[][];

  get canvasElement(): HTMLCanvasElement {
    return this.#canvasElement;
  }

  get ctx():CanvasRenderingContext2D {
    return this.#ctx;
  }

  get pixelSize(): number {
    return this.#pixelSize;
  }

  get widht(): number {
    return this.#width;
  }

  get height(): number {
    return this.#height;
  }

  get horizontalPixels(): number {
    return this.#horizontalPixels;
  }

  get verticalPixels(): number {
    return this.#verticalPixels;
  }

  set inputData(inputData:color[][]) {
    this.#inputDataObserver.next(inputData);
  };

  constructor({canvasElement, pixelSize}: CanvasBuilderProps) {
    this.#canvasElement = canvasElement;
    this.#ctx = this.#canvasElement.getContext('2d');
    this.#pixelSize = pixelSize;
    this.#inputDataObserver = new Subject<color[][]>();

    this.#determineProprerties();

    this.#inputDataObserver.subscribe({
      next: (inputData) => {
        this.#inputData = inputData;
        this.update();
      },
    });
  }

  #determineProprerties() {
    let widthAtt = this.#canvasElement.getAttribute('width');
    let heightAtt = this.#canvasElement.getAttribute('height');
    widthAtt = widthAtt.replace(/[^0-9]/gi, '');
    heightAtt = heightAtt.replace(/[^0-9]/gi, '');

    this.#width = parseFloat(widthAtt);
    this.#height = parseFloat(heightAtt);

    this.#horizontalPixels = this.#width / this.#pixelSize;
    this.#verticalPixels = this.#height / this.#pixelSize;
  }

  #getColor(inputValue: color) {
    return `#${inputValue.padEnd(3, '0')}`;
  }

  update() {
    let x = 0;
    let y = 0;
    for (let l = 0; l < this.#verticalPixels; l++) {
      y = l * this.#pixelSize;

      for (let r = 0; r < this.#horizontalPixels; r++) {
        const color = this.#getColor(this.#inputData[l][r]);
        x = r * this.#pixelSize;
        this.#ctx.fillStyle = color;
        this.#ctx.fillRect(x, y, this.#pixelSize, this.#pixelSize);
      }
    }
  }
};

export default CanvasBuilder;
