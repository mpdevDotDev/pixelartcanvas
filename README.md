# PixelCanvas

## About
A simple react component that renders a canvas component containing a pixel art image from an given array of data.

## Hou to use it

### Installing
-

### Using
```js
import PixelCanvas from 'pixelcanvas';

const dataInput = [
  ['000', '888', 'aaa', 'ccc', 'eee'],
  ['000', '880000', 'aa0000', 'cc0000', 'ee0000'],
  ['000', '008800', '00aa00', '00cc00', '00ee00'],
  ['000', '000088', '0000aa', '0000cc', '0000ee'],
  ['000', '000', '000', '000', 'cc88cc'],
];

const MyComponent = () => (
  <>
    <PixelCanvas width="200px" height="200px" inputData={dataInput} />
  </>
);

export default MyComponent;
```

The 'PixelCanvas' component has the following properties:
* <b>width: string? (40px) - </b>canvas element width
* <b>height: string? (40px) - </b>canvas element height
* <b>pixelSize: number? (40) - </b>size of each rendered pixel
* <b>inputData: color[][] - </b>array containing the required info for composing each pixel