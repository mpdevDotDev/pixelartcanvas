import React from 'react';
import PixelCanvas from '../../index';

const dataInput = [
  ['000', '888', 'aaa', 'ccc', 'eee'],
  ['000', '880000', 'aa0000', 'cc0000', 'ee0000'],
  ['000', '008800', '00aa00', '00cc00', '00ee00'],
  ['000', '000088', '0000aa', '0000cc', '0000ee'],
  ['000', '000', '000', '000', 'cc88cc'],
];

const Basic = () => (
  <>
    <PixelCanvas width="200px" height="200px" inputData={dataInput} />
  </>
);

export default Basic;
