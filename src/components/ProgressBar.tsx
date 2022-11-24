import React from 'react';
import './ProgressBar.scss';

export interface ProgressBar {
  isProgressBar: boolean[];
}

export default function ProgressBar({ isProgressBar }: ProgressBar) {
  return (
    <div className="progressBar">
      <span className="progressSquareOn"></span>
      <hr className={isProgressBar[0] ? 'progressLineOn' : 'progressLineOff'} />
      <hr className={isProgressBar[1] ? 'progressLineOn' : 'progressLineOff'} />
      <hr className={isProgressBar[2] ? 'progressLineOn' : 'progressLineOff'} />
      <span
        className={isProgressBar[2] ? 'progressSquareOn' : 'progressSquareOff'}
      ></span>
    </div>
  );
}
