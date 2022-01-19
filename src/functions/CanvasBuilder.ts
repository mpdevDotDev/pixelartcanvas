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
  #selectedPixel: number[];
  #onClickHandler: (e: MouseEvent) => void;
  borderColors: color[] = ['#ca0', 'rgba(0, 0, 0, 0.3)'];

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

  get selectedPixel(): number[] {
    return this.#selectedPixel;
  }

  get onClickHandler() {
    return this.#onClickHandler;
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

    this.#onClickHandler = (e: MouseEvent) => {
      if (this.#selectedPixel) {
        this.#redrawNearbyPixels(
            this.#selectedPixel[0], this.#selectedPixel[1]);
      }
      const target = e.target as HTMLElement;
      const actX = e.x - target.offsetLeft;
      const actY = e.y - target.offsetTop;
      const newSelectedPixel = [
        Math.floor(actY / this.#pixelSize),
        Math.floor(actX / this.#pixelSize),
      ];

      if (
        JSON.stringify(this.#selectedPixel) ===
        JSON.stringify(newSelectedPixel)
      ) {
        this.#selectedPixel = undefined;
      } else {
        this.#selectedPixel = newSelectedPixel;
        this.#drawPixelBorder(this.#selectedPixel[0], this.#selectedPixel[1]);
      }
    };

    this.#canvasElement.addEventListener('click', this.#onClickHandler);
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

  #getPixelCoordinates(line: number, column: number): number[] {
    return [line * this.#pixelSize, column * this.#pixelSize];
  }

  #drawPixelBorder(line: number, column: number) {
    const [y, x] = this.#getPixelCoordinates(line, column);

    this.#ctx.fillStyle = this.borderColors[1];
    this.#ctx.fillRect(x, y, (this.#pixelSize + 3), (this.#pixelSize + 3));

    this.#ctx.fillStyle = this.borderColors[0];
    this.#ctx.fillRect(
        (x - 1),
        (y - 1),
        (this.#pixelSize + 2),
        (this.#pixelSize + 2),
    );
    this.#drawPixel(line, column);
  }

  #drawPixel(line: number, column: number) {
    const [y, x] = this.#getPixelCoordinates(line, column);
    const color = this.#getColor(this.#inputData[line][column]);
    this.#ctx.fillStyle = color;
    this.#ctx.fillRect(x, y, this.#pixelSize, this.#pixelSize);
  }

  #redrawNearbyPixels(line: number, column: number) {
    const prevLine = line - 1;
    const nextLine = line + 1;
    const prevColumn = column - 1;
    const nextColumn = column + 1;

    this.#drawPixel(line, column);

    if (this.#inputData[line][prevColumn]) {
      this.#drawPixel(line, prevColumn);
    }
    if (this.#inputData[line][nextColumn]) {
      this.#drawPixel(line, nextColumn);
    }

    if (this.#inputData[prevLine]) {
      this.#drawPixel(prevLine, column);
      if (this.#inputData[prevLine][prevColumn]) {
        this.#drawPixel(prevLine, prevColumn);
      }
      if (this.#inputData[prevLine][nextColumn]) {
        this.#drawPixel(prevLine, nextColumn);
      }
    }

    if (this.#inputData[nextLine]) {
      this.#drawPixel(nextLine, column);
      if (this.#inputData[nextLine][prevColumn]) {
        this.#drawPixel(nextLine, prevColumn);
      }
      if (this.#inputData[nextLine][nextColumn]) {
        this.#drawPixel(nextLine, nextColumn);
      }
    }
  }

  update() {
    for (let l = 0; l < this.#verticalPixels; l++) {
      for (let c = 0; c < this.#horizontalPixels; c++) {
        this.#drawPixel(l, c);
      }
    }
  }
};

export default CanvasBuilder;
